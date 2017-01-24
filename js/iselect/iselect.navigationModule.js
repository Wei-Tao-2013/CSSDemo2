/*
 *  Navigation module behaviour
 *  For the global mega dropdwon
 *  Aligns submenus and defines touch device behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.navigationModule = function () {
    var menuTimeout, // delay before opening the submenu
        $topNav = $('.navigation-module'),
        $searchText = $('#searchForm .searchText');

    // expand search menu on focus/blur
    $('#searchForm', $topNav).on({
      focusin: function () { $topNav.addClass('search-focus'); },
      focusout: function () { $topNav.removeClass('search-focus'); },
      submit: function () { if ($searchText.val().length <= 0) return false; },
      invalid: function (e) { e.stopPropagation(); },
      firstinvalid: function (e) { e.stopPropagation(); }
    });

    $topNav.on({
      'mouseenter': function(ev) {
        var $menuItem = $(this),
            $subMenu = $menuItem.find('.subMenu');

        // Skip in case there's no submenu
        if (!$subMenu.length)
          return;

        // Position menus which may not match up
        positionSubMenu($menuItem, $subMenu);

        // Do submenu animation
        var subMenuHeight = $subMenu.height();
        $subMenu.hide();

        clearTimeout(menuTimeout); // in case of multiple menus queued
        menuTimeout = setTimeout(function () {
          $subMenu.
            show().
            css('height', 1).
            animate({
              height: subMenuHeight
            }, {
              duration: 300,
              easing: 'easeOutBack',
              always: function () {
                // Reset animated css styles (or halfway animated submenus will get
                //  the wrong subMenuHeight, above)
                $subMenu.css({
                  'height': '',
                  'display': ''
                });
              }
            });

        }, 165); // subMenu display delay
      },
      'mouseleave': function (ev) {
        // Stop animation and hide.
        var $subMenu = $(this).find('.subMenu');

        clearTimeout(menuTimeout); // prevent menu from animating
        $subMenu.stop(true).css({
          height: '',
          display: ''
        }); // clear potentially mid-animation css
      }

      // Scope events to immediate children li's only
    }, '> li');

    // Ensures a child .subMenu is near the parent menu item itself
    function positionSubMenu($menuItem, $subMenu) {
      var menuItemPosition = $menuItem.position(),
          menuTotalWidth = $menuItem.parent().width(),
          subMenuWidth = $subMenu.outerWidth();

      // Align the submenu to the parent button's left, unless it will go off
      // the right of the menu container
      if (menuItemPosition.left + subMenuWidth < menuTotalWidth)
        $subMenu.css('left', menuItemPosition.left);
      else
        $subMenu.css('left', menuTotalWidth - subMenuWidth);
    }
  };

})( jQuery, window, document );
