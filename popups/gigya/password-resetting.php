<?php
	include ('../../config.php');
	$passwordToken = $_REQUEST["pwrt"];
	$apiKey = $_REQUEST["apiKey"];
?>
<!DOCTYPE html>
<!--[if lt IE 7]><html class="ie6"><![endif]-->
<!--[if IE 7]><html class="ie7"><![endif]-->
<!--[if IE 8]><html class="ie8"><![endif]-->
<!--[if gt IE 8]><!-->
<html>
<!--<![endif]-->
<head>
<title>Password Reset</title>
<meta charset="utf-8">
<meta name="robots" content="noindex, follow">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet"
	href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css" />
<link rel="stylesheet"
	href="<?php echo BASE_URL; ?>css/style.css?version=<?php echo VERSION; ?>" />
<script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>

<!-- DTM switch code -->
<script>
  function dtm_queryvar( name ) {
	  var query = window.location.search.substring( 1 );
	  var vars = query.split( "&" );
	  for ( var i = 0; i < vars.length; i++ ) {
		  var pair = vars[ i ].split( "=" );
		  if ( pair[0] == name ) return pair[1];
	  }
	  return false;
  }
  var dtmswitch = dtm_queryvar( 'dtmswitch' );
  dtmswitch = ( dtmswitch == 'on' || dtmswitch == 'true' ) ? 'on' : 'off';
  if ( window.console != undefined ) {
	  console.log( 'dtmswitch = ' + dtmswitch );
  }
</script>
<!-- END DTM switch code -->

</head>

<?php  //[LOCAL STYLES] ?>
<style>
.form-row {width:50%;}
</style>

<body class="popup">
	<div class="box box-white">
		<div style="margin-bottom:20px;">
			<a href="http://www.iselect.com.au"><img src="http://www.iselect.com.au/iselect-core/v5/images/logo.png" alt="iSelect Homepage"></a>
		</div>
		<h2>Password reset</h2>
		<form id ="target" action="#">
		<div class="form-row">
		  <p>Please enter a new passowrd </p>
		</div>
		<div class="form-row">
		<div class="form-control form-control-wide">
		<label for="password" class="form-label">New password:</label>
		<input type="text" id="password"  class="form-control"  required="required" > 
		</div>
		</div>
		<div class="form-row">
		<div class="form-control form-control-wide">
		<label for="re-password" class="form-label">Re-enter new password:</label>
		<input type="text" id="re-password"  name="repassword"   class="form-control"  data-form-message="" required="required" > 
		</div>
		</div>
		<div class="form-row">
		<div class="form-control form-control-submit">
		<input type="submit" id="re-setpassword" class="btn btn-primary btn-full-mobile " value="Submit">
		</div>
		</div>
		</form>
        <div><label id="lblStatus" ></label></div>
		<div><label id="lblSuccess" ></label></div>
	</div>

	<?php // [GLOBAL SCRIPTS] ?>
	<script
		src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?php echo BASE_URL; ?>js/lib/jquery-1.11.1.min.js?version=<?php echo VERSION; ?>"><\/script>');</script>
	<script
		src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
	<script>window.jQuery.ui || document.write('<script src="<?php echo BASE_URL; ?>js/lib/jquery-ui.min.js?version=<?php echo VERSION; ?>"><\/script>');</script>
	<script src="<?php echo BASE_URL; ?>js/iselect-global.js?version=<?php echo VERSION; ?>"></script>
	<script>iSelect.asset_root = "<?php echo BASE_URL; ?>";</script>
	<script src="<?php echo BASE_URL; ?>js/script.min.js?version=<?php echo VERSION; ?>"></script>
	<script
		src="<?php echo BASE_URL; ?>js/cookies/jquery.cookie.js?version=<?php echo VERSION; ?>"></script>
     <script src="http://cdn.gigya.com/js/gigya.js?apiKey=<?php echo $apiKey; ?>"></script>

	<?php // [LOCAL SCRIPTS] ?>
	<script>
		var passwordToken  = '<?php  echo $passwordToken; ?>';
		
		;(function ( $, win, doc, undefined ){
			     "use strict";
		    	win.gigya = win.gigya || {};
		    	gigya.elements = {
		    		target   					: $("#target"),
					password 					 : $("#password"),
					repassword    		         : $("#re-password"),
					resetpassword                : $("#re-setpassword"),
					lblStatus                    : $("#lblStatus"),
					lblSuccess                   : $("#lblSuccess")
				};

		//password resetting
		gigya.elements.target.on("submit",function(e){
			var newPassword =gigya.elements.password.val();
			gigya.accounts.resetPassword({
			                passwordResetToken: passwordToken,
			                newPassword: newPassword,
			                callback: gigya.resetPasswordCallback
			            });
			e.preventDefault();
		});
        
        //call back from gigya server
		gigya.resetPasswordCallback = function (response) {
		    var errorCode = response['errorCode'];
		        errorCode !== 0 ? function(){
					var errorDetails = response["errorDetails"], // "Reset password link invalid, please send resetPassword again to receive 
						errorMessage = response["errorMessage"], // "Invalid parameter value",
						statusCode = Math.round(errorCode / 1000),
						statusReason = (errorDetails != null && errorDetails.length > 0) ? errorDetails : errorMessage;
		       		 gigya.elements.lblStatus.text('Request error: ' + statusReason + '(error code:' + statusCode + ')');
		       		 gigya.elements.lblSuccess.text('');
		       }() : function(){
		       	    gigya.elements.lblStatus.text('');
					gigya.elements.resetpassword.css("background","linear-gradient(#cfd1d3, #cfd1d3)").prop("disabled",true)
					gigya.elements.lblSuccess.text('Your password has been successfully reset.You may now use your new password to login.');
		       }();
		}

		//validate password
		gigya.elements.repassword.on("change",function(e){
			$(this).val() === gigya.elements.password.val() ? function(){
				gigya.elements.repassword.setCustomValidity("");
			}(): function(){
				gigya.elements.repassword.setCustomValidity("false");
				gigya.elements.repassword.attr("data-form-message","Please make sure password is same.");
			}();
		});

		})( jQuery, window, document );

    </script>	

	<?php // [GLOBAL OMNITURE] ?>
	<script
		src="<?php echo BASE_URL; ?>js/omniture/s_code.js?version=<?php echo VERSION; ?>"></script>
	<script src="<?php echo BASE_URL; ?>js/omniture/mbox.js?version=<?php echo VERSION; ?>"></script>
	<script>
		var isel_server_name = "";
		var isel_server_local_name = "";
		s.prop1     = "";
		s.channel   = "Health Insurance";
		s.prop2     = "pop-up";
		s.prop11    = "gigya password resetting";
		s.pageName  = "iSelect:Health Insurance:Pop-up:gigya password resetting";
		s.prop40    = "";
		s.eVar11    = "";
		s.events    = "";
		s.eVar23    = "";
		s.eVar3     = "";
		s.hier1     = "iSelect/Health Insurance/Pop-up/gigya password resetting";
		var s_code = s.t();
		if (s_code) document.write(s_code);
	</script>
	
	<!-- Google Analytics code -->
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
	{ (i[r].q=i[r].q||[]).push(arguments)}
	,i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-50933740-1', 'auto');
	ga('send', 'pageview');
	</script>
	<!-- END Google Analytics code -->
	
<script type="text/javascript">_satellite.pageBottom();</script>
</body>
</html>



