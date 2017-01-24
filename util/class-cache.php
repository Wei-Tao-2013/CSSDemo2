<?php

namespace iSelectCore;

/**
 * Simple cache manager class.
 * Use like so:
 *
 * $cache = new Cache( 'group-name' );
 * $cache->set( 'key-name-here', 'value here' );
 * echo $cache->get( 'key-name-here' );
 *
 * __NOTE__ This is not object safe, the data is serialised as JSON and
 * therefore will always be returned as a scalar or array.
 *
 * @author Zachary Scott <zscott@thecode.co>
 */
class Cache {

	private $group;   // The cache group name
	private $enabled; // Whether caching is enabled

	public function __construct( $group ) {
		
		assert( ! empty( $group ) );
		$this->group = $group;
		
		$this->enabled = function_exists( 'apc_fetch' );

	}

	/**
	 * Stores the given value in the cache.
	 *
	 * @param $key The cache key.
	 * @param $value The value to set in the cache
	 * @param $ttl The life of the cacheed item, default is 0 which caches
	 * until manually removeed / rebooted
	 */
	public function put( $key, $value, $ttl = 0 ) {
		assert( ! empty( $key ) );

		if ( ! $this->enabled ) {
			return false;
		}
		
		// Store the value in APC
		$key = $this->get_cache_key( $key );
		return \apc_store( $key, $value, $ttl );

	}

	/**
	 * Retrieves the given cached value.
	 *
	 * @param $key The cache key to get.
	 */
	public function get( $key ) {
		assert( ! empty( $key ) );

		if ( ! $this->enabled ) {
			return false;
		}

		// Get from the cache if exists
		$key = $this->get_cache_key( $key );
		if ( \apc_exists( $key ) ) {
			return \apc_fetch( $key );
		}

		return false; // Does not exist / not in cache

	}
	
	/**
	 * Deleted / removes the given cahce item
	 *
	 * @param $key The cache key to delete.
	 */
	public function delete( $key ) {
		assert( ! empty( $key ) );
		
		if ( ! $this->enabled ) {
			return true;
		}
		
		// If key exists, delete it
		$key = $this->get_cache_key( $key );
		if ( \apc_exists( $key ) ) {
			return \apc_delete( $key );
		}
		
		// Didnt exist anyway
		return true;
		
	}
	
	// Return the full cache key, including the group name
	private function get_cache_key( $key ) {
		assert( ! empty( $key ) );
		return $this->group . '_' . $key;
	}

}
