(function(iSelect, $, window, document, undefined){

  var defaults = {
    items: {},
    // carousel options
    carousel: {
      slideTransitionDuration: 500,
      BEM: {
        b:'wizard-carousel',
        // additional element suffixes
        e: {
          'slide-header': 'slide-header',
          'slide-content': 'slide-content',
          'contextual-help': 'contextual-help'
        },
        // additional modifier class suffixes
        m: {
          'middle-align-slide': 'middle-align-slide',
          'unsupported': 'unsupported'
        }
      }
    }
  };

  iSelect.wizard = function($form, options)
  {
    var self = this;
    options = self.options = $.extend({},defaults,options||{});

    self.$form = $($form);
    self.setExistingValues();
    self.buildSummaryItems();

    self.supportsBorderBox = self.$form.css('box-sizing') === 'border-box';

    self.$form.fluidcarousel(options.carousel);
    var carousel = self.carousel = self.$form.data('fluidcarousel-instance');

    var $contextualHelp = self.$contextualHelp = carousel.$el.find( self.bem('.contextual-help') );

    if(iSelect.selfCorrectingHelp) {
      iSelect.selfCorrectingHelp('.form-help.self-correct', {
        $delegateParent: carousel.$el
      });
    }

    if($contextualHelp.length) {
      $notification = $contextualHelp.find('.notification');

      self.carousel.$el.on('slides-changed', function(e,$new,$old){
        $contextualHelp.hide();
        var $help = $new.find('.form-help .notification');
        if($help.length) {
          $notification.html($help.html());
          $contextualHelp.show();
        }
      });
    }

    // replace the default bwd/fwd button events
    carousel.$el.on('click', self.bem('.bwd'), function(e){
      e.preventDefault();
      self.$contextualHelp.hide();
    });

    carousel.$el.off('click', self.bem('.fwd'));
    carousel.$el.on('click', self.bem('.fwd'), function(e){
      e.preventDefault();
      self.$contextualHelp.hide();

      if(self.queue.slides && self.queue.owner === carousel.$items.eq( carousel.current ).attr('id')) {
        var index = self.queue.displayindex || carousel.current;

        self.setSlides(self.queue.slides, index, function(){
          carousel.nextSlide();
        });

        self.clearQueue();
      } else {
        carousel.nextSlide();
      }

    });

    self.$slidesContainer = self.$form.find( self.bem('.slides') );

    self.watchHeights();

    if(iSelect.browser && iSelect.browser.android || (iSelect.browser.ios && !iSelect.browser.iPad)) {
      self.modernphone = true;
      $('html').addClass('modernphone');
    }

  };

  iSelect.wizard.prototype = {
    start: function(at)
    {
      var self = this;
      var search = document.location.search.substring(1);
      if(search !== '') {
        self.handleLinkBack(search);
      } else if(at) {
        self.setSlides(at);
      }
    },
    knownSlides: {},
    registerSlide: function(key, init)
    {
      var id = this.sid(key) || false;
      if(!id) {
        console.warn('wizard item key ('+key+') is not defined');
        return;
      }
      if(this.knownSlides[id]) {
        console.log(id+ ' is already registered');
        return;
      }

      this.knownSlides[id] = {init:init};
    },
    queue: {},
    clearQueue: function()
    {
      self.queue = {};
    },
    queueSlides: function(keys, displayindex)
    {
      var self = this;
      self.clearQueue();
      self.queue.slides = keys;
      self.queue.owner = self.carousel.$items.eq( self.carousel.current ).attr('id');
      if(displayindex) self.queue.displayindex = displayindex;

      self.toggleSummary(keys);

      self.carousel.setDirectionStates({
        fwd: true,
        bwd: ! (self.$form.hasClass( self.bem('bwd-disabled','m') ))
      });

    },
    setSlides: function(keys, displayindex, callback)
    {
      displayindex = displayindex || 0;

      var self = this,
          options = self.options,
          slideIds = self.sid(keys),
          carousel = self.carousel;

      if(!self.current) {
        self.current = {
          length: 0,
          $slides: carousel.$items,
          $detached: $()
        };
        self.current.length =  self.current.$slides.length;
      }

      if(slideIds) {
        if(typeof(slideIds)==='string') {
          slideIds = slideIds.replace(/\s/g,'').split(',');
        }

        self.current.keys = keys;

        // detach current slides
        self.current.$detached = self.current.$detached.add( self.current.$slides.detach() );

        // NB: this was previously less complex
        //     but we need to ensure the new set
        //     matches the order specified
        var $newSlides = $();
        var index, $tmp;
        var searchDetached = function() {
          index = -1;
          self.current.$detached.each(function(n){
            if(this.id!=='' && slideIds[i].indexOf(this.id) > -1) {
              index = n;
            }
          });

          return index;
        };

        for(var i=0,c=slideIds.length; i<c; i++) {
          // look for it in detacted

          // due to jQuery's inconsistent api `index` doesn't
          // return correct on detached collection
          // other wise we could do this:
          // index = self.current.$detached.index(slideIds[i]);
          // insetad we have to loop :(
          index = searchDetached();

          if(index > -1) {
            // found in detached so splice it from there
            $tmp = self.current.$detached.splice(index, 1);
          } else {
            // look for it anywhere
            // NB: detaching it will make sure it will be added
            //     to the collection in the correct order we specified
            //     (by default .add will add in dom order - we don't want that)
            $tmp = $(slideIds[i]).detach();
          }

          if( $tmp.length ) {

            $newSlides = $newSlides.add($tmp);

            if(self.knownSlides[slideIds[i]] && self.knownSlides[slideIds[i]].init) {
              // run the once off registered init function
              self.knownSlides[slideIds[i]].init.call($tmp);
              delete self.knownSlides[slideIds[i]].init;
            }

          } else {
            try {
              console.warn('slide id '+slideIds[i]+' not found.\nMake sure you\'re not listing keys more than once.\ncurrent keys:', keys);
            }catch(err){}
          }
        }

        $newSlides.appendTo( self.$slidesContainer );

        self.current.length = $newSlides.length;

        self.current.$slides = $newSlides;

        // issue a removed hook event for any remaining detached slides
        self.current.$detached.trigger('slide-removed');
        // issue a slide added event
        self.current.$slides.trigger('slide-added');

        carousel.$items = self.current.$slides;
        carousel.current = displayindex;
        carousel.updateSlideWidths();
        carousel.goToSlide(carousel.current, true, slideIds.length === 1);

        self.toggleSummary(keys);
        self.normalizeHeights();
        self.updateCompletedItems();
        if(callback) callback();
      }

    },
    buildSummaryItems: function()
    {
      var self = this, options = self.options;
      self.$summary = $(options.$summaryList);
      self.$completedItems = $('<input type="hidden" name="completedItems">');
      self.$form.append(self.$completedItems);

      if(options.completedItems) {
        $.each(options.completedItems, function(i,summary){
          var item = options.completedItems[i];

          if (options.fakeSummary) {
            summary.ticked = true;
            var $completed = _summaryItem(summary).addClass('completed');
            if(typeof(options.completedItemsPath) === 'string') {
              $completed.data('uri', options.completedItemsPath + '?' + summary.linkVars);
            }
            self.$summary.append( $completed );
          } else {
            options.items[item.key].summary.desc = item.desc;
            options.items[item.key].summary.ticked = true;
          }
        });
      }

      $.each(options.items, function(k,v){
        if(v.summary) {
          var $item = _summaryItem(v.summary).data('key', k);
          // also store ref to the item so it can be
          // manipulated dynamically
          options.items[k].summary.$item = $item;

          self.$summary.append( $item.hide().addClass('item') );
        }
      });

      if(options.lastItem) {
        self.$summary.append( _summaryItem(options.lastItem) );
      }

      self.$summary.on('click', 'li', function(){
        var key, index = -1, uri = $(this).data('uri');

        if(uri) {
          // completed item settings
          document.location = uri;
        } else if( $(this).hasClass('ticked') && (key = $(this).data('key')) ) {
          // find index of target slide - jquery .index was not useful for this
          self.current.$slides.each(function(i){
            if(options.items[key].id === '#'+this.id) {
              index = i;
            }
          });

          if(index > -1) {
            self.carousel.goToSlide(index);
          }
        }

      });
    },
    setSummaryDesc: function(key, html)
    {
      if(typeof(html) === 'number') {
        html = html.toString();
      }

      try {
        var $item = this.options.items[key].summary.$item,
            valid = typeof(html) === 'string';

        $item.find('.desc').html(valid ? html : '');

        $item[(valid ? 'add' : 'remove')+'Class']('ticked');

        this.options.items[key].summary.ticked = valid;

      }catch(err){
        if(this.options.log) {
          console.warn('failed to update summary key '+key);
        }
      }
    },
    updateCompletedItems: function()
    {
      var self = this,
          completedItems = [],
          keys = self.current.keys;

      $('li', self.$summary).each(function(){
        if($(this).hasClass('ticked')) {
          var icon = $('.summary-icon:not(.tick)', this).attr('class').replace(/(summary-icon|active| )/g,''),
              desc = $('.desc', this).text(),
              title = $.trim($(this).text().replace(desc,'')),
              key = $(this).data('key');

          completedItems.push({
            title: title,
            desc: desc,
            icon: icon,
            key: key,
            linkVars: 'key='+key+'&keys='+keys
          });
        }
      });

      var json = JSON.stringify(completedItems);
      self.$completedItems.val(json);
    },
    setExistingValues: function() {
      var self = this;

      // Find each of the previous items and them add the values
      if (this.options.oldValues !== undefined && typeof this.options.oldValues === 'object') {
        for (var prop in this.options.oldValues) {
          if (this.options.oldValues.hasOwnProperty(prop)) {
            var old = this.options.oldValues[prop];
            // Find the input item
            var $elements,
                name = prop.replace("'", "\'");
            // If the values are in a group, then add the group
            if (self.options.valuesGroup !== undefined) name = self.options.valuesGroup+'['+name+']';
            if (typeof old === 'string') {
               $elements = $('[name="'+name+'"]');
            } else {
              $elements = $('[name="'+name+'[]"]');
            }
            if ($elements.length) {
              self.setElementValue.call(self, $elements, this.options.oldValues[prop]);
            }
          }
        }
      }
    },
    setElementValue: function($elements, value) {
      var $first = $elements.first();
      switch($first[0].tagName) {
        case 'INPUT':
          var type = $first.attr('type');
          this.setInputValue(type, $elements, value);
          break;
        case 'SELECT':
          $elements.val(value);
          break;
        default:
          console.log($first[0].tagName + ' value persistance hasn\'t been implemented');
          break;
      }
    },
    setInputValue: function(type, $elements, value) {
      switch(type) {
        case 'radio':
          $elements.each(function() {
            if ($(this).val() === value) {
              var $element = $(this);
              $element.prop('checked', true);
              $element.closest('label').addClass('active');
            }
          });
          break;
        case 'text':
          $elements.val(value);
          break;
        case 'checkbox':
          $elements.each(function() {
            var $self = $(this),
                val = $self.val();
            if ($.inArray(val, value) >= 0) {
              $self.prop('checked', true);
              $self.closest('label').addClass('active');
            }
          });
          break;
        default:
          console.log(type + ' is not set for setting input values');
          break;
      }
    },
    toggleSummary: function(keys)
    {
      var items = this.options.items;

      if(typeof(keys) === 'string') {
        keys = keys.replace(/\s/g,'').split(',');
      }

      this.$summary.find('.item').hide();
      // this.$summary.find('.item').show();
      $.each(keys, function(i,k){
        if(items[k] && items[k].summary) {
          items[k].summary.$item.show();
        }
      });
    },
    isSlide: function(key, $el)
    {
      var is = false;

      if(this.options.items[key]) {
        var id = '#'+$el.attr('id');
        is = id === this.options.items[key].id;
      }

      return is;
    },
    submitterSlide: function(element)
    {
      var self = this;
      if(!self.submitOwner) {
        var $fwd = self.$form.find(self.bem('.fwd'));
        self.submitOwner = $(element);
        self.$fwdSubmit = $fwd.clone()
          .hide()
          .text('submit')
          .insertAfter($fwd)
          .on('click', function(e){
            e.preventDefault();
            self.$form[0].submit();
          });
        // hide normal forward
        self.direction({fwd:false});
      }
    },
    fwdSubmit: function(show)
    {
      // NB: `show` boolean can be falsey for this method
      // ie. you can pass it the length of a collection and 0 will serve as false
      var self = this,
          isOwner = self.submitOwner[0] === self.carousel.$items.eq(self.carousel.current)[0];

      if(isOwner) {
        // normal forward always hidden
        self.direction({fwd:false});
      }

      if(show && isOwner) {
        self.$fwdSubmit.show();
      } else {
        self.$fwdSubmit.hide();
      }
    },
    direction: function(direction)
    {
      this.carousel.setDirectionStates(direction);
    },
    watchHeights: function()
    {
      /**
       * To acheive middle aligned content and headers that are equal
       * heights so the line is constant we unfortunately have to do
       * it via javascript...
       * This is because we use display:table-cell so
       *
       * This uses
       *
       * - $.lastKnownTier
       * - event: document on 'tierChange'
       *
       * which are defined in the main iSelect global core script
       */
      var self = this, constantly = false;

      // add modifier class for middle aligned content
      self.$form.addClass( self.bem('middle-align-slide', 'm') );

      var normalizeHeights = self.normalizeHeights = function()
      {

        if (self.carousel.$items.not(self.bem('.unsupported','m')) < 2) {
          return;
        }

        constantly = $.lastKnownTier === 'tablet-thin' || $.lastKnownTier === 'phone';

        var hh = 0, ch = 0;

        var $headers = self.$form.find( self.bem('.slide-header') ),
            $contents = self.$form.find( self.bem('.slide-content') ),
            $contextualHelp = self.$form.find( self.bem('.contextual-help') );

        $headers.height('').each(function(){
          // more performant than .height if element is box-sizing: border-box
          var h = self.supportsBorderBox ? parseInt($(this).css('height')) : $(this).outerHeight();
          if(h > hh) hh = h;
        });

        $contents.height('').each(function(){
          // more performant than .height if element is box-sizing: border-box
          var h = self.supportsBorderBox ? parseInt($(this).css('height')) : $(this).outerHeight();
          if(h > ch) ch = h;
        });

        // the version of jQuery sets height incorrectly for border box
        // but its fine if css height used
        if(self.supportsBorderBox) {
          $headers.css('height',hh);
          $contents.css('height',ch);
          $contextualHelp.css('height', hh);
        } else {
          $headers.height(hh);
          $contents.height(ch);
          $contextualHelp.height(hh);
        }
      };

      // adjust when width tier changes
      $(document).on('tierChange', normalizeHeights);
      // table-thin and phone need constant adjust
      // but lets limit the hammering
      $(window).on('resize', function(){
        if(constantly) {
          normalizeHeights();
        }
      });

      normalizeHeights();
    },
    /**
     * Utility to get string of ids specified in options.items
     * @param  comma seprarated sting of keys or array of key strings
     * @return string (comma seperated selector string)
     */
    sid: function(keys)
    {
      if(typeof(keys) === 'string') {
        keys = keys.replace(/\s/g,'').split(',');
      }

      var ids = [], items = this.options.items;
      $.each(keys, function(i,k){
        ids.push(items[k].id);
      });

      return ids.join(',');
    },
    // short cut for BEM classnames
    bem: function(suffix, type)
    {
      if(!this.BEM) {
        // create a self.BEM object which contains
        // the wizards BEM classes and some extras
        //
        // NB: the BEM object is just a convinience
        //     object of prefixed class names.
        //     It contains these main keys
        //     BEM.b {String} - the block class ie. "wizard-carousel"
        //                      this is also the prefix for the rest
        //     BEM.e {Object of strings} internal element class names
        //     BEM.m {Object of strings} internal element class modifiers
        //
        //     $.prefixBEM will return a BEM object where the supplied BEM
        //     BEM.e and BEM.m classes are prefixed with BEM.b
        //     joind with their glue '__' for elements '--' for modifiers
        this.BEM = $.prefixBEM($.extend(true,{},$.fn.utilFluidCarousel.defaults.BEM,this.options.carousel.BEM));
      }

      type = type || 'e';

      var dot = '';
      if(suffix[0]==='.') {
        dot = '.';
        suffix = suffix.substr(1);
      }

      var classname = suffix ? this.BEM[type][suffix] : this.BEM.b;

      return classname ? dot+classname : '';
    },
    /**
     * Handle link back to previous page directing to a slide
     * this is slightly convoluted
     */
    handleLinkBack: function(search)
    {
      if(search === '') return;
      var vars = {}, tmp;

      search = search.replace(/(&amp;)/g,'&').split('&');

      for(var i=0,c=search.length; i<c; i++) {
        tmp = search[i].split('=');
        vars[tmp[0]] = tmp[1];
      }

      if(vars.key && vars.keys) {
        // we want to set slides to the target slide and slides path
        // but if the slide is not the rest of the slides path that
        // goes after the target slide

        // IMPORTANT
        // =========
        // Note in NO way does this populate said slides
        // with any values whatsoever!
        // this just sets up the display of the target slides
        // the actual value would need to be populated in the slides
        // markup via serverside scripting
        var slidesPath = [],
            keyReached = 0,
            keys = vars.keys.split(','),
            index;

        for(var i=0,c=keys.length; i<c; i++) {
          if(keyReached) break;
          slidesPath.push(keys[i]);
          if(keys[i] === vars.key) {
            index = i;
            keyReached = true;
          }
        }

        slidesPath = slidesPath.join(',');

        var self = this;
        self.setSlides(slidesPath, index, function(){
          self.carousel.goToSlide(index,true,true);
        });
      }
    },
  };

  /**
   * Create a summary list item
   * @param  {[type]} summary [description]
   * @return {[type]}         [description]
   */
  function _summaryItem(summary)
  {
    var html = '<li'+(summary.ticked ? ' class="ticked"' : '')+'>';
    html += '<i class="summary-icon '+(summary.icon || '')+'"></i>';
    html += summary.title;
    html += '<div class="desc">'+(summary.desc || '')+'</div>';
    html += '<i class="summary-icon tick"></i>';
    html += '</li>';

    return $(html);
  }
})(window.iSelect || (window.iSelect || {}), jQuery, window, document);

/**
 * @author Rhys Burnie
 * low level fluid carousel
 */
(function($){
  var glueBEM = {glue:{e: '__',m: '--'}};
  $.prefixBEM = function(BEM)
  {
    BEM = $.extend(glueBEM, BEM);

    var ePrefix = BEM.b + BEM.glue.e,
        mPrefix = BEM.b + BEM.glue.m;

    // prefix bem classes
    for(e in BEM.e) {
      if(BEM.e.hasOwnProperty(e) && BEM.e[e].indexOf(ePrefix) !== 0) {
        BEM.e[e] = ePrefix + BEM.e[e];
      }
    }
    for(m in BEM.m) {
      if(BEM.m.hasOwnProperty(m) && BEM.m[m].indexOf(mPrefix) !== 0) {
        BEM.m[m] = mPrefix + BEM.m[m];
      }
    }
    return BEM;
  };

  var defaults = {
    slideTransitionDuration: 500,
    BEM: {
      b: 'fluid-carousel',
      e: {
        viewport: 'viewport',
        slides: 'slides',
        slide: 'slide',
        fwd: 'fwd',
        bwd: 'bwd'
      },
      m: {
        enhanced: 'enhanced',
        'bwd-disabled': 'bwd-disabled',
        'fwd-disabled': 'fwd-disabled',
        'slides-locked': 'slides-locked'
      },
      glue: {
        e: '__',
        m: '--'
      }
    }
  };

  // if velocity present use that for animation
  var fnNameAnimate = $.fn.velocity ? 'velocity' : 'animate';

  function FluidCarousel(el, options)
  {
    options = $.extend(true,{},defaults,options||{});
    this.init(el, options);
  }
  FluidCarousel.prototype = {
    init: function(el, options)
    {
      var self = this;
      self.options = options;

      var BEM = self.BEM = $.prefixBEM(options.BEM);

      // store ref to element and make sure it has block class
      // find elements by their element class
      self.$el = $(el).addClass(BEM.b+' '+BEM.m.enhanced);

      self.$viewport = $( '.'+BEM.e.viewport , self.$el);
      self.$wrap = $( '.'+BEM.e.slides , self.$el);
      self.$items = $( '.'+BEM.e.slide , self.$el);
      self.$fwd = $( '.'+BEM.e.fwd , self.$el);
      self.$bwd = $( '.'+BEM.e.bwd , self.$el);

      // add missing els
      if(!self.$viewport.length) {
        self.$viewport = $('<div class="'+BEM.e.viewport+'">').appendTo(self.$el);
      }
      if(!self.$wrap.length) {
        self.$wrap = $('<div class="'+BEM.e.slides+'">').appendTo(self.$viewport);

        if(self.$items.length) {
          self.$wrap.append(self.$items);
        }
      }

      self.updateSlideWidths();

      // delegate events

      self.$el.on('click', '.'+BEM.e.fwd, function(e){
        e.preventDefault();
        self.nextSlide();
      });

      self.$el.on('click', '.'+BEM.e.bwd, function(e){
        e.preventDefault();
        self.prevSlide();
      });

      self.setDirectionStates();
    },
    current: 0,
    slideTmpLock: false,
    slidesLocked: false,
    nextSlide: function()
    {
      var self = this,
          n = self.current + 1;

      if(n == self.$items.length || self.$el.hasClass( self.BEM.m['fwd-disabled'] )) {
        // at end of slides
        return;
      }
      self.goToSlide(n);
    },
    prevSlide: function()
    {
      var self = this, n = self.current - 1;
      if(n < 0 || self.$el.hasClass( self.BEM.m['bwd-disabled'] )) {
        // at start of slides
        return;
      }
      self.goToSlide(n);
    },
    goToSlide: function(index, cut, force)
    {
      var self = this;

      if(!self.timestamp) {
        // so the 1st set slide has accurate time
        self.timestamp = new Date().getTime();
      }

      if(self.slidesLocked || self.slideTmpLock || (index === self.current && !force)) {
        // console.log('cant go to next slide because',
        //   'self.slidesLocked || self.slideTmpLock || index === self.current',
        //   self.slidesLocked, self.slideTmpLock, index === self.current,
        //   'index, self.current', index, self.current
        // );
        return;
      }
      self.slideTmpLock = true;

      self.setSlidePosition(index, function(){
        var now = new Date().getTime(),
            spent = now - self.timestamp,
            direction = index > self.current ? 'fwd' : 'bwd',
            $old = self.$items.eq(self.current),
            $new = self.$items.eq(index);

        if(index === self.current) {
          // can only happen on force (used internally)
          direction = 'fwd';
        }

        self.timestamp = now;

        if($old[0] !== $new[0]) {
          $old.trigger('slide-leave', [self.current, direction, spent]);
        }
        self.current = index;
        self.slideTmpLock = false;
        self.setDirectionStates();
        $new.trigger('slide-enter', [index, direction]);

        // also a listener on parent
        // used by wizard internally
        self.$el.trigger('slides-changed', [$new, $old]);
      }, !!cut);
    },
    setSlidePosition: function(index, complete, cut)
    {
      var left = 0 - (index * 100) + '%';

      this.$wrap[fnNameAnimate]({
        left: left
      }, cut ? 0 : this.options.slideTransitionDuration, complete);
    },
    updateSlideWidths: function()
    {
      var self = this,
          length = self.$items.length,
          times = 100 * length,
          divide = 100 / length;

      self.$wrap.css('width', times + '%');
      self.$items.css('width', divide + '%');
    },
    addSlides: function($slides)
    {
      var self = this;
      this.$items = this.$items.add($slides.each(function(){
        // ensure it has the BEM class name
        $(this).addClass(self.BEM.e.slide).appendTo(self.$wrap);
      }));
      self.updateSlideWidths();
      self.$el.trigger('slides-added', [$slides, self.$items]);
    },
    setDirectionStates: function(forceState)
    {
      var self = this,
          bwdDisableClass = self.BEM.m['bwd-disabled'],
          fwdDisableClass = self.BEM.m['fwd-disabled'],
          bwdDisable = self.current === 0,
          fwdDisable = self.current === self.$items.length - 1;

      if(forceState) {
        // disregard detected settings
        // inverse booleans so that the api does what it looks like
        // ie. setDirectionStates({bwd:false,fwd:true})
        // looks like disable bwd enable fwd
        if('bwd' in forceState) bwdDisable = !forceState.bwd;
        if('fwd' in forceState) fwdDisable = !forceState.fwd;
      }

      self.$el[ (bwdDisable ? 'add' : 'remove')+'Class'](bwdDisableClass);
      self.$el[ (fwdDisable ? 'add' : 'remove')+'Class'](fwdDisableClass);

      return this;
    },
    update: function()
    {
      //console.log(arguments);
    }
  };

  // expose jQuery plugin
  // ====================
  $.fn.fluidcarousel = function(options) {

    if(typeof options != 'string') {
      options = $.extend(true,{},defaults,options||{});
    }

    var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];

    this.each(function(){
      var instance = $.data(this, 'fluidcarousel-instance');

      if(instance && typeof instance[options] == 'function') {
        instance[options].apply(instance, args);
      } else {
        $.data(this, 'fluidcarousel-instance', new FluidCarousel(this, options));
      }
    });

    return this;
  };

  $.fn.utilFluidCarousel = {
    defaults: defaults,
    clonePrototype: function(obj)
    {
      return $.extend({}, FluidCarousel.prototype, obj||{});
    },
    init: function(context, el, options){
      options = $.extend(true,{},defaults,options||{});
      FluidCarousel.prototype.init.call(context, el, options);
    }
  };
}(jQuery));