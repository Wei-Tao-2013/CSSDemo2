/**
 *  Secondary Navigation enhancement
 *  Adds a toggle to items that have a sub list
 *  to expand/collapse them
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.secondaryNavigationModule = function () {
    var speed = 250; // expand/collapse speed

    $('.secondary-navigation').each(function(){

      var $subLists = $('> li > ul', this).each(function(){

        var $sub = $(this),
            $parent = $sub.parent('li'),
            $wrap = $('<div class="sub-list"></div>'),
            $toggle = $('<a href="#" class="toggle"></a>');

        $toggle.on('click', function(e){
          e.preventDefault();

          if($parent.hasClass('open')) {
            $sub.trigger('collapse');
          } else {
            $sub.trigger('expand');
          }
        }).appendTo($parent);

        $wrap.insertBefore($sub).append($sub);

        if($parent.hasClass('open')) {
          $wrap.height('auto');
        }

        $sub.on({
          expand: function()
          {
            // collapse other open items
            // to allow more than one item expanded at
            // a time comment this out
            $subLists.not($sub).trigger('collapse');

            $parent.addClass('open');
            $wrap.animate({
              height: $sub.height()
            }, speed, function(){
              $wrap.height('auto');
            });
          },
          collapse: function()
          {
            $wrap.animate({
              height: 0
            }, speed, function(){
              $parent.removeClass('open');
            });
          }
        });
      });

    });
  };

})( jQuery, window, document );
