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
  <title>Approved Product List (APL) - iSelect Ltd</title> 
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
        
        <h1>Participating Health Funds</h1> 
        
        <p>iSelect has commercial relationships with the health funds listed below.  </p>
        <p>The policies available from our partners will change from time to time.  Not all of the policies we compare are available in all areas. Due to commercial arrangements, not all policies available from our partners are compared by iSelect and not all policies compared by iSelect will be available at all times.</p>
        <p>The policies that are presented for comparison on our website are selected based on your or your family's circumstances and priorities. Individual services and benefits are then assigned a star rating based on whether they are covered and/or the level of cover provided for each policy that is being compared.</p>
        <p>Policy information is provided to us by our partners. Our website is updated as and when we receive this information to ensure the policy information displayed is up to date and accurate.</p>

        <ul>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=232" title="AHM">AHM</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=1" title="Australian Unity">Australian Unity</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=33" title="CBHS">CBHS*</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=31" title="Frank (GMHBA)">Frank (GMHBA)</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=8" title="HCF">HCF</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=35" title="GMHBA">GMHBA</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=34" title="HBF">HBF</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=238" title="Health.com.au">Health.com.au</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=27" title="Health Partners">Health Partners</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=26" title="Latrobe Health">Latrobe Health</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=16" title="nib">nib</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=29" title="TUH*">TUH*</a></li>
            <li><a href="/CDSX/assets/popups/about-funds.jsp?vendorId=30" title="Transport Health">Transport Health</a></li>
        </ul>
        
        <h2>Additional information</h2>
        
            <li>Frank is underwritten by GMHBA.</li>
            <li>AHM health insurance is a business of Medibank Private Ltd ABN 47 080 890 259.</li>
            <li>
                TUH and CBHS are restricted funds. This means that these funds offer health insurance only to people who fit particular criteria.
                <ul>
                    <li><strong>TUH</strong> - A current or former member of ANY union or their family* can join TUH. A family member may be a parent, partner or former partner, dependent child, adult child (or partner), grandchild, brother or sister (incl. partner and dependent children).</li>
                    <li><strong>CBHS</strong> - To be eligible to join CBHS, you need to be a current or former employee/contractor of the CBA Group, or an eligible family member* of a current or former employee or contractor.  A family member includes partner, parents, siblings, children and grandchildren</li>
                </ul>
            </li>

    </div> 
  
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> 
  <script>window.jQuery || document.write('<script src="http://iselect.com.au/iselect-core/v5/js/lib/jquery-1.11.1.min.js?version=2992015"><\/script>');</script> 
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script> 
  <script>window.jQuery.ui || document.write('<script src="http://iselect.com.au/iselect-core/v5/js/lib/jquery-ui.min.js?version=2992015"><\/script>');</script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/iselect-global.js?version=2992015"></script> 
  <script>iSelect.asset_root = "http://iselect.com.au/iselect-core/v5/";</script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/script.min.js?version=2992015"></script> 
  <script src="http://iselect.com.au/iselect-core/v5/js/cookies/jquery.cookie.js?version=2992015"></script> 
  <script>
            var setReportSuiteId = "health";
        </script> 
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