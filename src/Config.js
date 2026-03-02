/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file Config.js
 * @description Need description for this file
 * @created 2026-03-1
 */

/**
 * Configuration class providing global static settings for the application.
 *
 * @class
 */
export default class Config {
  static LOGGER_CONSOLE_ENABLED = true;
  static LOGGER_CONSOLE_DISPLAY_URLS = false;
  static LOGGER_JSON_ENABLED = true;
  static LOGGER_JSON_FILEPATH = 'logs/posts.json';
  static POST_QUANTITY = 100;
  static CLEAN_TARGETS = ['playwright-report', 'test-results', 'logs/'];
}
