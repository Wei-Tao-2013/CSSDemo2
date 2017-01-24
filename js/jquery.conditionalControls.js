/*
 *  Form Behaviour - Conditional Controls plugin
 *  Markup-driven form behaviour plugin
 *  Version 1.0
 *  http://www.iselect.com.au/
 *  http://www.iconinc.com.au/
 *
 */
;(function ( $, window, document, undefined ) {
  "use strict";

  // Plugin information and defaults
  var pluginName = 'conditionalControls',
    defaults = {
      methods: {}
    },
    constants = {
      directives: ['showif', 'hideif', 'requiredif'],

      // expressionTest matches only [a-zA-Z0-9_\.\(\)] for names and methods,
      // and [a-z0-9\.] for values.
      // be sure to update the operators list below if any are added
      expressionTest: /^([\w\.]+[\w\.\(\,\)]*)(=|!=|<|<=|>|>=)([\w\.]+)$/,

      // split expressions by these grouping operators surrounded by spaces
      subexpressionOperators: ['and', 'or'],

      // matches a method name and arguments, split by commas
      methodTest: /^([\w\.]+)\(([\w\.\(\,\)]+)\)$/,

      // subexpression calculation methods
      methods: {
        // adapted from <http://stackoverflow.com/questions/4060004/calculate-age-in-javascript/7091965#7091965>
        yearsSince: function (year, month, day) {
          var calc = new Date(year, month - 1, day),
              now = new Date();

          // Handle invalid year argument
          if (isNaN(year) || year <= 0)
            return false;

          // Handle unparseable date
          if (isNaN(calc))
            return false;

          // calcluation vars
          var age = now.getFullYear() - calc.getFullYear(),
              monthDiff = now.getMonth() - calc.getMonth();

          // Remove a year if month is further through the year than we are now
          if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < calc.getDate()))
            age--;

          return age;
        },
    

      yearsSinceLHC:function(e,t,i){
        var n=new Date(e,t-1,i),a=new Date;

        if(isNaN(e)||0>=e)return!1;
        
        if(isNaN(n))return!1;

        var r=a.getFullYear()-n.getFullYear();

        if(a.getMonth()<=5)r--;
       
        var s=6-n.getMonth();

        if (0>s||0===s&&n.getDate()>1) r--;

        return r;
        
        },

        // returns "true" or "false" if input is empty-like
        empty: function (input) {
          if (!input || input == "" || input == -1)
            return "true";
          else
            return "false";
        }
      }
    }

  // The actual plugin constructor
  // All variables expected to be jQuery elements are prefixed with $
  function Plugin( $elementSet, options ) {
    options = options || { methods: {} };

    this._defaults = defaults;
    this.settings = $.extend( {}, defaults, options );
    this.settings.methods = $.extend( {}, constants.methods, defaults.methods, options.methods );

    this._name = pluginName;

    this.$elementSet = this.filterElements($elementSet, constants.directives);
    this.$parentFormSet = this.$elementSet.parents('form');

    // bail if invoked incorrectly
    if (this.$elementSet.length == 0 || this.$parentFormSet.length == 0)
      return;

    // bind update() events to the 'change' event on the parent form(s)
    this.bindUpdateEvents(this.$elementSet.parents('form'));

    this.testElementStates(); // test/set initial element state
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    // Filter elementSet down to only elements with conditional directives
    // directives must be an array which will be transformed into [data-form-*]
    filterElements: function ($elementSet, directives) {

      return $elementSet.filter(function (index) {
        var $thisElement = $elementSet.eq(index);

        // Loop through directives, checking for matches
        for (var directiveI = 0; directiveI < directives.length; directiveI++) {
          var directive = directives[directiveI],
            expression;

          // test if anything is set -- we only support one directive per element
          if (expression = $thisElement.data('form-'+ directive)) {
            // we cache the directive and expression in jQuery for performance
            // and easy lookup
            $thisElement.data('form-directive', directive);
            $thisElement.data('form-expression', expression);

            // return from filter function and keep this element in the set
            return true;
          }

        }

        // if we didn't match any directives, remove this element from the set
        return false;
      });

    },

    // Bind events
    bindUpdateEvents: function () {
      var plugin = this;

      this.$parentFormSet.on('change', function () {
        plugin.testElementStates();
      });
    },

    // Run through each element
    testElementStates: function () {
      var plugin = this,
        formValues = this.$parentFormSet.serializeObject();

      this.$elementSet.each(function () {
        var $this = $(this),
          directive = $.data(this, 'form-directive'),
          expression = $.data(this, 'form-expression');

        // test expression of element
        var truthiness = plugin.testExpression(expression, formValues);

        // based on directive, show or hide this element
        plugin.applyDirective($this, directive, truthiness);
      });
    },

    // Test the truthiness of a whole expression
    testExpression: function (expression, formValues) {
      var splitBy = new RegExp('( '+ constants.subexpressionOperators.join(' | ') + ' )', 'g'),
        splitExpression = expression.split(splitBy),
        currentOperator = 'and', // default operator
        result = true;

      // splitExpression are in form: [ expression, operator, expression, operator... ],
      // so every iteration we skip two indicies
      for (var i = 0; i < splitExpression.length; i = i + 2) {
        var subResult = this.testSubexpression(splitExpression[i], formValues);

        // if there
        if (i + 1 < splitExpression.length)
          currentOperator = splitExpression[i + 1];

        switch ($.trim(currentOperator)) {
          case 'and':
            result = result && subResult;
            break;

          case 'or':
            result = result || subResult;
            break;

          default:
            if (console && console.error)
              console.error('Unknown operator '+ currentOperator);
            return; // undefined
        }
      }

      return result;
    },

    // Test the truthiness of an expression subset (without grouping operators)
    testSubexpression: function (expression, formValues) {
      // Expressions take the following form, without spaces:
      // <formNameOrMethod> <operator> <value>
      // operators can be: =, !=, >, or <
      var result = constants.expressionTest.exec(expression),
        formNameOrMethod = result[1],
        formValue = formValues[formNameOrMethod],
        operator = result[2],
        testValue = result[3],
        methodResult;

      if (!result) {
        if (console && console.error)
          console.error('Could not parse expression '+ expression);
        return; // undefined
      }

      // If formNameOrMethod is actually a method, parse and execute it
      if (methodResult = constants.methodTest.exec(formNameOrMethod)) {
        // methodResult: [1]: method name, [2]: comma seperated arguments
        var methodName = methodResult[1],
            methodArgs = methodResult[2].split(',');

        // resolve arguments to their actual values
        for (var i = 0; i < methodArgs.length; i++) {
          methodArgs[i] = formValues[methodArgs[i]];
        }

        if (typeof this.settings.methods[methodName] == "function") {
          formValue = this.settings.methods[methodName].apply(this, methodArgs);
        }
      }

      // continue parsing
      // 1: expression
      // 2: operator
      // 3: value to test against
      switch (operator) {
        case '=':
          return formValue == testValue;

        case '!=':
          return formValue !== testValue;

        case '>':
          return formValue > testValue;

        case '>=':
          return formValue >= testValue;

        case '<':
          return formValue < testValue;

        case '<=':
          return formValue <= testValue;

        default:
          if (console && console.error)
            console.error('Unknown operator '+ operator);
          return; // undefined
      }
    },

    // Updates form based on directive truthiness
    applyDirective: function ($element, directive, isExpressionTrue) {
      switch (directive) {
        case 'showif':
          if (isExpressionTrue)
            this.showElement($element);
          else
            this.hideElement($element);
          break;

        case 'hideif':
          if (isExpressionTrue)
            this.hideElement($element);
          else
            this.showElement($element);
          break;

        case 'requiredif':
          // !! coerces isExpressionTrue to a boolean
          if (isExpressionTrue) {
            $element.find('input, select, textbox').prop('required', true);
            $element.find('.form-required').css('visibility', 'visible');
          } else {
            $element.find('input, select, textbox').prop('required', false);
            $element.find('.form-required').css('visibility', 'hidden');
          }
          break;

        default:
          if (console && console.error)
            console.error('conditionalControls: Unknown directive "'+ directive +'"')
      }
    },

    // Hide element and disable appropriate children inputs.
    // Used by applyDirective
    hideElement: function ($element) {
      // We removed the :not(disabled) selector due to Firefox carrying
      // over the disabled attribute from previous pageloads, causing
      // problems if you refreshed a conditional form. This means you aren't
      // able to set disabled form elements within conditionally-hidden
      // form elements though.

      $element.hide().
        // find('input:not([disabled]), select:not([disabled])').
        find('input, select').
        addClass('form-conditional-disabled').
        prop('disabled', true);
    },

    // Show element and enable previously disabled children inputs.
    // Used by applyDirective
    showElement: function ($element) {
      $element.show().
        find('.form-conditional-disabled').
        removeClass('form-conditional-disabled').
        prop('disabled', false);
    }
  });

  // A lightweight plugin wrapper around the constructor, preventing against
  // multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    if (this.length == 0)
      return;

    // The following test only tests first element in set, since the plugin
    // is optimised to share an element set. You should avoid binding the
    // plugin on mulitple sets with overlapping elements, although it won't
    // break anything, simply double-check elements.
    var thisElement = this[0]; // raw DOM reference, no jQuery
    if ( !$.data( thisElement, 'plugin_' + pluginName ) ) {
      $.data( thisElement, 'plugin_' + pluginName, new Plugin( this, options ) );
    }

    // jQuery functions should always return this for chaining
    return this;
  };

})( jQuery, window, document );


/*!
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Whereas .serializeArray() serializes a form into an array, .serializeObject()
// serializes a form into an (arguably more useful) object.

(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.

  $.fn.serializeObject = function(){
  var obj = {};

  $.each( this.serializeArray(), function(i,o){
    var n = o.name,
    v = o.value;

    obj[n] = obj[n] === undefined ? v
      : $.isArray( obj[n] ) ? obj[n].concat( v )
      : [ obj[n], v ];
  });

  return obj;
  };

})(jQuery);
