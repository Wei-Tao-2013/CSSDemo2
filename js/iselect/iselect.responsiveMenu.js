/*
 *  Responsive menu and behaviour
 *
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  window.iSelect = window.iSelect || {};

  iSelect.responsiveMenu = function () {

    if (!window.matchMedia)
      return; // responsive is unsupported

    // The following value should match style guide's variable exactly
    var breakpointPhone = 980,
        $mainMenu = $('.navigation-module');

    if ($mainMenu.length === 0)
      return; // not a regularly-formed page

    /**
     * For page-content make a clone of the sidebar item
     * "Get a quote" which is hidden in place on mobile
     * and enhanced into a pull up menu that sits fixed
     * to the viewport bottom.
     *
     * This is called below in responsiveMenu
     */
    var $cloneSidebarGetQuote = null;
    function cloneSidebarGetQuote()
    {

      if($cloneSidebarGetQuote !== null) {
        return;
      }

      var $sidebarGetQuote;
      if( ($sidebarGetQuote = $('#get-a-quote')).length ) {

        var $wrap = $('<div class="mobile-get-a-quote hidden-desktop"><div class="sidebar"></div></div>').appendTo('body'),
            $inner = $('.sidebar', $wrap),
            $toggle = $('<a href="#">'+$('h2:first',$sidebarGetQuote).text()+'</a>').prependTo($wrap),
            speed = 250;

        // once off clone

        // first we need to remove the enhancements from original (we will add them again)
        // note: we need to target the select/input
        $('.enhanced-select select, .enhanced-input input', $sidebarGetQuote).enhancedInput('destroy');

        $cloneSidebarGetQuote = $sidebarGetQuote.clone().appendTo($inner);

        $toggle.on('click', function(e){
          e.preventDefault();
          if($wrap.hasClass('open')) {
            $inner.animate({
              height: 0
            }, speed, function(){
              $wrap.removeClass('open');
            });
          } else {
            $inner.animate({
              height: $cloneSidebarGetQuote.outerHeight()
            }, speed, function(){
              $cloneSidebarGetQuote.height('auto');
              $wrap.addClass('open');
            });
          }
        });

        // add enhancements to both clone and original
        // only target the parent wrapper
        $('.enhanced-select, .enhanced-input', $cloneSidebarGetQuote).enhancedInput();
        $('.enhanced-select, .enhanced-input', $sidebarGetQuote).enhancedInput();
        $sidebarGetQuote.addClass('hidden-mobile');
      }
    }

    // Copies and restructures elements to enable the responsive menu.
    function enableResponsiveMenu() {
      var $nav = $('<nav id="mobile-menu">'),
          $navList = $('<ul>'),
          $contactUs = $('#header .contact-us').clone(),
          $menuButton = $('<a class="btn-menu"></a>'),
          $body = $('body');

      // Modify elements as required
      $mainMenu.children('li').each(function () {
        var $this = $(this),
            $menuList = $('<li>').appendTo($navList),
            $topLinks = $this.children('a:first').clone(),
            $mainLinks = $this.find('.main-links li'),
            $subLinks = $this.find('li'),
            $linksList = $('<ul>');

        // Switch icon types within top-level links
        $topLinks.find('.icon-menu').removeClass('icon-menu').addClass('icon-mobile-menu');

        $topLinks.appendTo($menuList);

        // Collect main (bold) links
        if ($mainLinks.length)
          $linksList.append($mainLinks.clone().addClass('main-link'));

        // Collect any other links
        if ($subLinks.length)
          $linksList.append($subLinks.not($mainLinks).clone());

        // Add the link list to the menu
        if ($linksList.children().length)
          $linksList.appendTo($menuList);
      });

      var searchModule = $('.search-module:first').clone();
      $('<li class="menu-search">').append(searchModule).wrapInner('<span>').appendTo($navList);

      $contactUs.find('.icon-large.phone').removeClass('phone').addClass('phone-white');

      $nav.append($navList);
      $nav.removeClass('navigation-module');

      // Duplicate the dropdown menu into the sidebar
      $menuButton.insertBefore('#header .contact-us');
      $nav.prependTo($body);
      $body.wrapInner('<div>');

      // Enable mmenu
      $nav.mmenu({
        slidingSubmenus: false,
        offCanvas: {
          position: 'right'
        },
        dragOpen: {
          open: true
        },
        header: {
          add: true,
          content: $contactUs,
          title: 'iSelect'
        }
      });

      // Only allow one submenu to be open at once
      $nav.on('click', 'li', function () {
        $(this).siblings('.mm-opened').removeClass('mm-opened');
      });

      // Set up menu button
      $menuButton.on('click', function () {
        $nav.trigger("open.mm");
      });

    }

    $(window).on('resize.responsive', function () {
      // Test if we're responsive
      if (window.matchMedia('(max-width: '+ (breakpointPhone + 1) +'px)').matches) {
        $(window).off('resize.responsive');
        enableResponsiveMenu();
        cloneSidebarGetQuote();
      }
    }).trigger('resize.responsive');

  };

})( jQuery, window, document );
