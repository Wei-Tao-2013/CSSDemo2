/*
 *  Activate form behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  if (typeof webshims == "object") {
    // Webshims forms/validation setup
    webshims.setOptions({
      // we don't use webshims methods on $() handlers
      waitReady: false, // <http://afarkas.github.io/webshim/demos/#Guide-fire-when-ready>
      // change this if styleguide is moves to a different location
      basePath: iSelect.asset_root + 'js/lib/webshim/shims/'
    });
    webshims.polyfill('forms');

  } else if (typeof console == "object") {
    console.warn("webshims library not found");
  }

  iSelect.formBehaviour = function () {
    var $formControls = $('.form-group, .form-row');

    $formControls.conditionalControls();

    // Enhanced select/inputs
    $('.enhanced-select, .enhanced-input').enhancedInput();

    // Show notifications on form invalidation
    bindErrorNotifications();

    // Input length notifications
    showInputMaxlength();

    // Input masking
    $('input[data-input-mask]').each(function () {
      var $this = $(this);
      // access the attribute directly, since $.data is slower
      $this.mask($this.attr('data-input-mask'));
    });

  };

  // Show notifications on form invalidation
  function bindErrorNotifications () {
    $(document.body).on('firstinvalid', function (ev) {
      var $target = $(ev.target),
          $alikeInputs = $('[name="'+ $target.attr('name') +'"]');

      // Create notification
      $target.focus().notification({
        message: $target.data('form-message') || $target.getErrorMessage() || "This field is not valid",
        type: 'error',
        timeout: 10000
      });

      function validateForm() {
        // <http://dev.w3.org/html5/spec-preview/constraints.html#the-constraint-validation-api>
        if ($target.prop('validity').valid) {
          // if it's valid, close the notification
          $target.notification('close');

          // and re-check validity (may fire another firstinvalid event)
          // $().callProp is an extension function added by webshims
          $target.parents('form:first').callProp('checkValidity');

          // unbind this event
          $alikeInputs.off('change.validateForm', validateForm);
        }
      }

      // When any input with the same name changes, check validity and possibly
      // move to the next invalid field. Unbind this checking event.
      $alikeInputs.on('change.validateForm', validateForm);

      ev.preventDefault(); // suppress native error message
    });
  }

  // Input length notifications
  function showInputMaxlength () {
    $('input[maxlength]').on({
      // on focus, trigger a change to display notification
      'focus.maxlength': function (ev) {
        $(ev.target).trigger('keyup.maxlength');
      },

      // on change, create/update the notification and start updating
      'keyup.maxlength': function (ev) {
        var $target = $(ev.target),
            remaining = parseInt($target.attr('maxlength')) - $target.val().length;

        if (remaining == 0)
          remaining = 'No';

        $target.notification({
          message: remaining + ' character'+ (remaining == 1 ? '' : 's') +' remaining',
          type: 'info',
          timeout: 0
        });
      },

      // on blur, remove it
      'blur.maxlength': function (ev) {
        $(ev.target).notification('close');
      }
    });
  }

})( jQuery, window, document );
