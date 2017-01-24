<?php

include dirname( __FILE__ ) . '/../../config.php';

$vertical_title =  isset( $_REQUEST["vertical"] ) ? $_REQUEST["vertical"] : '';
$contactRequired = isset( $_REQUEST["contactRequired"] ) ? $_REQUEST["contactRequired"] : '';
$delacon =         isset( $_REQUEST["delacon"] ) ? $_REQUEST["delacon"] : '';
$phoneNumber =     isset( $_REQUEST["phoneNumber"] ) ? $_REQUEST["phoneNumber"] : '';
$todayOpenHours =  isset( $_REQUEST["todayOpenHours"] ) ? $_REQUEST["todayOpenHours"] : '';
$gigya =           isset( $_REQUEST["gigya"] ) ? $_REQUEST["gigya"] : '';
$gigyaBorad =      isset( $_REQUEST["gigya-borad"] ) ? $_REQUEST["gigya-borad"] : '';
$gigyaOnHomepage = isset( $_REQUEST["gigyaOnHomepage"] ) ? $_REQUEST["gigyaOnHomepage"] : '';

$vertical = iselect_guess_vertical( $vertical_title );

?>
<div id="header" class="container">
	<div class="logo">
		<a href="http://www.iselect.com.au"><img src="<?php echo BASE_URL; ?>images/logo.png?version=<?php echo VERSION; ?>" alt="iSelect Homepage"></a>
		<h1><?php echo $vertical_title; ?></h1> - always get it right
	</div>

	<?php // [START] CONTACT DETAILS ?>
	<?php if ( $contactRequired == "true" ) { ?>
		<div class="contact-us">

			<?php // Delacon ?>
			<?php if ( $delacon == "true" && $vertical_title == "Health Insurance" ) : ?>
				<a href="tel:<?php echo $phoneNumber; ?>" onclick="javascript:makePhoneCall(16399, "13 19 20");return false;" id="phone-us" class="phone-us"><i class="icon-large phone"></i><span id="numdiv_16399_0"><?php echo $phoneNumber; ?></span></a>';
			<?php else : ?>
				<a href="tel:<?php echo $phoneNumber; ?>" id="phone-us" class="phone-us"><i class="icon-large phone"></i><?php echo $phoneNumber; ?></a>
			<?php endif; ?>

			<?php // Opening Hours ?>
			<div class="opening-hours">
				
				<?php 
				
				if ( ! empty( $todayOpenHours ) ) {
					
					// Put the opening hours given from the application
					echo esc_html( $todayOpenHours );
					
				} else {
	
					// Put the opening hours as pulled from the webservice
					$today_hours = iSelectCore\OpeningHours::get_today_text( $vertical );
					echo esc_html( $today_hours );
	
				}
				
				?>

				<a title="Contact Us"
					data-options='{"width":800,"height":600,"iframe":true}'
					class="lightbox"
					href="//www.iselect.com.au/iselect-core/v5/popups/contact_iselect/">

					All Hours

				</a>
				
			</div>

		</div>
	<?php } ?>
	<?php // [END] CONTACT DETAILS ?>

	<?php // [START] GIGYA ?>
	<?php if($gigya == "on"){ ?>
		<div class="gigya-desktop">
			<div id="gigya-section" class="gigya-mobile-off">
				<div id="gigya-nav">
					<a id="gigya-login-bookmark" class="lightbox" data-options=\'{"width":750, "height":700, "iframe": true}\' href="#"></a>
					<span class="signout-block"><div id="avatar" class="icon-gigya login"> <img class="avatar-img" /></div><span id="gigya-customer-name"></span> | <span class="gigya-social-link gigya-sign-out" style="float:none"> Sign out </span> </span>
					<span class="signin-block"><span class="gigya-social-link gigya-login-text gigya-sign-in"><i class="icon-gigya login"></i>Sign in</span> <span class="gigya-login-text"> | </span><span id="gigya-register" class="gigya-social-link">Register</span></span>
				</div>
				<div id="gigya-borad" <?php if($gigyaBorad){ ?>class="gigya-borad-off"<?php } ?>>
					<div class="gigya-layout arrow_box">
						<i class="icon-gigya gigya-brand signin-block"></i>
						<span class="signin-block signout-show"><span class="gigya-social-link gigya-sign-in">Sign in</span> to save time</span>
						<i class="icon-gigya gigya-close signin-block"></i>
					</div>
				</div>
			</div>
			<div id="gigya-mobile-section" class="gigya-mobile-on" >
				<div id="gigya-mobile-borad">
					<div class="gigya-layout arrow_box">
						<span class="signout-block signin-show"><span class="gigya-social-link gigya-sign-out">Sign out</span></span>
					</div>
				</div>
			</div>
		</div>
		<div class="shadow-layer"></div>
		<div id="slide-layer"><button title="Close (Esc)" type="button" class="mfp-close" >×</button>
			<div id="desktop-screens-section" class="unloaded"></div>
		</div>
		<?php if ( $gigyaOnHomepage != "true" ) { ?>
			<style>
				#mobile-menu{background-color:#fff}
				#mobile-menu.mm-hasheader > .mm-panel{padding-top:0px !important}
			</style>
			<div class="wide-primary cf hidden-mobile gigya-mobile-only">
				<ul class="navigation-module">
					<li id="gigya-sign">
						<a title="Social Sign in" ><i class="icon-menu socialSignIn "></i> SIGN IN / REGISTER </a>
						<ul>
							<li>
								<div class="gigya-mobile-section">
									<div id="mobile-screens-section" class="unloaded"></div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		<?php }	?>
	<?php } ?>
	<?php // [END] GIGYA ?>
</div>
