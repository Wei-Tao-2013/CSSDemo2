<?php

namespace iSelectCore;

/**
 * Simple HTTP abstraction layer
 *
 * Class Http
 * @author Zachary Scott <zscott@thecode.co>
 */
class Http {
	
	/** Does a POST request to the given URL with the given parameters */
	public static function post( $url, $params = array() ) {
		assert( ! empty( $url ) );
		
		// Build the params as query
		$params = http_build_query( $params );

		// Do HTTP request using CURL
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $params );
		$resp = curl_exec( $ch );
		curl_close( $ch );
		
		// Return response
		if ( ! empty( $resp ) ) { // Success
			return $resp;
		} else { // Failed
			return false;
		}
		
	}
	
	// TODO GET request
	
	private function __construct() { }
}