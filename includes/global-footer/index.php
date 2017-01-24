<?php
	include (dirname( __FILE__ ) . '/../../config.php');
	$abn = $_GET["abn"];
?>
<div id="footer" class="wide-darkgrey">
    <div class="container">
		<div class="row col-mobile-full">
			<div class="col col-three">
				<h3>Customer Info</h3>
				<ul class="list-unstyled">
					<li><a href="<?php echo BASE_URL; ?>popups/health/participating_private_medical_health_funds.jsp" class="lightbox" data-options='{"width":800, "height":600, "iframe":true}'>Participating Health Funds</a></li>
					<li><a href="<?php echo BASE_URL; ?>popups/health/iselect_approved_product_list.jsp" class="lightbox" data-options='{"width":800, "height":600, "iframe":true}'>Approved Product List</a></li>
					<li><a href="<?php echo BASE_URL; ?>popups/how-does-iselect-make-money.jsp" class="lightbox" data-options='{"width":800, "height":600, "iframe":true}'>How We Make Money</a></li>
					<li><a href="<?php echo BASE_URL; ?>popups/disclaimer.jsp" class="lightbox" data-options='{"width":800, "height":600, "iframe":true}'>Terms &amp; Conditions</a></li>
					<li><a href="http://www.iselect.com.au/privacy-policy/" target="_blank">Privacy Policy</a></li>
				</ul>
			</div>
			<div class="col col-three">
				<h3>Service Offerings</h3>
				<ul class="list-unstyled">
					<li><a href="http://www.iselect.com.au/index.jsp">Health</a></li>
					<li><a href="http://www.iselect.com.au/car/">Car</a></li>
					<li><a href="http://www.iselect.com.au/life/">Life</a></li>
					<li><a href="http://www.iselect.com.au/home-loan/">Home Loans</a></li>
					<li><a href="http://energy.iselect.com.au/electricity/">Electricity &amp; Gas</a></li>
					<li><a href="http://comms.iselect.com.au/broadband/">Broadband</a></li>
					<li><a href="http://www.iselect.com.au/home-and-contents/">Home &amp; Contents</a></li>
				</ul>
			</div>
			<div class="col col-three">
				<h3>About iSelect</h3>
				<ul class="list-unstyled">
					<li><a href="http://corporate.iselect.com.au/">Company</a></li>
					<li><a href="http://corporate.iselect.com.au/careers/">Careers</a></li>
					<li><a href="http://corporate.iselect.com.au/our-business/">Our Business</a></li>
					<li><a href="http://corporate.iselect.com.au/media-room/">Media Room</a></li>
					<li><a href="http://corporate.iselect.com.au/investor-room-2/">Investor Room</a></li>
					<li><a href="<?php echo BASE_URL; ?>popups/contact_iselect.jsp" class="lightbox" data-options='{"width":850, "height":600, "iframe":true}'>Contact Us</a></li>
				</ul>
			</div>
			<div class="col col-three">
				<h3>2015 Partner Awards</h3>
				<ul class="list-inline awards">
					<li>
						<img src="<?php echo BASE_URL; ?>images/logo-australian_unity.png?version=<?php echo VERSION; ?>" alt="Australian Unity">
						<div>Health Insurance Partner of the Year</div>
					</li>
					<li>
						<img src="<?php echo BASE_URL; ?>images/logo_hbf.png?version=<?php echo VERSION; ?>" alt="HBF">
						<div>iSelect Best New Partner</div>
					</li>
				</ul>
				<a href="http://www.iselect.com.au/partnerawards/" title="Find out more">Find out more</a>
			</div>
		</div>
		<div class="legal">
			<div class="security">
				<i class="icon-small lock"></i>
				Policy purchases are secured by 128-bit SSL. You need <a href="<?php echo BASE_URL; ?>popups/cookieshelp.jsp" title="cookies" class="lightbox" data-options='{"width":800, "height":600, "iframe": true}'>cookies</a> enabled to run our site.
			</div>
			iSelect Ltd - always get it right
			ABN: <?php echo $abn; ?>
		</div>
	</div>
</div>
