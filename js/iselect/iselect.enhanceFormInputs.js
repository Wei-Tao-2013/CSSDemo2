/*
 *  Enhance certain inputs with special styling
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.enhanceFormInputs = function () {
    // Skip this in browsers without ~ selector support, such as IE7 and below
    if (!selectorSupported('div ~ div'))
      return;

    // Enhance checkboxes
    $('.checkbox, .form-checkbox input').wrap('<div class="enhanced-checkbox">').after('<span>');

    // Enhance radio buttons
    $('.radio, .form-radio input').wrap('<div class="enhanced-radio">').after('<span>');
  };

})( jQuery, window, document );
