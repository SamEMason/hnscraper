/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file Logger.js
 * @description Provides a centralized logging service for the application,
 *              coordinating multiple logging outputs (e.g., console, JSON)
 *              and handling formatting, truncation, and structured output.
 * @created 2026-03-1
 */
import Console from '#src/services/logger/Console.js';

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
    this.console = new Console();
  }
}
