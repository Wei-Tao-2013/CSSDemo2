<?php
	include (dirname( __FILE__ ) . '/../../config.php');
	$serverName = isset( $_REQUEST["serverName"] ) ? $_REQUEST["serverName"] : '';
	$localServerName = isset( $_REQUEST["localServerName"] ) ? $_REQUEST["localServerName"] : '';
	$pageName = isset( $_REQUEST["pageName"] ) ? $_REQUEST["pageName"] : '';
	$channel = isset( $_REQUEST["channel"] ) ? $_REQUEST["channel"] : '';
	$hier1 = isset( $_REQUEST["hier1"] ) ? $_REQUEST["hier1"] : '';
	$serveventserName = isset( $_REQUEST["events"] ) ? $_REQUEST["events"] : '';
	$sprop2 = isset( $_REQUEST["sprop2"] ) ? $_REQUEST["sprop2"] : '';
	$sprop11 = isset( $_REQUEST["sprop11"] ) ? $_REQUEST["sprop11"] : '';
	$sprop40 = isset( $_REQUEST["sprop40"] ) ? $_REQUEST["sprop40"] : '';
	$evar19 = isset( $_REQUEST["evar19"] ) ? $_REQUEST["evar19"] : '';
	$dtmswitch = isset( $_REQUEST["dtmswitch"] ) && $_REQUEST["dtmswitch"] != 'false' && $_REQUEST["dtmswitch"] != 'off';

// If the DTM switch is not set, we want to use the old s_code.js
if ( ! $dtmswitch ) : ?>
<script src="<?php echo BASE_URL; ?>js/omniture/s_code.js?version=<?php echo VERSION; ?>"></script>
<?php endif; ?>

<script>

	var isel_server_name = "<?php echo $serverName; ?>";
	var isel_server_local_name = "<?php echo $localServerName; ?>";

	s.pageName 	= "<?php echo $pageName; ?>";
	s.channel 	= "<?php echo $channel; ?>";
	s.hier1 	= "<?php echo $hier1; ?>";
	s.events 	= "<?php echo $serveventserName; ?>";
	s.prop2		= "<?php echo $sprop2; ?>";
	s.prop11	= "<?php echo $sprop11; ?>";
	s.prop40 	= "<?php echo $sprop40; ?>";
	s.eVar19	= "<?php echo $evar19; ?>";
