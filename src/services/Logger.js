/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file Logger.js
 * @description Provides a centralized logging service for the application,
 *              coordinating multiple logging outputs (e.g., console, JSON)
 *              and handling formatting, truncation, and structured output.
 * @created 2026-03-1
 */

import Config from '../Config.js';
import Console from './loggerAdapters/Console.js';
import JSONLogger from './loggerAdapters/JSONLogger.js';

/**
 * Central logging class for the Hacker News Scraper.
 *
 * Composes multiple logging outputs (e.g., Console, JSON) and provides
 * a unified interface for rendering messages, headings, and structured data.
 *
 * @class
 */
export default class Logger {
  constructor() {
    this._console = Config.LOGGER_CONSOLE_ENABLED ? new Console() : null;
    this._json = Config.LOGGER_JSON_ENABLED ? new JSONLogger() : null;
  }

  /**
   * Renders the application heading and related metadata.
   *
   * Delegates heading and script output to enabled logging adapters.
   * If no adapters are enabled, this method performs no action.
   *
   * @returns {void}
   */
  heading() {
    this._console?.heading();
    this._console?.scripts();
  }

  /**
   * Renders structured application data through active logging adapters.
   *
   * Typically used to output scraped post data or other structured
   * collections in a formatted representation.
   *
   * @param {Array|Object} data - Structured data to render.
   * @returns {void}
   */
  renderData(data) {
    this._console?.renderData(data);
    this._json?.logData(data);
  }

  /**
   * Logs a simple message through enabled logging adapters.
   *
   * Acts as a unified logging entry point for informational messages,
   * status updates, or diagnostics.
   *
   * @param {string} message - The message to log.
   * @returns {void}
   */
  log(message) {
    if (this._console) {
      console.log(message);
    }
  }
}
