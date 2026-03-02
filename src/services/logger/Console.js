/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file Console.js
 * @description Defines the Console class for rendering post data to the console,
 *              including formatted tables, headings, and script instructions.
 * @created 2026-02-27
 */

/**
 * Console-based view for displaying scraper output.
 *
 * Responsible only for formatting and rendering data to stdout.
 * @class
 * @param {number} maxTitleLength - Maximum length for displayed post titles.
 * @param {number} maxURLLength - Maximum length for displayed post URLs.
 */
export default class Console {
  constructor(maxTitleLength = 100, maxURLLength = 50) {
    this._maxTitleLength = maxTitleLength;
    this._maxURLLength = maxURLLength;
  }

  /**
   * Renders the application heading and author information.
   *
   * @returns {void}
   */
  heading() {
    console.log('<<< Hacker News Scraper >>>');
    console.log(
      'Scrapes and verifies newest Hacker News posts in chronological order.'
    );
    console.log('Author: Samuel Mason\n');
  }

  /**
   * Renders usage instructions for available npm scripts.
   *
   * @returns {void}
   */
  scripts() {
    console.log('Scripts:');
    console.log('• Run the scraper: `npm start`');
    console.log('• Verify chronological order of posts: `npm run test`\n');
  }

  /**
   * Renders scraped post data in a formatted console table.
   *
   * @param {import('#src/models/Post.js').default[]} posts - Array of Post objects.
   * @returns {void}
   */
  renderData(posts) {
    console.log(`Number of posts scraped: ${posts.length}`);
    console.table(
      posts.map((post) => ({
        Rank: post.rank,
        Title: Console._truncate(post.title, this._maxTitleLength),
        URL: Console._truncate(post.href, this._maxURLLength),
        Timestamp: post.timestamp,
        Date: post.date.toLocaleString(),
      }))
    );
  }

  /**
   * Truncates a string to a maximum length and appends ellipsis if needed.
   *
   * @private
   * @param {string} str - String to truncate.
   * @param {number} maxLength - Maximum allowed length.
   * @returns {string}
   */
  static _truncate(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  }
}
