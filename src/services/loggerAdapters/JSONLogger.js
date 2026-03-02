/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file JSONLogger.js
 * @description Provides a logging adapter that outputs structured application data
 *              to a JSON file. Supports centralized logging for the scraper
 *              alongside other adapters like Console.
 * @created 2026-03-2
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import Config from '#src/Config.js';

/**
 * Logging adapter for writing structured data to a JSON file.
 *
 * Can be composed into a top-level Logger service to handle
 * JSON output alongside other logging adapters.
 *
 * @class
 */
export default class JSONLogger {
  filepath = Config.LOGGER_JSON_FILEPATH;

  /**
   * Writes structured data to the configured JSON file.
   *
   * @param {array|object} data - The data object or array to log in JSON format.
   * @returns {Promise<void>} Resolves when the write operation completes.
   */
  async logData(data) {
    const dir = dirname(this.filepath);

    try {
      // Ensure directory exists
      mkdir(dir, { recursive: true });

      // Write the JSON file
      writeFile(this.filepath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(`Error logging to JSON file: ${err}`);
    }
  }
}
