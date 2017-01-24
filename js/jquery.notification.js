/*
 *  Form Behaviour - Element Notifications
 *  To flexibly create and manage .notification elements
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 *
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  // Plugin information and defaults
  var pluginName = 'notification',
    defaults = {
      message: '', // if no message defined, just create placeholder object
      type: 'error', // error | info | message. only refershed on create
      timeout: 5000,
      closeEvents: 'click'
    };

  // The actual plugin constructor
  // All variables expected to be jQuery elements are prefixed with $
  function Plugin( parentElement, options ) {

    // options may be a plugin method such as "close"
    if ( typeof options == "string" )
      return; // methods can't be called on non-existent notifications

    this._defaults = defaults;
    this.settings = $.extend( {}, defaults, options );
    this._name = pluginName;

    this.$parentElement = $(parentElement);
    this.$notification = undefined;
    this.closeTimer = undefined;

    this.create();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    // Create the notificaiton element
    create: function () {
      var $notification = this.$notification = $('<div class="notification">');
      $notification.addClass(this.settings.type);
      this.$parentElement.after($notification);

      this.update();
      this.align(); // align element within parent container

      if (this.settings.timeout)
        this.closeTimer = setTimeout(this.close.bind(this), this.settings.timeout);
    },

    // Update an existing notification element's settings
    update: function (options) {
      var oldType = this.settings.type; // track type change

      // options may be a string representing a plugin method
      if (typeof options == "string") {
        this[options].call(this);
        return; // we don't need to do an update
      } else if (typeof options == "object") {
        this.settings = $.extend( {}, defaults, options );
      }

      var $notification = this.$notification;

      if (oldType !== this.settings.type)
        $notification.removeClass(oldType).addClass(this.settings.type);
      $notification.text(this.settings.message);
      this.align();

      // reset timeout
      clearTimeout(this.closeTimer);
      if (this.settings.timeout)
        this.closeTimer = setTimeout(this.close.bind(this), this.settings.timeout);

      // add the show class after a very small delay (to allow aniamtion)
      setTimeout(function () {
        $notification.addClass('show'); // just in case
      }, 1);
    },

    // Align the notification element
    align: function () {
      var parentPosition = this.$parentElement.position(),
          parentWidth = this.$parentElement.width(),
          notificationWidth = this.$notification.width();

      var leftPosRatio = 0.95;

      // Known issue: Chrome misreports getComputedStyle() when zoomed
      // <http://bugs.jquery.com/ticket/5565>
      // <https://code.google.com/p/chromium/issues/detail?id=277378>

      // If the notification will go outside the sceen, right align it
      // Note .position() calcs from parent offset, so this is only effective
      // when parent takes up screen width (such as on mobile)
      if (parentPosition.left + (parentWidth * leftPosRatio) + notificationWidth >
          $(document.body).width()) {

        this.$notification.css({
          right: (parentWidth * (1 - leftPosRatio)),
          top: parentPosition.top - this.$notification.outerHeight()
        }).addClass('align-right');

      } else {

        this.$notification.css({
          left: parentPosition.left + (parentWidth * leftPosRatio),
          top: parentPosition.top - (this.$notification.outerHeight() * 0.98)
        }).removeClass('align-right');
      }

    },

    // Close and remove the notification element
    close: function () {
      this.$notification.removeClass('show');
      clearTimeout(this.closeTimer); // in case of manual invocation
    },

    // Destroy DOM element and plugin instance
    destroy: function () {
      this.$notification.remove();
      $.data(this.$parentElement[0], 'plugin_'+ this._name, null);
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
