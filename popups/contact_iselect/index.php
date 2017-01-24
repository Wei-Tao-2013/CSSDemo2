<?php

require dirname( __FILE__ ) . '/../../config.php';

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
  <title>Contact - iSelect Ltd</title> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css"> 
  <link rel="stylesheet" href="//www.iselect.com.au/iselect-core/v5/css/style.css?version=2992015"> 
  <script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>
  <script>
  	var dtmswitch = "<?php echo $dtmswitch ? 'on' : 'off' ?>";
  </script>
  
 </head> 
 <body class="popup"> 
  <div class="box box-white box-popup"> 
   <h1>Contact</h1> 
   <div class="contact-hours contact-hours-left"> 
    <ul class="list-unstyled ui-helper-clearfix"> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact headoffice"></div> 
      <div class="contact-details"> 
       <h2>Head office</h2> 
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact address"></div> 
      <div class="contact-details"> 
       <p>294 Bay Road<br>Cheltenham VIC 3192</p> 
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact postal"></div> 
      <div> 
       <h2>Postal address</h2> 
       <p>PO Box 2021<br>Moorabbin LPO 3189</p> 
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact phone"></div> 
      <div> 
       <h2>Telephone</h2> 
       <p> Sales Enquiries: <strong>13 19 20</strong><br> Non-Sales Enquiries: <strong>03 9276 8000</strong> </p> 
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact fax"></div> 
      <div> 
       <h2>Fax</h2> 
       <p>1300 735 322</p> 
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-contact email"></div> 
      <div> 
       <h2>Email</h2> 
       <p><a href="mailto:info@iselect.com.au" title="info@iselect.com.au">info@iselect.com.au</a></p> 
      </div> </li> 
    </ul> 
   </div> 
   <div class="contact-hours contact-hours-right"> 
    <div class="icon-list openhours"></div> 
    <h2>Normal Office hours</h2> 
    <ul class="list-unstyled ui-helper-clearfix"> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list health"></div> 
      <div> 
       <h3>Health</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'health' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list car"></div> 
      <div> 
       <h3>Car</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'car' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list life"></div> 
      <div> 
       <h3>Life</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'life' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list homeloan"></div> 
      <div> 
       <h3>Home loans</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'homeloans' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list energy"></div> 
      <div> 
       <h3>Electricity &amp; Gas</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'electricity' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
     <li class="ui-helper-clearfix"> 
      <div class="icon-list broadband"></div> 
      <div> 
       <h3>Broadband</h3> 
       <p>
           <?php 
           
           $week_text = iSelectCore\OpeningHours::get_week_text( 'broadband' ); 
           echo nl2br( esc_html( $week_text ) );
           
           ?>
       </p>
      </div> </li> 
    </ul> 
   </div> 
  </div> 
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> 
  <script>window.jQuery || document.write('<script src="//www.iselect.com.au/iselect-core/v5/js/lib/jquery-1.11.1.min.js?version=2992015"><\/script>');</script> 
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script> 
  <script>window.jQuery.ui || document.write('<script src="//www.iselect.com.au/iselect-core/v5/js/lib/jquery-ui.min.js?version=2992015"><\/script>');</script> 
  <script src="//www.iselect.com.au/iselect-core/v5/js/iselect-global.js?version=2992015"></script> 
  <script>iSelect.asset_root = "//www.iselect.com.au/iselect-core/v5/";</script> 
  <script src="//www.iselect.com.au/iselect-core/v5/js/script.min.js?version=2992015"></script> 
  <script src="//www.iselect.com.au/iselect-core/v5/js/cookies/jquery.cookie.js?version=2992015"></script> 
  <script src="//www.iselect.com.au/iselect-core/v5/js/omniture/mbox.js?version=2992015"></script> 
  
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