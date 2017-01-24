
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  /**
   * Returns a classname base on width, height and type
   * to be applied to the maginif object .container element (on beforeOpen)
   *
   * Also it creates style definitions for the custom class and injects them into the head
   *
   * @param  {[Number]} width  [description]
   * @param  {[Number]} height [description]
   * @return {[String]}        [description]
   */
  function customMagnificStyle(width, height, prefix)
  {
    prefix = prefix || 'custom';
    var className = prefix + '-' + width + 'x' + height,
        aspectPadding = (height/width) * 100,
        $style = $('style#'+className);

    // we only need to create the style once per prefic, width, height combo
    // NB: it make not difference if height is false as it is sometimes
    //     the class will simply be `.custom-400xfalse` or whatever which is fine
    if($style.length === 0) {
      var $style = $('<style id="'+className+'" type="text/css"></style>').appendTo('head'),
          selectorRoot = '.mfp-container.' + className,
          selectorContent = selectorRoot + ' .mfp-content',
          selectorScaler = selectorRoot + ' .mfp-iframe-scaler',
          css = '',
          //mediaTablet = '@media (max-width:'+$.iSelectTierSizes.tablet+'px)',
          //mediaTabletThin = '@media (max-width:'+$.iSelectTierSizes.tabletThin+'px)',
          mediaPhone = '@media (max-width:'+$.iSelectTierSizes.phone+'px)';

      // desktop
      //
      // change max-width
      css += selectorContent + '{';
        css += 'max-width:' + width + 'px;';
      css += '}';
      // adjust aspect to match height
      if(height!==null) {
        css += selectorScaler + '{';
          css += 'padding-top:' + aspectPadding + '%;';
        css += '}';
      }

      // For iframes we want to add some breakpoint styles
      // most other types like images / videoes etc wont need extra styles
      if(prefix==='iframe') {
        // no longer maintain aspect
        // do a fill width default gutter intact
        css += mediaPhone + '{';
          css += selectorContent + '{';
            css += 'height: 100%;';
          css += '}';
          css += selectorScaler + '{';
            css += 'padding-top:0;';
            css += 'height: 100%;';
          css += '}';
        css += '}';
        // under 480 make it completely full screen
        css += '@media (max-width:480px) {';
          css += selectorRoot + '{';
            css += 'padding: 0;';
          css += '}';
          css += selectorRoot + ' .mfp-close {';
            css += 'top: 0;';
            css += 'right:0;';
          css += '}';
        css += '}';
      }

      $style.html(css);
    }

    return className;
  }

  $.fn.iSelectMagnific = function(options){

    options = options || {};

    return $(this).each(function(){

      var href = this.href,
          opts = {
            items: {
              src: href
            }
          },
          dataOptions = $(this).data('options') || {},
          width = width = dataOptions.width || null,
          height = dataOptions.height || null;

      delete dataOptions.width;
      delete dataOptions.height;

      if(dataOptions.iframe) {
        opts.type = 'iframe';
        // the iframe property of magnific options
        // is something different so delete this
        // one so it doesn't break stuff
        delete dataOptions.iframe;
        // also incase a mixed type has been passed
        delete dataOptions.type;
      }

      if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(href)) {
        opts.type = 'image';
      }

      if(width) {
        opts.callbacks = {
          beforeOpen: function()
          {
            this.container.addClass(customMagnificStyle(width, height, opts.type||null));
          }
        };
      }

      // mix global options, local opts and dataOptions
      //
      var opts = $.extend({},options,opts,dataOptions);

      $(this).on('click', function(e){
        e.preventDefault();
        $.magnificPopup.open(opts);
      });


    });
  };

})( jQuery, window, document );