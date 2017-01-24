<?php

// INCLUDE ADDITIONAL UTILITIES ================================================

$pattern = dirname( __FILE__ ) . '/util/*.php';
foreach ( glob( $pattern ) as $file ) {
	include $file;
}

// CONFIGURATION ===============================================================

if( isset( $from_wp ) && $from_wp == 'true') {
	$_GET['vertical'] = strtolower( $wp_array['vertical'] );
	$_GET['contactRequired'] = strtolower( $wp_array['contactRequired'] );
	$_GET['phoneNumber'] = strtolower( $wp_array['phoneNumber'] );
	$_GET['todayOpenHours'] = strtolower( $wp_array['todayOpenHours'] );
	$_GET['delacon'] = strtolower( $wp_array['delacon'] );
	$_GET['gigya'] = strtolower( $wp_array['gigya'] );
	$_GET['gigyaOnHomepage'] = strtolower( $wp_array['gigyaOnHomepage'] );
	$_GET['domain'] = strtolower( $wp_array['domain'] );
}
	//FILE VERSIONING
	date_default_timezone_set("Australia/Victoria");
	$date = date('Ymd');
	define('VERSION', $date);

	//BASE URL CONSTRUCTION
	$protocol = isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? "https://" : "http://";
	$serverName = $_SERVER['HTTP_HOST'];
	#$port = $_SERVER["SERVER_PORT"] == "80" ? "" : ":80";
	$port = '';
	$coreFolder = "iselect-core";
	$coreVersion = "v5";
	$path = $coreFolder . "/" . $coreVersion;
	$baseURL = $protocol . $serverName . $port . "/" . $path . "/";
	define('BASE_URL', $baseURL);
	define('PORT', $port);
	define('PROTOCOL', $protocol);
	define('SERVER', $serverName);
	define( 'PRODUCTION_URL', 'http://www.iselect.com.au/' );
	define( 'PRODUCTION_DOMAIN', 'www.iselect.com.au' );

	$isProduction = ( $serverName == PRODUCTION_DOMAIN ) ? true : false;
	define( 'IS_PRODUCTION', $isProduction );