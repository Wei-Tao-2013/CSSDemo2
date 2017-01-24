<?php 

include (dirname( __FILE__ ) . '/../../config.php'); 

$dtmswitch = isset( $_REQUEST["dtmswitch"] ) && $_REQUEST["dtmswitch"] != 'false' && $_REQUEST["dtmswitch"] != 'off';
$ispopup = isset( $_REQUEST["ispopup"] ) && $_REQUEST["ispopup"] != 'false'; 
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="format-detection" content="telephone=no" />
<script>
	var dtmswitch = "<?php echo $dtmswitch ? 'on' : 'off' ?>";
	var ispopup = "<?php echo $ispopup ? 'yes' : 'no' ?>";
</script>
