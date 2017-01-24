/*
 *  Form Behaviour - Enhanced inputs
 *  To upgrade regular inputs with special functionality
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 *
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  // Plugin information and defaults
  var pluginName = 'enhancedInput',
    defaults = {
      type: undefined, // "input" or "select"
      autocomplete: undefined
    };

  // The actual plugin constructor
  // All variables expected to be jQuery elements are prefixed with $
  function Plugin( inputElement, options ) {

    // options may be a plugin method such as "close"
    if ( typeof options == "string" )
      return; // methods can't be called on non-existent notifications

    this._defaults = defaults;
    this.settings = $.extend( {}, defaults, options );
    this._name = pluginName;

    this.$input = $(inputElement);
    this.$wrapper = null; // set during create()
    this.type = this.settings.type || inputElement.tagName.toLowerCase();
    this.autocomplete = this.settings.autocomplete || this.$input.data('form-autocomplete');

    if (this[this.type] !== undefined)
      this[this.type].create.call(this); // call input.create() or select.create()
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    // Input-type methods
    input: {

      // create input's DOM -- only called on init in scope of Plugin
      create: function () {
        var $input = this.$input, // singular
            $wrapper = this.$wrapper = $('<div class="enhanced-input">'),
            icon = $input.data('icon');

        this.copyBackgroundStyles($input, $wrapper);

        // now apply changes to the DOM
        $input.removeClass('enhanced-input').wrap($wrapper);

        // update wrapper refrence since a new element and thus reference is
        // created on wrap()
        this.$wrapper = $input.parent();

        // After the DOM changes, we can insert the icon
        if (icon) {
          if (icon.indexOf('icon-') === 0)
            $input.before('<i class="icon '+ icon +'"></i>');
          else
            $input.before('<i class="icon icon-select '+ icon +'"></i>');
        }

        if (this.autocomplete)
          this.input.autocompleteSetup.call(this);

        // is done!
        $input.addClass('enhanced');
      },

      // Set up this input for autocompletion
      autocompleteSetup: function() {
        var plugin = this,
            $input = this.$input,
            $autocomplete = $('<ul class="enhanced-autocomplete">'),
            $cancel = $('<i class="icon-small cancel">').hide(),
            inputName = $input.attr('name'),
            autocompleteFunction,
            inputMap, // maps return values to input names
            itemCache = { '': [] }; // don't look up items twice, with entry for blank

        $autocomplete.insertBefore($input);
        $cancel.insertAfter($input);

        // Any other autocomplete endpoints can be added in here.
        switch (this.autocomplete) {
          case 'location':
            // inputMap maps what is returned by the service into their actual
            //  input/submit values
            // input element's name => service item key
            inputMap = {
              'healthClientSession.customer.suburb': 'suburb_s',
              'healthClientSession.customer.state': 'state_s',
              'healthClientSession.customer.postcode': 'postcode_s'
            };
            inputMap[inputName] = 'id';

            autocompleteFunction = this.input.autocompleteLocation;
            break;

          default:
            // Unknown autocomplete type -- bail.
            return false;
        }

        // Create any inputs which don't already exist
        $.each(inputMap, function (key, value) {
          if (plugin.$wrapper.find('input[name="'+ key +'"]').length === 0) {
            plugin.$wrapper.append($('<input type="hidden">').attr('name', key));
          }
        });

        var lastXHR; // pending request
        // Bind input events for updating
        $input.on({
          'keyup.enhanced-input': function (ev) {
            switch (ev.keyCode) {
              case 38: // up
                $autocomplete.find('.selected').removeClass('selected').prev().addClass('selected');
                break;

              case 40:
                var $current = $autocomplete.find('.selected').removeClass('selected');

                if ($current.length)
                  $current.next().addClass('selected');
                else
                  $autocomplete.children(':first').addClass('selected');
                break;

              case 13: // enter/return
                var $selected = $autocomplete.find('.selected');
                if ($selected.length)
                  selectItem($selected);
                break;

              default: // regular input
                // Cancel any currently executing requests, if any
                if (lastXHR)
                  lastXHR.abort();

                var value = $input.val();
                // Check the cache
                if (itemCache[value]) {
                  autocompleteUpdate.call(plugin, itemCache[value], value);
                } else {
                  // Send a request to the service.
                  var callback = autocompleteUpdate.bind(plugin);
                  lastXHR = autocompleteFunction.call(plugin, value, callback);
                }
            }
          },

          'blur.enhanced-input': function() {
            // Hide the autocomplete
            $autocomplete.hide();
          },
          'focus.enhanced-input': function() {
            // Show the autocomplete
            $autocomplete.show();
          }
        });

        $autocomplete.on('mousedown click', 'li', function () {
          selectItem($(this));
        });

        $cancel.on('click', function () {
          $input.val('').prop('disabled', false).focus();
          $(this).hide();
        });

        // update callback -- executed in this function's scope
        function autocompleteUpdate(items, value) {
          var inputNameKey = inputMap[inputName],
              itemElements;

          resetInputs();

          itemCache[value] = items;

          // map each item to a new item element
          itemElements = $.map(items, function (item, i) {
            return $('<li>').
              text(item[inputNameKey]). // Display the main input value
              data('item', item);
          });

          $autocomplete.empty().append(itemElements);

          if (items.length == 1)
            selectItem($autocomplete.children().first());
        }

        function resetInputs() {
          $.each(inputMap, function (key, value) {
            if (value == 'id') {
              return;
            }
            plugin.$wrapper.find('input[name="'+ key +'"]').val("");
          });
        }

        function selectItem($item) {
          var itemData = $item.data('item');

          $.each(inputMap, function (key, value) {
            plugin.$wrapper.find('input[name="'+ key +'"]').val(itemData[value]);
          });

          $input.prop('disabled', true); // prevent editing of selected value
          $autocomplete.empty();
          $cancel.show();
        }
      },

      // handles autocompletion against a location service
      autocompleteLocation: function(value, callback) {
        var serviceURL = 'http://address.iselect.com.au/service_address/addressDetails/get',
            servicePath;

        // Override with a local url if on HTTPS (due to CORS)
        if (location.protocol == 'https:')
          serviceURL = '/addressService.jsp';

        if (!isNaN(value)) {
          // Numbers get numerical search
          servicePath = '?wt=json&omitHeader=true&postcode='+ value +
            '&sort=postcode asc&srvType=paramSearch&callBack=autocompleteGetLocation';

        } else {
          // Text is a suburb search
          servicePath = '?wt=json&omitHeader=true&suburb='+ value +
            '&sort=suburb asc&srvType=paramSearch&callBack=autocompleteGetLocation';
        }

        window.autocompleteGetLocation = function (data) {
          callback(data.response.docs, value);
        };

        // return the XHR object, so it may be cancelled
        return $.ajax(serviceURL + servicePath, {
          cache: true,
          // send jsonp, expect content-type xml, parse as json
          dataType: 'jsonp xml json'
        });
      },

      // Clean up
      destroy: function () {
        // Return input to its original state

        this.$input.off('.enhanced-select');
        this.copyBackgroundStyles(this.$wrapper, this.$input);

        this.$input.siblings().remove();
        this.$input.unwrap().addClass('enhanced-input');
      }

    },

    // Select-type methods
    select: {

      // create select's DOM -- only called on init in scope of Plugin
      create: function () {
        var plugin = this,
            $input = this.$input,
            $wrapper = $('<div class="enhanced-select">'),
            $optionList = $('<ul class="enhanced-dropdown">');

        // Generate options as list
        $input.children('option').each(function () {
          var $option = $(this),
              $listItem = $('<li>'),
              icon;

          $listItem.attr('data-value', $option.attr('value'));
          $listItem.text($option.text());

          if (icon = $option.data('icon'))
            $listItem.prepend('<i class="icon-select '+ icon +'"></i>');

          $optionList.append($listItem);

        });

        // Bind functionality
        $optionList.on('click.enhanced-input', 'li', function (ev) {
          var $this = $(this), // list item
              $wrapper = plugin.$wrapper;

          if ($wrapper.hasClass('open')) {
            // Select is open, so this click is an option selection

            plugin.select.setValue.call(plugin, $this.data('value'));
            $wrapper.removeClass('open');
            $optionList.css('height', '');

          } else {
            // Select is closed, so lets display all the options
            $wrapper.addClass('open');

            // ensure the list expands to accommodate all items (with transition)
            var $options = $optionList.children(),
                // Height of all items except one
                extraHeight = $options.outerHeight(true) * ($options.length - 1),
                // Height of one item including select padding
                selectHeight = $options.outerHeight(true) + (parseFloat($optionList.css('padding-top')) * 3);

            // Set total height
            $optionList.css('height', selectHeight + extraHeight);

            // Stop this event from bubbling up to body, firing the the event we're about to bind
            ev.stopPropagation();

            // on open, bind a body.click to close
            $('body').one('click.enhanced-input', function () {
              $wrapper.removeClass('open');
              $optionList.css('height', '');
            });
          }
        });

        this.copyBackgroundStyles($input, $wrapper);

        $input.removeClass('enhanced-select').wrap($wrapper);
        $optionList.insertAfter($input);

        // update wrapper refrence since a new element and thus reference is
        // created on wrap()
        this.$wrapper = $input.parent();

        // Refresh the UI list's state on load
        this.select.update.call(this);

        // Respond to input value changes
        $input.on('change.enhanced-input', this.select.update.bind(this));

        // is done!
        $input.addClass('enhanced');

      },

      // Sets the native input value and updates DOM
      setValue: function (value) {
        var $optionList = this.$wrapper.find('ul');

        $optionList.find('li').removeClass('selected');
        $optionList.find('*[data-value="'+ value +'"]').addClass('selected');

        this.$input.val(value);
      },

      // Update the DOM representation to reflect native select's value
      update: function () {
        var $optionList = this.$wrapper.find('ul'),
            value = this.$input.val();

        $optionList.find('li').removeClass('selected');
        $optionList.find('*[data-value="'+ value +'"]').addClass('selected');
      },

      // Clean up
      destroy: function () {
        // Restore select to its original state

        this.$input.off('.enhanced-input');
        this.copyBackgroundStyles(this.$wrapper, this.$input);

        this.$input.siblings().remove();
        this.$input.unwrap().addClass('enhanced-select');
      }
    },

    // Copies selected styles to another element, sometimes resetting them.
    copyBackgroundStyles: function ($from, $to) {
      // copy some input styles onto the destination, then "reset" the copied
      // styles on the source element itself
      var stylesToCopy = {
            'background-color': 'transparent',
            'border-radius': 'copy',
            'height': 'copy'
          },
          copiedStyles = {};

      $.each(stylesToCopy, function (index, value) {
        copiedStyles[index] = $from.css(index);

        // check if we should retain this property on both elements
        if (value == 'copy')
          stylesToCopy[index] = copiedStyles[index];
      });

      $to.css(copiedStyles); // Apply copied styles
      $from.css(stylesToCopy); // Reset applicable styles
    },

    // Update an existing notification element's settings
    update: function (options) {
      // options may be a string representing a plugin method
      if (typeof options == "string") {

        // if destroy, unset the plugin instance
        if (options == 'destroy')
          this.destroy();
        else
          // call input.function() or select.function()
          this[this.type][options].call(this);
        return; // we don't need to do an update

      } else if (typeof options == "object") {
        // Simply update settings
        this.settings = $.extend( {}, defaults, options );
      }
    },

    // Destroy DOM element and plugin instance
    destroy: function () {
      this[this.type].destroy.call(this);
      $.data(this.$input[0], 'plugin_'+ this._name, null);
    }
  });

  // A lightweight plugin wrapper around the constructor, preventing against
  // multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    // The following test only tests first element in set, since the plugin
    // is optimised to share an element set. You should avoid binding the
    // plugin on mulitple sets with overlapping elements, although it won't
    // break anything, simply double-check elements.
    this.each(function () {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      } else {
        $.data( this, 'plugin_' + pluginName ).update( options );
      }
    });

    // jQuery functions should always return this for chaining
    return this;
  };

})( jQuery, window, document );
