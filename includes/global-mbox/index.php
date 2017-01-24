<?php
	include (dirname( __FILE__ ) . '/../../config.php');
	$required = $_REQUEST["required"];
?>
<?php if($required == "true"){ ?>
	<script src="<?php echo BASE_URL; ?>js/omniture/mbox.js?version=<?php echo VERSION; ?>"></script>
<?php } ?>
