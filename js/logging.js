    /**
     * Global value for log filters
     * @type Array logFilterArray - only messages containing one of the matching strings is logged.
     * All statements will be logged if the filter array is empty.
     * SETUP EXAMPLES:
     *     var logFilterArray = new Array("INFO:");
     *     var logFilterArray = new Array("INFO:","DEBUG:");
     *     var logFilterArray = new Array("#1");
     *
     * USAGE:
     * If logFilterArray contains "DEBUG:" and "#login:", then the following lines
     * will be logged:
     * log("DEBUG: this is a test");
     * log("#login: user has logged in");
     *
     */
//var logFilterArray = new Array("DEBUG:");
    var logFilterArray = new Array("#11");

    /**
     * use console.log to log a message. If logFilter is set, then only messages that
     * contain the filter string are logged.
     * @param {string} msg to log
     */
    function log(msg) {
        var noFilter = logFilterArray.length === 0;
        var hasValidFilter = false;
        for (var i = 0; i < logFilterArray.length; i++) {
            if (msg.indexOf(logFilterArray[i]) >= 0) {
                hasValidFilter = true;
            }
        }

        if (noFilter || hasValidFilter) {
/*
*/
            if( $("html").hasClass("ie8") ) {
                //IE8 only supports console.log
                console.log(msg);
            } else {
                console.debug(msg);
            }

//            console.log(msg);
        }
        
    }



