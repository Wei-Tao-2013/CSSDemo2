<?php /** functions.php - commons helper functions */

/** Tried to guess the vertical slug based on the vertical title */
function iselect_guess_vertical( $title ) {

	$rules = array(
		'/overseas\s*health/i' => 'healthOVC',
		'/health/i'            => 'health',
		'/car/i'               => 'car',
		'/funeral/i'           => 'lifeFuneral',
		'/life/i'              => 'life',
		'/home.*content/i'     => 'homecontent',
		'/home.*loan/i'        => 'homeloans',
	);
	
	// Check each of the rules against the title
	foreach ( $rules as $rule => $vertical ) {
		if ( preg_match( $rule, $title ) ) {
			return $vertical;
		}
	}
	
	return 'health'; // Default if no matches
	
}

/** Sanitise / escape for output in html */
if ( ! function_exists( 'esc_html' ) ) :
	function esc_html( $str ) {
		return htmlentities( $str );
	}
endif;

/** Sanitise / escape for output in html attribute */
if ( ! function_exists( 'esc_attr' ) ) :
	function esc_attr( $str ) {
		return addslashes( $str );
	}
endif;