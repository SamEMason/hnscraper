/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file Logger.js
 * @description Provides a centralized logging service for the application,
 *              coordinating multiple logging outputs (e.g., console, JSON)
 *              and handling formatting, truncation, and structured output.
 * @created 2026-03-1
 */

import Config from '#src/services/Config.js';
import Console from './loggerAdapters/Console.js';
import JSONLogger from './loggerAdapters/JSONLogger';

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

  heading() {
    this._console?.heading();
    this._console?.scripts();
  }

  renderData(data) {
    this._console?.renderData(data);
    this._json?.logData(data);
  }

  log(message) {
    if (this._console) {
      console.log(message);
    }
  }
}
