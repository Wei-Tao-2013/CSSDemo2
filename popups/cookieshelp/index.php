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
  <title>Cookies - iSelect Ltd</title> 
  <meta charset="utf-8"> 
  <meta name="robots" content="noindex, follow">
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="stylesheet" href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css"> 
  <link rel="stylesheet" href="http://iselect.com.au/iselect-core/v5/css/style.css?version=2992015"> 
  <script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>
  <script>
  	var dtmswitch = "<?php echo $dtmswitch ? 'on' : 'off' ?>";
  </script>
  
 </head> 
 <body class="popup"> 
  <div class="box box-white box-popup"> 
   <h1>What is a Cookie?</h1> 
   <p> A cookie is a small file which stores information related to your Internet (web browser) activity. It is commonly used by numerous websites across the globe. We use cookies throughout our question process to improve the experience for you such as remembering what you filled in on a previous page allowing you to go back and forth. If your cookies are disabled we will not be able to provide you with a Health comparison quote. A cookie can be easily removed from your computer. </p> 
   <h2>How do I Enable Cookies?</h2> 
   <p>To enable cookies, follow the instructions below for the browser version you are using.</p> 
   <h3>Microsoft Internet Explorer 6.0+</h3> 
   <ul> 
    <li>Select "Internet Options" from the Tools menu.</li> 
    <li>Click on the "Privacy" tab.</li> 
    <li>Click the "Default" button (or manually slide the bar down to "Medium") under "Settings".</li> 
    <li>Click "OK".</li> 
   </ul> 
   <h3>Mozilla Firefox (1.0 final release and earlier)</h3> 
   <ul> 
    <li>Go to the "Tools" menu.</li> 
    <li>Select "Options".</li> 
    <li>Select the "Privacy" icon in the left panel.</li> 
    <li>Check the box corresponding to "Allow sites to set cookies".</li> 
    <li>Click "OK" to save changes.</li> 
   </ul> 
   <p>For further information or assistance in setting cookies, please visit your browser provider's website:</p> 
   <ul> 
    <li>Internet Explorer - <a href="http://www.microsoft.com" title="visit Microsoft" target="_blank">visit Microsoft</a></li> 
    <li>Firefox - <a href="http://www.mozilla.com" title="visit Mozilla" target="_blank">visit Mozilla</a></li> 
    <li>Navigator - <a href="http://www.netscape.com" title="visit Netscape" target="_blank">visit Netscape</a></li> 
    <li>Opera - <a href="http://www.opera.com" title="visit Opera" target="_blank">visit Opera</a></li> 
    <li>Safari - <a href="http://www.apple.com" title="visit Apple" target="_blank">visit Apple</a></li> 
   </ul> 
   <p>Alternatively, if you are having problems with your Cookies, please contact iSelect on 13 19 20 for a phone quote.</p> 
  </div> 
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> 
  <script>window.jQuery || document.write('<script src="http://iselect.com.au/iselect-core/v5/js/lib/jquery-1.11.1.min.js?version=2992015"><\/script>');</script> 
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script> 
  <script>window.jQuery.ui || document.write('<script src="http://iselect.com.au/iselect-core/v5/js/lib/jquery-ui.min.js?version=2992015"><\/script>');</script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/iselect-global.js?version=2992015"></script> 
  <script>iSelect.asset_root = "http://iselect.com.au/iselect-core/v5/";</script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/script.min.js?version=2992015"></script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/cookies/jquery.cookie.js?version=2992015"></script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/omniture/mbox.js?version=2992015"></script> 
  
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