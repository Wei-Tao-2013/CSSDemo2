<?php

namespace iSelectCore;

/**
 * Abstraction of the iSelect opening hours API.
 *
 * Class OpeningHours
 * @author Zachary Scott <zscott@thecode.co>
 */
class OpeningHours {
	const TTL = 3600; // How long the opening hours are cached for

	/** Returns the opening hours for today in human readable text */
	static function get_today_text( $vertical ) {
		assert( ! empty( $vertical ) );
		
		$today = self::get_today( $vertical );
		if ( $today['status'] == 'success' ) {
			if ( $today['open'] ) {
				return "Today: {$today['open_time']} to {$today['close_time']} ({$today['timezone']})";
			} else {
				return "Closed";
			}
		}
		
		return '';
		
	}

	/** Returns opening hours for today for the given vertical */
	static function get_today( $vertical ) {
		assert( ! empty( $vertical ) );

		$cache = new Cache( 'opening_hours' );

		$result = $cache->get( "{$vertical}_today" );
		if ( empty( $result ) ) {

			// Do the opening hours API lookup
			$result = self::do_lookup( $vertical, 'today' );
			
			// Set the defaults 
			$result = array_merge( array(
				'status'     => 'failed',
				'vertical'   => '',
				'timezone'   => '',
				'day'        => '',
				'open_time'  => '',
				'close_time' => '',
				'open'       => false,
			), $result );
			
			if ( ! empty( $result ) ) {
				$cache->put( "{$vertical}_today", $result, self::TTL );
			}
			
		}

		return $result;

	}

	/** Returns the opening hours for current week in human readable text */
	static function get_week_text( $vertical ) {
		assert( ! empty( $vertical ) );
		
		// Pull the hours for the current week
		
		$week_hours = self::get_week( $vertical );
		
		if ( $week_hours['status'] != 'success' ) {
			return '';
		}
		
		if ( empty( $week_hours['days'] ) ) {
			return 'Closed';
		}
		
		// Build the week summary
		
		$week_summary = array();
		
		$current = array();
		foreach ( $week_hours['days'] as $day ) {
			
			// Ensure that day is set correctly
			$day['day'] = isset( $day['day'] ) ? $day['day'] : '';
			$day['open_time'] = isset( $day['open_time'] ) ? $day['open_time'] : '';
			$day['close_time'] = isset( $day['close_time'] ) ? $day['close_time'] : '';
			
			// Sanitise all the things, so they are all the same
			$day['day'] = ucfirst( strtolower( trim( $day['day'] ) ) );
			$day['open_time'] = strtolower( trim( $day['open_time'] ) );
			$day['close_time'] = strtolower( trim( $day['close_time'] ) );
			
			// Check if is the same as previos day
			$is_same = ! empty( $current );
			if ( $is_same ) {
				$is_same = $is_same && $day['open_time'] == $current['open_time'];
				$is_same = $is_same && $day['close_time'] == $current['close_time'];
			}
			
			// If the same, merge with previous day/s
			if ( $is_same ) {
				
				$current['to'] = $day['day'];
				
			} else {
				
				if ( ! empty( $current ) ) { // Skip the first loop through
					unset( $current['day'] );
					$week_summary[] = $current;
				}
				
				// Setup current as the current day
				$current = $day;
				$current['from'] = $day['day'];
				$current['to'] = '';
				
			}
			
		}
		
		$week_summary[] = $current;
		
		// Build the week summary text
		
		$week_text = '';
		foreach ( $week_summary as $line ) {
			extract( $line );
			
			$from_orig = $from;
			
			$from = self::day_name( $from );
			$to = self::day_name( $to );
			
			if ( $open ) {
				
				if ( ! empty( $to ) ) {
					$week_text .= "{$from} to {$to} from {$open_time} to {$close_time} ({$timezone}) \n";
				} else {
					$week_text .= "{$from} from {$open_time} to {$close_time} ({$timezone}) \n";
				}
				
			} else {
				
				if ( ! preg_match( '/day/', $from_orig ) ) { // Is date and not day of week
					
					$from_time = strtotime( str_replace( '/', '-', $from_orig ) );
					$from_date = date( 'jS F', $from_time );
					
					$week_text .= "{$from} {$from_date} - Closed \n";
					
				}
				
			}
			
		}
		
		return $week_text;
		
	}
	
	/** Returns opening hours for the entire week for the given vertical */
	static function get_week( $vertical ) {
		assert( ! empty( $vertical ) );

		$cache = new Cache( 'opening_hours' );

		$result = $cache->get( "{$vertical}_week" );
		if ( empty( $result ) ) {

			// Do the opening hours API lookup
			$result = self::do_lookup( $vertical, 'week' );
			
			// Set the defaults 
			$result = array_merge( array(
				'status'     => 'failed',
				'vertical'   => '',
				'timezone'   => '',
				'days'       => array(),
			), $result );
			
			if ( ! empty( $result ) ) {
				$cache->put( "{$vertical}_week", $result, self::TTL );
			}
			
		}

		return $result;

	}

	/** Returns the name of the given date */
	private static function day_name( $date ) {
		
		// If empty, dont bother below
		if ( empty( $date ) ) {
			return '';
		}
		
		// If already day name, leave as is
		if ( preg_match( '/day/', $date ) ) {
			return $date;
		}
		
		// Get the day name from the date
		$date = str_replace( '/', '-', $date ); // Workaround for crappy date formats
		$time = strtotime( $date );
		return date( 'l', $time );
		
	}

	// Returns the opening hours API endpoint
	private static function api_url() {
		return 'http://' . $_SERVER['HTTP_HOST'] . '/iselect-core/opening-hours/api.php';
	}

	// Do testimonials API lookup
	private static function do_lookup( $vertical, $dataset ) {
		assert( ! empty( $vertical ) );
		assert( ! empty( $dataset ) );
		
		$resp = Http::post( self::api_url(), array(
			'vertical' => $vertical,
			'dataset'  => $dataset,
		) );
		
		if ( ! empty( $resp ) ) { // Success
			return json_decode( $resp, true );
		} else { // Failed
			return false;
		}
		
	}
	
	private function __construct() { }
}
