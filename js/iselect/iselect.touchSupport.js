/*
 *  Touch behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.touchSupport = function () {
    $(document.body).on('touchstart', '.form-help', function (ev) {
      var $thisNotification = $(this).children('.notification');

      if ($thisNotification.hasClass('show'))
        return; // handle nothing

      $thisNotification.addClass('show');
      ev.preventDefault();

      $(document.body).one('touchstart', function () {
        $thisNotification.removeClass('show');
      });
    });
  };

})( jQuery, window, document );
