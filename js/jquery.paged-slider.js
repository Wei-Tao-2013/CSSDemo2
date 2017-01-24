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
  var pluginName = 'pagedSlider',
    defaults = {
        slideDelay: 3000
    };

  // The actual plugin constructor
  // All variables expected to be jQuery elements are prefixed with $
  function Plugin( element, options ) {

    // options may be a plugin method such as "close"
    if ( typeof options == "string" )
      return; // methods can't be called on non-existent notifications

    this._defaults = defaults;
    this.settings = $.extend( {}, defaults, options );
    this._name = pluginName;
    this.current = 0;

    this.$element = $(element);
    this.$slides = this.$element.find('> li');
    this.total = this.$slides.length;

    this.init.call(this);

  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function() {

        var self = this;

        this.setHeight();
        this.fadeSlide();

        $(window).on('resize', function() {
            self.setHeight();
        });

    },
    fadeSlide: function() {
        var self = this;
        this.current = (this.current >= this.total) ? 0 : this.current;
        this.$slides.fadeOut(100);
        this.$slides.eq(this.current).delay(99).fadeIn(1000, function() {
            setTimeout(function() {
                self.current++;
                self.fadeSlide();
            }, self.settings.slideDelay);
        });
    },
    setHeight: function() {
        var max = 0;
        this.$slides.each(function() {
            var height = $(this).height();

            if (height > max) max = height;
        });

        this.$element.height(max);
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