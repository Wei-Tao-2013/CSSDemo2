<?php
	// if( $from_wp == 'true'){
	// 	include ('/iselect-core/v5/config.php');
	// }
	// else{
		include (dirname( __FILE__ ) . '/../../config.php');
	// }
	$gigya = $_GET["gigya"];
	$vertical = $_GET["vertical"];
	$domain = $_GET["domain"];
	$httpHost = isset($domain) && $domain !== "" ? $domain : "www.iselect.com.au";
	$uri = PROTOCOL . $httpHost . "/";
?>
<div class="wide-primary cf hidden-mobile">
	<ul class="navigation-module">
	  <?php if($gigya == "on") { ?>
	  <?php /* [SOCIAL] */ ?>
		<li id="gigya-sign"><a title="Social Sign in" ><i class="icon-menu socialSignIn "></i>
		 SIGN IN / REGISTER <div class="mobile-gigya-sign-out">Sign out</div><div class="mobile-avatar  gigya-avatar-default"><img class="avatar-img" /></div>
		 </a>
		     <ul><li>
                <div class="gigya-mobile-section">
                        <div id="mobile-screens-section" class="unloaded"></div>
                </div>
		      </li></ul>
		</li>
		<?php } ?>
		<?php  /* [HEALTH] */ ?>
		<li><a href="<?php echo $uri ?>health-insurance/" title="Health Insurance" <?php if( $vertical == "health" ){ ?>class="selected"<?php } ?>><i class="icon-menu health"></i>Health</a>
	        <div class="subMenu">
				<div class="main-links">
					<h2>Health Insurance</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>health-insurance/" title="Private Health Cover">Private Health Cover</a></li>
						<li><a href="<?php echo $uri ?>overseas-visitors-cover.jsp" title="Overseas Cover">Overseas Cover</a></li>
					</ul>
	          	</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>health-insurance/about/" title="About Health Insurance">About Health Insurance</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/health-funds/" title="Joining a Health Fund">Joining a Health Fund</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/tax/" title="Health Insurance &amp; Tax">Health Insurance &amp; Tax</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/means-test/" title="Means Testing">Means Testing</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/hospital-and-extras-cover/" title="Hospital &amp; Extra Cover">Hospital &amp; Extra Cover</a></li>
					</ul>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>health-insurance/health-funds/switching/" title="Switching Funds">Switching Funds</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/faqs/" title="FAQs">FAQs</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/glossary/" title="Glossary">Glossary</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/health-funds/compare-cover/" title="Compare Health Funds">Compare Health Funds</a></li>
						<li><a href="<?php echo $uri ?>health-insurance/qantas-frequent-flyer-offer/" title="Qantas Frequent Flyer Offer">Qantas Frequent Flyer Offer</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [CAR] */ ?>
		<li>
			<a href="<?php echo $uri ?>car/" title="Car Insurance" <?php if( $vertical == "car" ) { ?>class="selected"<?php } ?>><i class="icon-menu car"></i> Car</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Car Insurance</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>car/" title="Car Insurance">Car Insurance</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>car/info/about-car-insurance/" title="About Car Insurance">About Car Insurance</a></li>
						<li><a href="<?php echo $uri ?>car/info/switching-car-insurers/" title="Switching Car Insurer">Switching Car Insurer</a></li>
						<li><a href="<?php echo $uri ?>car/info/save-money-on-car-insurance/" title="Saving Money on Car Insurance">Saving Money on Car Insurance</a></li>
						<li><a href="<?php echo $uri ?>car/info/first-time-drivers/" title="Tips for First Time Drivers">Tips for First Time Drivers</a></li>
					</ul>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>car/info/iselect-comprehensive-car-challenge/" title="Car Challenge">Car Challenge</a></li>
						<li><a href="<?php echo $uri ?>car/info/car-insurance-glossary/" title="Glossary">Glossary</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [LIFE] */ ?>
		<li>
			<a href="<?php echo $uri ?>life/" title="Life Insurance" <?php if( $vertical == "life" ) { ?>class="selected"<?php } ?>><i class="icon-menu life"></i> Life</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Life Insurance</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>life/" title="Life Insurance">Life Insurance</a></li>
						<li><a href="<?php echo $uri ?>life/income-protection-insurance/" title="Income Protection">Income Protection</a></li>
						<li><a href="<?php echo $uri ?>life/funeral-cover/" title="Funeral Insurance">Funeral Insurance</a></li>
						<li><a href="<?php echo $uri ?>life/total-permanent-disablement-insurance/" title="Total Permanent Disablement (TPD) Insurance">Total Permanent Disablement (TPD) Insurance</a></li>
						<li><a href="<?php echo $uri ?>life/trauma-insurance/" title="Trauma Insurance">Trauma Insurance</a></li>
						<li><a href="<?php echo $uri ?>life/key-person/" title="Key Man Insurance">Key Man Insurance</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>life/about/" title="About Life Insurance">About Life Insurance</a></li>
						<li><a href="<?php echo $uri ?>life/faq/" title="FAQs">FAQs</a></li>
						<li><a href="<?php echo $uri ?>life/calculators/" title="Calculators">Calculators</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [HOME LOANS] */ ?>
		<li>
			<a href="<?php echo $uri ?>home-loans/" title="Home Loans" <?php if( $vertical == "homeloans" ) { ?>class="selected"<?php } ?>><i class="icon-menu homeloans"></i> Home Loans</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Home Loans</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>home-loans/" title="Home Loans">Home Loans</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>home-loans/first-home-owners/" title="First Home Buyers">First Home Buyers</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/" title="Home Loan Options">Home Loan Options</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/refinance/" title="Refinance Home Loans">Refinance Home Loans</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/fixed-rate/" title="Fixed Home Loans">Fixed Home Loans</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/variable-rate/" title="Variable Homes Loans">Variable Homes Loans</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/no-deposit/" title="No Deposit Home Loans">No Deposit Home Loans</a></li>
						<li><a href="<?php echo $uri ?>home-loans/options/interest-only/" title="Interest Only Home Loans">Interest Only Home Loans</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [ENERGY] */ ?>
		<li>
			<a href="<?php echo $uri ?>electricity-and-gas/" title="Save Electricity" <?php if(  $vertical == "energy" ) { ?>class="selected"<?php } ?>><i class="icon-menu electricity"></i> Electricity &amp; Gas</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Energy</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>electricity-and-gas/" title="Electricity &amp; Gas">Electricity &amp; Gas</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="http://energy.iselect.com.au/electricity/info/renewable-energy/" title="Renewable Energy">Renewable Energy</a></li>
						<li><a href="http://energy.iselect.com.au/electricity/info/save-electricity/" title="Save Electricty">Save Electricty</a></li>
						<li><a href="http://energy.iselect.com.au/electricity/info/qantas-frequent-flyer-offer/" title="Qantas Frequent Flyer Offer">Qantas Frequent Flyer Offer</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [BROADBAND] */ ?>
		<li>
			<a href="<?php echo $uri ?>broadband/" title="Broadband" <?php if(  $vertical == "broadband" ) { ?>class="selected"<?php } ?>><i class="icon-menu broadband"></i> Broadband</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Broadband</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>broadband/" title="Broadband">Broadband</a></li>
						<li><a href="<?php echo $uri ?>broadband/" title="Broadband &amp; Home Phone Bundle">Broadband &amp; Home Phone Bundle</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="http://comms.iselect.com.au/broadband/info/internet-plans/" title="Internet Plans">Internet Plans</a></li>
						<li><a href="http://comms.iselect.com.au/broadband/info/internet-providers/" title="Internet Providers">Internet Providers</a></li>
						<li><a href="http://comms.iselect.com.au/broadband/info/internet-options/" title="Internet Options">Internet Options</a></li>
						<li><a href="http://comms.iselect.com.au/broadband/info/internet-speed/" title="Internet Speed">Internet Speed</a></li>
						<li><a href="http://comms.iselect.com.au/broadband/info/faqs-glossary/" title="FAQs">FAQs</a></li>
					</ul>
				</div>
			</div>
		</li>

		<?php /* [HOME AND CONTENTS] */ ?>
		<li>
			<a href="<?php echo $uri ?>home-and-contents/" title="Home &amp; Contents" <?php if(  $vertical == "homeandcontents" ) { ?>class="selected"<?php } ?>><i class="icon-menu homecontents"></i> Home &amp; Contents</a>
			<div class="subMenu">
				<div class="main-links">
					<h2>Home &amp; Contents</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>home-and-contents/" title="Home &amp; Contents">Home &amp; Contents</a></li>
					</ul>
				</div>
				<div class="sub-links">
					<h2>Get Informed</h2>
					<ul class="list-unstyled">
						<li><a href="<?php echo $uri ?>home-and-contents/home-content-faq/" title="FAQs">FAQs</a></li>
					</ul>
				</div>
			</div>
		</li>

	</ul>
</div>
