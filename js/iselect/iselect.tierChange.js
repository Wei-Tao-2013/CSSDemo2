/*
 *  Responsive menu and behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  // The following value should match style guide's variable exactly
  var breakpointTablet = 1040,  // sass var: $breakpoint-tablet
      breakpointTableThin = 890,// sass var: $breakpoint-tablet-thin
      breakpointPhone = 760;    // sass var: $breakpoint-phone
      
  // also expose these sizes for consumption by other scripts if need be
  // (currently used by jquery.iSelectMagnific)
  $.iSelectTierSizes = {
    tablet: breakpointTablet,
    tabletThin: breakpointTableThin,
    phone: breakpointPhone
  };

  $.lastKnownTier = null;

  function checkTierChange()
  {
    var width = $(window).width(),
        tier = 'desktop';
    
    if(width > breakpointTableThin && width <= breakpointTablet) {
      tier = 'tablet';
    }

    if(width > breakpointPhone && width <= breakpointTableThin) {
      tier = 'tablet-thin';
    }

    if(width < breakpointPhone) {
      tier = 'phone';
    }

    if(tier != $.lastKnownTier) {
      $(document).trigger('tierChange', [tier]);
      $.lastKnownTier = tier;
      //console.log(tier);
    }
  }

  checkTierChange();

  $(window).resize($.throttle(250, checkTierChange));
})( jQuery, window, document );