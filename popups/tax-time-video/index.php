<?php

$dtmswitch = isset( $_REQUEST["dtmswitch"] ) && $_REQUEST["dtmswitch"] != 'false' && $_REQUEST["dtmswitch"] != 'off';
?>
<!doctype html>
<!--[if lt IE 7]><html class="ie6"><![endif]-->
<!--[if IE 7]><html class="ie7"><![endif]-->
<!--[if IE 8]><html class="ie8"><![endif]-->
<!--[if gt IE 8]><!-->
<html>
 <!--<![endif]-->
 <head> 
  <title>Tax Is Nuts - iSelect Ltd</title> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css"> 
  <link rel="stylesheet" href="//www.iselect.com.au/iselect-core/v5/css/style.css?version=2992015"> 
  <script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>
  <script>
  	var dtmswitch = "<?php echo $dtmswitch ? 'on' : 'off' ?>";
  </script>
  
  <style media="screen">
  body, html, .box.box-popup { padding:0; margin:0 }
  .wistia_embed { height:100%; height:100vh; width:100%; }
  </style>
 </head> 
 <body class="popup"> 
    <div class="box box-popup"> 
        
        <script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async></script>
        <div class="wistia_embed wistia_async_d65scs7eqy"> </div>
        
        <script src="http://www.iselect.com.au/iselect-core/v5/js/omniture/mbox.js?version=2992015"></script> 
        
        <?php 
        // If the DTM switch is not set, we want to use the old s_code.js
        if ( ! $dtmswitch ) : ?>
          <script src="//www.iselect.com.au/iselect-core/v5/js/omniture/s_code.js?version=20160530"></script>
        <?php endif; ?>
        <script>
            var isel_server_name = "";
            var isel_server_local_name = "";
            s.prop1     = "";
            s.channel   = "";
            s.prop2     = "";
            s.prop11    = "";
            s.pageName  = "";
            s.prop40    = "";
            s.eVar11    = "";
            s.events    = "";
            s.eVar23    = "";
            s.eVar3     = "";
            s.hier1     = "";
            var s_code = s.t();
            if (s_code) document.write(s_code);
        </script>  
        
    </div> 
    
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