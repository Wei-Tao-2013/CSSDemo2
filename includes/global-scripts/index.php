<?php
	include (dirname( __FILE__ ) . '/../../config.php');
	$server = $_SERVER['HTTP_HOST'];
	$googleMap = $_REQUEST["googleMap"];
	$jQueryUI = $_REQUEST["jQueryUI"];
	$mobileMenu = $_REQUEST["mobileMenu"];
	$gigya = $_REQUEST["gigya"];
	$handlebars = $_REQUEST["handlebars"];
?>
<?php if($googleMap == "on"){ ?>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmE9anb91HDNRh5lKnpSgUjNEe3b4kZWw"></script>
<?php } ?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="<?php echo BASE_URL; ?>js/lib/jquery-1.11.1.min.js"><\/script>');</script>
<?php if($jQueryUI == "on"){ ?>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
	<script>window.jQuery.ui || document.write('<script src="<?php echo BASE_URL; ?>js/lib/jquery-ui.min.js"><\/script>');</script>
<?php } ?>
<?php if($mobileMenu == "on" || $gigya == "on"){ ?>
	<script src="<?php echo BASE_URL; ?>js/lib/mmenu/jquery.mmenu.combined.min.js?version=<?php echo VERSION; ?>"></script>
<?php } ?>
<?php if($handlebars == "on"){ ?>
	<script src="<?php echo BASE_URL; ?>js/lib/handlebars-v2.0.0.js?version=<?php echo VERSION; ?>"></script>
<?php } ?>
<script src="<?php echo BASE_URL; ?>js/iselect-global.js?version=<?php echo VERSION; ?>"></script>
<script>iSelect.asset_root = "<?php echo BASE_URL; ?>";</script>
<script src="<?php echo BASE_URL; ?>js/script.min.js?version=<?php echo VERSION; ?>"></script>
<script src="<?php echo BASE_URL; ?>js/cookies/jquery.cookie.js?version=<?php echo VERSION; ?>"></script>
<?php
	if($gigya == "on"){
		if ($server == "uat.iseldev.com"){
			$APIKey ="3_lVSeNKH5WS6Ni0FVX3znpwJtFFn8nJiiRY3veNUX3unYrmC9LemoFauKN8FvXoHf"; // UAT
		}
		else if ($server == "www.iselect.com.au"){
			$APIKey = "3_atxFFQ-D25-YwPPB2RSldx2ONMDpk9aalAqGS1mF3H1Z6lIuWrSjG0Dg5007n7im"; // PROD
		}
		else{
			$APIKey ="3_2M1vjSjqx9Wg9--gwzEPYdN32rjfPM68Gr3wM8hYZWttJHyRWBeP0SaYIsxCRSJB"; // DEV
		}
?>
<script src="http://cdn.gigya.com/js/gigya.js?apiKey=<?php echo $APIKey ?>"></script>
<script src="<?php echo BASE_URL; ?>js/iselect-gigya.js?version=<?php echo VERSION; ?>"></script>
<script>
	gigya.params.gigyaMaxExpiresDay = "<?php echo $_REQUEST["gigyaMaxExpiresDay"]; ?>";
	gigya.params.baseUrl            = "<?php echo BASE_URL; ?>";
	gigya.params.domainUrl          = "<?php echo PROTOCOL . SERVER . PORT; ?>";
	gigya.params.loginURL           = "<?php echo $_REQUEST["loginURL"]; ?>";
	gigya.params.logoutURL          = "<?php echo $_REQUEST["logoutURL"]; ?>";
	gigya.params.redirectNeed       = "<?php echo $_REQUEST["redirectNeed"]; ?>";
	gigya.params.redirectURL        = "<?php echo $_REQUEST["redirectURL"]; ?>";
	gigya.params.redirectOtherPara  = "<?php echo $_REQUEST["redirectOtherPara"]; ?>";
</script>
<?php } ?>
