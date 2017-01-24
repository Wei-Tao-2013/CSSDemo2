<?php

$dtmswitch = isset( $_REQUEST["dtmswitch"] ) && $_REQUEST["dtmswitch"] != 'false' && $_REQUEST["dtmswitch"] != 'off';
?>
<!DOCTYPE html>
<!--[if lt IE 7]><html class="ie6"><![endif]-->
<!--[if IE 7]><html class="ie7"><![endif]-->
<!--[if IE 8]><html class="ie8"><![endif]-->
<!--[if gt IE 8]><!--><html><!--<![endif]-->
    <head>
        <title>How Many Health Funds Does iSelect Represent - iSelect Ltd</title>
        <meta charset="utf-8">
        <meta name="robots" content="noindex, follow">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="//f.fontdeck.com/s/css/wMErktaKFxpwhaGE/Bm0r6zK5/iselect.com.au/45889.css" />
        <link rel="stylesheet" href="http://www.iselect.com.au/iselect-core/v5/css/style.css?version=17102015" />
        <script src="//assets.adobedtm.com/0f1c5d43572df512b28ea4bd1ee01eafc06a1578/satelliteLib-7d152ece518252eafe44f16d06b237c0a3a7ae75.js"></script>
        <script>
        	var dtmswitch = "<?php echo $dtmswitch ? 'on' : 'off' ?>";
        </script>
        
    </head>
    <body class="popup">

        <div class="box box-white box-popup">
            <h1>Participating Health Funds</h1>
            <p>We provide product recommendations from the following participating health funds that we act for:</p>
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
            <p>
                We may not compare all policies offered by our participating funds but only those which   they wish to offer through iSelect. This is known as our
                '<a href="http://www.iselect.com.au/iselect-core/v5/popups/health/iselect_approved_product_list.jsp" title="Approved Product List">Approved Product List</a>', which can
                vary from time to time. We also may not compare all of our participating funds   when recommending a policy.
            </p>
            <p>Frank is underwritten by GMHBA.</p>
            <p>ahm Health Insurance is a business of Medibank Private Ltd ABN 47 080 890 259.</p>
            <p>* TUH and CBHS are restricted funds. This means that the funds offer health insurance to people who fit particular criteria. </p>
            <h2>TUH</h2>
            <p>
               A current or former member of ANY union or their family* can join TUH <br /><br />
               *A family member may be a parent, partner or former partner, dependent child, adult child (or partner), grandchild, brother or sister (incl. partner and dependent children).
            </p>
            <h2>CBHS</h2>
            <p>
            	To be eligible to join CBHS, you need to be a current or former employee/contractor of the CBA Group, or an eligible family member* of a current or former employee or contractor.
			</p>
			<p>
				*A family member includes partner, parents, siblings, children and grandchildren
			</p>

        </div>


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="http://www.iselect.com.au/iselect-core/v5/js/lib/jquery-1.11.1.min.js?version=17102015"><\/script>');</script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
        <script>window.jQuery.ui || document.write('<script src="http://www.iselect.com.au/iselect-core/v5/js/lib/jquery-ui.min.js?version=17102015"><\/script>');</script>
        <script src="http://www.iselect.com.au/iselect-core/v5/js/iselect-global.js?version=17102015"></script>
        <script>iSelect.asset_root = "http://www.iselect.com.au/iselect-core/v5/";</script>
        <script src="http://www.iselect.com.au/iselect-core/v5/js/script.min.js?version=17102015"></script>
        <script src="http://www.iselect.com.au/iselect-core/v5/js/cookies/jquery.cookie.js?version=17102015"></script>
        <script>
            var setReportSuiteId = "health";
        </script>

        <script src="http://www.iselect.com.au/iselect-core/v5/js/omniture/mbox.js?version=17102015"></script>
        
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
