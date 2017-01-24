/*
 *  Health Sales funnel behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.healthSalesFunnelBehaviour = function () {
    // Customise cover preferences
    $('#policyType').on('change', function () {
      var $this = $(this),
          $hospital = $('.customise-hospital-cover'),
          $extras = $('.customise-extras-cover');

      switch ($this.val()) {
        case 'HospitalOnly':
          $hospital.addClass('enabled').find('input').prop('disabled', false);
          $extras.removeClass('enabled').find('input').prop('disabled', true);
          break;

        case 'AncillaryOnly':
          $hospital.removeClass('enabled').find('input').prop('disabled', true);
          $extras.addClass('enabled').find('input').prop('disabled', false);
          break;

        case 'Both':
          $hospital.addClass('enabled').find('input').prop('disabled', false);
          $extras.addClass('enabled').find('input').prop('disabled', false);
          break;

        case '':
        default:
          $hospital.removeClass('enabled').find('input').prop('disabled', true);
          $extras.removeClass('enabled').find('input').prop('disabled', true);
          break;
      }
    }).trigger('change');

    // Priority selection tables
    // Enables click
    $('.priority-selection').on({
      mouseenter: function (ev) {
        $(this).addClass('input-hover-toggle');
      },
      mouseleave: function (ev) {
        $(this).removeClass('input-hover-toggle');
      },
      click: function (ev) {
        var $target = $(ev.target);

        // Ensure we're not clicking on the checkbox -- it will result in double-toggling
        if ($target.is('input'))
          return;

        // Otherwise, act as if we clicked on the checkbox itself
        $(this).find('.checkbox:first').trigger('click');
      }
    }, 'tr');
  };

})( jQuery, window, document );
