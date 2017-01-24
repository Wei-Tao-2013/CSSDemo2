<?php
	include (dirname( __FILE__ ) . '/../../config.php');
	$jQueryUI = $_REQUEST["jQueryUI"];
	$forms = $_REQUEST["forms"];
	
?>
<link rel="stylesheet" href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css" />
<link rel="stylesheet" href="<?php echo BASE_URL; ?>css/style.css?version=<?php echo VERSION; ?>" />
<?php if($jQueryUI == "on"){ ?>
	<link rel="stylesheet" href="<?php echo BASE_URL; ?>css/lib/jquery-ui/jquery-ui.css?version=<?php echo VERSION; ?>" />
<?php } ?>
<?php if($forms == "on"){ ?>
	<link rel="stylesheet" href="<?php echo BASE_URL; ?>css/page-forms.css?version=<?php echo VERSION; ?>" />
<?php } ?>
<link rel="stylesheet" href="<?php echo BASE_URL; ?>css/gigya.css?version=<?php echo VERSION; ?>" />

<?php

/* Dynamically Add in Adobe DTM Javascript based on GET argument and production domain */

if( isset( $_GET['dtm' ] ) && $_GET['dtm' ] == 'on' ) {

	if( defined( 'IS_PRODUCTION' ) && IS_PRODUCTION ) : ?>

		<script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>

	<?php else: ?>

		<script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75-staging.js"></script>

		<?php
	endif;

}

?>