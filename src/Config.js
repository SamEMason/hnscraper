/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file Config.js
 * @description Central configuration class for the Hacker News Scraper.
 *              Stores feature flags, file paths, post quantity, and cleanup targets.
 * @created 2026-03-1
 */

/**
 * Configuration class providing global static settings for the application.
 *
 * @class
 */
export default class Config {
  /** @type {string[]} List of directories/files to clean when running the clean utility */
  static CLEAN_TARGETS = ['playwright-report', 'test-results', 'logs/'];

  /** @type {boolean} Enable or disable console logging */
  static LOGGER_CONSOLE_ENABLED = true;

  /** @type {boolean} Show URLs in the console output when console logging is enabled */
  static LOGGER_CONSOLE_DISPLAY_URLS = false;

  /** @type {boolean} Enable or disable JSON logging */
  static LOGGER_JSON_ENABLED = true;

  /** @type {string} File path to write JSON logs to */
  static LOGGER_JSON_FILEPATH = 'logs/posts.json';

  /** @type {number} Number of newest posts to scrape from Hacker News */
  static POST_QUANTITY = 100;
}
