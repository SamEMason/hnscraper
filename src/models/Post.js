/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file Post.js
 * @description Defines the Post class representing a single Hacker News post,
 *              including methods for converting relative timestamps to absolute dates.
 * @created 2026-02-27
 */

/**
 * Represents a Hacker News post.
 *
 * @class
 * @param {number} rank - The post rank on the page.
 * @param {string} title - The post title.
 * @param {string} href - The post URL.
 * @param {string} timestamp - The relative timestamp string (e.g., "5 minutes ago").
 * @param {number} baseTime - Timestamp in ms used to compute absolute date.
 */
export default class Post {
  /**
   * Mapping of time units to their equivalent in milliseconds.
   *
   * Used internally by `Post` to convert relative timestamps (e.g., "5 minutes ago")
   * into absolute `Date` objects.
   *
   * @type {{second: number, minute: number, hour: number, day: number}}
   * @private
   * @static
   */
  static _timeConversion = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
  };

  constructor(rank, title, href, timestamp, baseTime) {
    this.rank = rank;
    this.title = title;
    this.href = href;
    this.timestamp = timestamp;
    this.date = Post._relativeDate(timestamp, baseTime);
  }

  /**
   * Converts a relative timestamp string into an absolute Date object.
   *
   * @private
   * @param {string} timestamp - Relative time string (e.g., "5 minutes ago").
   * @param {number} baseTime - Base timestamp in milliseconds.
   * @returns {Date} The calculated absolute date.
   */
  static _relativeDate(timestamp, baseTime) {
    const { value, unit } = Post._parseTimestamp(timestamp);

    // Return date from `baseTime` for negative values, which would represent future timestamps
    if (value < 1) return new Date(baseTime);

    switch (unit) {
      case 'second':
        return new Date(baseTime - value * Post._timeConversion['second']);
      case 'minute':
        return new Date(baseTime - value * Post._timeConversion['minute']);
      case 'hour':
        return new Date(baseTime - value * Post._timeConversion['hour']);
      case 'day':
        return new Date(baseTime - value * Post._timeConversion['day']);
      default:
        console.warn(`Unknown time unit for post, default date applied...`);
        return new Date(baseTime);
    }
  }

  /**
   * Parses a relative timestamp string into numeric value and unit.
   *
   * @private
   * @param {string} timestamp - Relative time string (e.g., "5 minutes ago").
   * @returns {{ value: number, unit: string }} Parsed time components.
   */
  static _parseTimestamp(timestamp) {
    const [valueStr, unitStr] = timestamp.split(' ');

    const value = parseInt(valueStr, 10);
    const unit = Post._depluralize(unitStr);
    return { value, unit };
  }

  /**
   * Removes a trailing "s" from a time unit string.
   *
   * @private
   * @param {string} str - The time unit string.
   * @returns {string} The singularized time unit.
   */
  static _depluralize(str) {
    return str.replace(/s$/, '');
  }
}
