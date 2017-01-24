// Standard easing used throughout the site
jQuery.extend( jQuery.easing, {
  easeOutBack: function (x, t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  }
});


/*
 * selectorSupported() function
 * <http://lea.verou.me/2011/07/detecting-css-selectors-support-my-jsconf-eu-talk/>
 */
function selectorSupported(selector) {
  var doc = document,
    el = doc.createElement('style'),
    supported = false,
    theRules;

  // IE seems to need a type to recognise a stylesheet.
  el.type = 'text\/css';

  // This ASSUMES that IE will always give stylesheets a styleSheet method.
  // Watch this space for errors.
  if (el.styleSheet) {
    el.styleSheet.cssText = selector + '{}';
    // May as well save some typing.
    theRules = el.styleSheet.rules;
    // IE7 and 8 map '::before' to ':before' so we can't simply
    // check that our selector is the same as the returned one.
    // The selectorText of any unrecognised selector is 'UNKNOWN' and
    // unrecognised Pseudo-elements come back as ':unknown', so we can
    // check for that.
    supported = (theRules && theRules[0].selectorText
      && theRules[0].selectorText.toLowerCase().indexOf('unknown') < 0);
  } else {

    // Standards-based browsers need the stylesheet to be appended to the
    // DOM, but they will allow us to simply give the style tag some text.
    el.appendChild(doc.createTextNode(selector + '{}'));
    doc.body.appendChild(el);
    supported = !!el.sheet.cssRules.length;
    doc.body.removeChild(el);
  }

  // Clean up after ourselves and give us the results.
  el = null;
  return supported;
}

// User Agent detection
(function () {

  window.iSelect = window.iSelect || {};

  iSelect.browser = {
    ipad:     !!navigator.userAgent.match(/iPad/i),
    iphone:   !!navigator.userAgent.match(/iPhone/i),
    ipod:     !!navigator.userAgent.match(/iPod/i),
    ios:      !!navigator.userAgent.match(/(iPod|iPod|iPhone)/i),
    android:  !!navigator.userAgent.match(/Android/i)
  }

})();

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
