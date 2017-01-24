/**
 * A collection of custom iSelect plugins
 * primarily for use with the form wizard
 *
 * Plugins are prefixed with:
 * `iS_` (capital S) for iSelect
 */
(function($, window, document, undefined){
  
  /**
   * The following plugins are part of the 
   * core script.js from v5 onward:
   *
   * - $.fn.iS_numVal
   * - $.iS_formatDollar
   * - $.fn.iS_numericKeysOnly
   */

  /**
   * Enhances input so it self formats 
   * to a dollar format on user input.
   *
   * You should listen to the `dollar-sync` event
   * 
   * @param  {Object} (optional) options
   *         only looks for one property:
   *         `floats` {Boolean} if true the dollar value may have a period
   */
  $.fn.iS_dollarInput = function(options)
  {
    options = options || {};
    return $(this).each(function(){

      var $input = $(this).iS_numericKeysOnly( !!options.floats ),
          selectionSupported = 'setSelectionRange' in $input[0],
          keyupTimer,
          inputHandler = function(e)
          {
            var val = $input.iS_numVal();
            val = options.floats ? parseFloat(val) : parseInt(val);
            if(isNaN(val) || val < 0) val = 0;

            if(e.type === 'keyup' && selectionSupported) {
              var start = $input[0].selectionStart,
                  end = $input[0].selectionEnd;
            }

            if(e.type == 'keyup' || e.type === 'blur') {
              // sync opportunity used by iS_dollarSlider
              $input.trigger('dollar-sync',[val]);
            }

            if(e.type == 'focus' && val == 0) {
              $input.val('$');
            } else {
              $input.val( $.iS_formatDollar(val) );
            }

            if(e.type === 'keyup' && e.target === $input[0] && selectionSupported) {
              // restore cursor position
              $input[0].setSelectionRange(start,end);
            }

          };

      $input.on('keyup focus blur init-dollar-input', function(e){
        clearTimeout(keyupTimer);
        if(e.type === 'keyup') {
          keyupTimer = setTimeout(function(){
            inputHandler(e);
          }, 50);
        } else {
          inputHandler(e);
        }
      });

      if(iSelect.browser && iSelect.browser.android || (iSelect.browser.ios && !iSelect.browser.iPad)) {
        // on phone we need to place a hidden number field over the
        // text field so as it is focused it will trigger 
        // the phones number keyboard then sync the fields
        // 
        // an attempt was made to make the number field invisible 
        // and show the formatted field underneath however that
        // was a failure because in iOS a cursor is shown which is 
        // out of sync due to the number not having the $ and , chars
        // 
        // so on phones the number field becomes visible
        // the user enters a plain number then on blur
        // you see the formatted field again
        // 
        var $wrap = $('<div class="dollarshim"></div>')
              .insertBefore($input)
              .append($input);
            $number = $('<input type="number" class="dollarshim">')
              .iS_numericKeysOnly( !!options.floats )
              .appendTo($wrap)
              .on('focus keyup blur', function(e){
                if(e.type === 'focus') {
                  $number.val( $input.iS_numVal() );
                  console.log($wrap.addClass);
                  $wrap.addClass('showshim');
                } else {
                  if(e.type==='blur') $wrap.removeClass('showshim');
                  $input.val($(this).val());
                  if(e.type === 'keyup') {
                    keyupTimer = setTimeout(function(){
                      inputHandler(e);
                    }, 50);
                  } else {
                    inputHandler(e);
                  }
                }
              });
      }
    });
  }

  /**
   * DEPENDANCIES:
   * - jQuery ui's slider plugin
   * - iS_dollarInput
   *
   * NB: this does not setup the slider it just connects 
   *     the slider and input with iS_dollarInput functionality
   *
   * Rather than subscribing to the slider `slide` event
   * you should listen to the `dollar-changed` event.
   *
   * ie:
   * var $input = $('input.the-target-input');
   * var $slider = $('.element-for-slider').iS_dollarSlider($input);
   * 
   * $slider.on('dollar-changed', function(e, value, atMax){
   *   // value is current value
   *   // atMax is boolean (if the max defined on slider has been reached)
   * });
   *
   * // initialise the slider plugin
   * $slider.slider({
   *   range : "min",
   *   value : initialVal,
   *   min : 0,
   *   max : 1000000,
   *   step : 10000
   * });
   * 
   * @param  {Element - input} $input
   * @param  {Object} (optional) options
   *         only looks for one property:
   *         `floats` {Boolean} if true the dollar value may have a period
   */
  $.fn.iS_dollarSlider = function($input, options)
  {
    var $slider = $(this);

    if($input!=='options') {

      var max,
          isMax = function(value)
          {
            if(!max) max = $slider.slider("option", "max");
            return !isNaN(max) && value >= max;
          },
          checkMax = function(value)
          {
            $slider.trigger('dollar-changed', [value, isMax(value)]);
          };

      $slider.on({
        'init-dollar-slider': function(e, callback)
        {
          $input.trigger('init-dollar-input');
          var value = $slider.slider('value');
          callback.call(this, value, isMax(value));
        },
        'slidestart': function()
        {
          max = $slider.slider("option", "max");
        },
        'slide': function(e, ui)
        {
          if(ui.value > max) {
            // this is to fix an issue with jQuery ui slider
            // when we set a new max sometimes you can still
            // drag to a higer value (I think due to the steps setting)
            // ex. 
            // If the previous range was 500,000 and this one is
            // set to 499,999 to be less than total the range should not
            // go to 500,000 but somethimes it can...
            // this will prevent that.
            ui.value = max;
          }
          $input.val( $.iS_formatDollar(ui.value) );
          checkMax(ui.value);
        }
      });
      
      $input = $($input)
        .iS_dollarInput( options && options.floats )
        .on('dollar-sync', function(e, val){
          $slider.slider('value', val);
          checkMax(val);
        });

      if($input.parent().hasClass('dollarshim')) {
        // move the range bubble arrow
        // this happens for phones
        $input.parent().parents('.range-bubble:first').find('.rb-arrow').appendTo($input.parent());
      }

    } else {
      
      if(options.minSteps && options.max) {
        // custom option not part of ui slider
        // used to determine a new .step setting
        // so the slider feels nicer when max is a smaller number
        var step = options.step || $slider.slider('option', 'step');
        if(!isNaN(step) && options.max < step * options.minSteps) {
          options.step = Math.ceil(options.max / options.minSteps);
        }
        // delete the non slider option
        delete options.minSteps;
      }

      $.each(options, function(k,v){
        $slider.slider('option', k, v);
      });

    }
    return this;
  }

  /**
   * Setup a calendar style gui interface
   *
   * Expected markup:
   *
   * <div class="calendar-input">
   *   <!-- icon list injected via js -->
   *   <div class="counter">
   *      <a href="#" class="decrement">-</a>
   *      <input name="" type="text" value="1">
   *      <a href="#" class="increment">+</a>
   *   </div>                     
   * </div>
   *
   * You can listen to the `updated` event tho wizard doesnt need to
   * ie. $('.calendar-input').on('updated', function(e, textValue, numericValue){ });
   *
   * To reset this field trigger this event:
   * $('.calendar-input').trigger('reset-calendar');
   * it will reset to the value you set on the element ie. value="1"
   * 
   * @param  {Object} REQUIRED options
   *         required property: 
   *         - resolution: 'weeks' or 'months'
   */
  $.fn.iS_calendarInput = function(options)
  {
    var $el = $(this).prepend($('<ul class="cf"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>'));
   
    var $input = $('input', $el)
          .attr('readonly',true)
          .on('focus', function(){
            this.blur();
          }),
        $inc = $('.increment', $el),
        $dec = $('.decrement', $el),
        $items = $('li', $el),
        resolution = options.resolution,
        singular = resolution.slice(0, -1),
        current = parseInt($input.val()),
        update = function()
        {
          var s = ' ' + (current > 1 ? resolution : singular);
          
          $input.val(current+s);
          $items.removeClass('active circled').each(function(i){
            i++;
            if(i <= current) {
              $(this).addClass('active'+(i===current ? ' circled' : ''));
            }
          });

          $el.trigger('updated', [current+s, current]);
        };

    if(!current || isNaN(current)) current = 1;

    $inc.on('click', function(e){
      e.preventDefault();
      if(current < 12) {
        current++;
      }
      update();
    });

    $dec.on('click', function(e){
      e.preventDefault();
      if(current > 1) {
        current--;
      }
      update();
    });

    var initVal = current;
    $el.on('reset-calendar', function(){
      current = initVal;
      update();
    });

    update();

    return this;
  }

  /**
   * Enhances field to have a numeric keypad made of buttons
   *
   * 1 2 3
   * 4 5 6
   * 7 8 9
   * . 0 C
   *
   * Buttons are generated.
   *
   * listen to the `updated` event
   *
   * Expected markup:
   * <div class="numberpad-field">
   *   <div class="field">
   *     <input type="text" name="needs['currentInterestRate']"> 
   *     <span class="percent">%</span>
   *   </div>
   *   <!-- keys added via js -->
   * </div>
   */
  $.fn.iS_numberpadField = function(floats)
  {
    if(!floats && floats !== false) floats = true;

    var $el = $(this),
        $input = $el.find('input').iS_numericKeysOnly(true),
        keys = '123456789.0C',
        update = function()
        {
          var key = $(this).val(),
              val = $input.val();

          switch(key) {
            case 'C': val = '';
            break;
            case '.': if(floats && val.indexOf('.') === -1) val += '.';
            break;
            default: val += key;
            break;
          }

          $input.val(val);
          $el.trigger('updated', [val]);
        };

    if(!floats) $el.addClass('no-floats');

    for(var i=0,c=keys.length; i<c; i++) {
      $('<button type="button" value="'+keys[i]+'" class="key-'+keys[i].replace('.','dot')+'">'+keys[i]+'</button>')
        .on('click', update)
        .appendTo($el);
    }

    return this;
  };

}(jQuery));