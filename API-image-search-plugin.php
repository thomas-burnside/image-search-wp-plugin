<?php
/**
 *Plugin Name: TB #9 API Image Search
 * Description: Returns images via API call and formats it nicely
 * Version: 1.0.0
 * Author: Thomas Burnside
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue styles and scripts
function api_images_enqueue_assets() {
    // TEMPORARY: Always enqueue for debugging
    wp_enqueue_style(
        'api-images-style',
        plugin_dir_url(__FILE__) . 'assets/css/style.css'
    );
    wp_enqueue_script(
        'api-images-script',
        plugin_dir_url(__FILE__) . 'assets/js/script.js',
        [],
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'api_images_enqueue_assets');


// Add shortcode
function api_images_shortcode() {
    ob_start();
    ?>
    <div class="image-search-container">
        <h1>API Image Search</h1>
        <form id="image-search-form">
            <input type="text" id="search-input" placeholder="Search for images...">
            <button type="button" id="search-button">Search</button> <!-- FIXED -->
        </form>
        <div class="search-results"></div>
        <button id="show-more-button" style="display:none;">Show more</button> <!-- Initially hidden -->
    </div>
    <?php
    return ob_get_clean();
}


add_shortcode('api_images', 'api_images_shortcode');

