/**
 * @project QA Wolf Hacker News Scraper
 * @author Samuel Mason
 * @file HNScraper.js
 * @description Defines the HNScraper class for scraping the newest posts from
 *              Hacker News, handling pagination, extraction, and post storage.
 * @created 2026-02-27
 */
import { chromium } from 'playwright/test';

import {
  extractAnchorData,
  extractRank,
  extractTimestamp,
} from '#src/extractors.js';
import Post from '#src/models/Post.js';
import Logger from '#src/services/Logger.js';

/**
 * Represents a scraper for Hacker News "newest" posts.
 *
 * @class
 * @param {number} postQuantity - The number of newest posts to scrape.
 */
export default class HNScraper {
  constructor(postQuantity) {
    this.postQuantity = postQuantity;
    this.url = 'https://news.ycombinator.com/newest';
    this._page = null;
    this._browser = null;
    this._posts = [];
    this._seenKeys = new Set();
  }

  /**
   * Initializes the Playwright browser and page instance.
   *
   * @returns {Promise<void>}
   */
  async init() {
    try {
      // launch browser
      this._browser = await chromium.launch({ headless: true });
      const context = await this._browser.newContext();
      this._page = await context.newPage();
    } catch (err) {
      console.error(`Error launching browser with playwright: ${err}`);
    }
  }

  /**
   * Scrapes the specified number of newest posts from Hacker News.
   * Handles pagination until the desired quantity is reached.
   * Closes the browser after scraping.
   *
   * @returns {Promise<void>}
   */
  async scrape() {
    const logger = new Logger();

    // `baseTime` used to determine `Date` value from relative timestamp
    const baseTime = Date.now();

    if (!this._page) {
      throw new Error('HNScraper not initialized. Call init() first.');
    }

    try {
      // Load the page at Hacker News Newest
      await this._page.goto(this.url);

      // Hacker News will load up 30 posts per page.

      while (this._posts.length < this.postQuantity) {
        await this._scrapePage(baseTime);

        // Click More button to load next set of posts
        if (this._posts.length < this.postQuantity) {
          await this._nextPage();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      // Explicitly close the browser
      await this._browser?.close();
    }

    // Return an array of `postQuantity` newest posts
    const sortedPosts = this._sortPosts();
    this._posts = sortedPosts.slice(0, this.postQuantity);
  }

  /**
   * Scrapes the currently loaded page for posts.
   *
   * @private
   * @param {number} baseTime - Timestamp (in ms) used to calculate relative post dates.
   * @returns {Promise<void>}
   */
  async _scrapePage(baseTime) {
    // Wait for page to load at least one post
    await this._page.waitForSelector('.submission', {
      state: 'visible',
      timeout: 5000,
    });

    // Get the 30 post submission and subline elements
    const submissions = await this._page.locator('.submission').all();
    const sublines = await this._page.locator('.subline').all();

    /**
     * Iterate through each post to extract the post's:
     * rank, title, href, and timestamp.
     *
     * Organize this data into a Post object and then push
     * the Post object onto the `posts` array
     */
    for (let i = 0; i < submissions.length; i++) {
      try {
        const newPost = await this._extractPost(
          submissions[i],
          sublines[i],
          baseTime
        );

        // Skip over post with invalid data
        if (!newPost) {
          continue;
          // End extraction process with correct number of posts
        } else if (newPost.rank > this.postQuantity) break;

        // Skip over post if duplicate
        const key = `${newPost.title}|${newPost.href}`;
        if (this._seenKeys.has(key)) continue;
        this._seenKeys.add(key);

        // Push the Post object to the `posts` array
        this._posts.push(newPost);
      } catch (err) {
        console.warn(
          `Extraction error occurred with post ${i}, skipping over...`
        );
        continue;
      }
    }
  }

  /**
   * Extracts post data from a submission row.
   *
   * @private
   * @param {import('playwright').Locator} submission - The submission row element.
   * @param {import('playwright').Locator} subline - The corresponding metadata row.
   * @param {number} baseTime - Timestamp used for relative date calculation.
   * @returns {Promise<Post>}
   */
  async _extractPost(submission, subline, baseTime) {
    // Extract and parse post rank
    const rank = await extractRank(submission);

    // Extract title and href
    const { title, href } = await extractAnchorData(submission);

    // Extract timestamp
    const timestamp = await extractTimestamp(subline);

    // Return null if post data is invalid
    if (!this._validatePostData(rank, title, href, timestamp)) return null;

    // Create and return `Post` obhect with validated post data
    return new Post(rank, title, href, timestamp, baseTime);
  }

  /**
   * Navigates to the next page of Hacker News results by clicking the "More" link.
   *
   * @private
   * @returns {Promise<void>}
   */
  async _nextPage() {
    try {
      await this._page.waitForSelector('.morelink', {
        state: 'visible',
        timeout: 5000,
      });
      await this._page.locator('.morelink').click();
    } catch (err) {
      console.error('Error clicking "More" button:', err);
    }
  }

  /**
   * Returns the scraped posts.
   *
   * @returns {Post[]} The array of Post objects.
   */
  getPosts() {
    return this._posts;
  }

  /**
   * Sorts the internal `_posts` array.
   *
   * - Primarily by `date` in reverse chronological order (newest first)
   * - Secondarily by `rank` in ascending order when dates are equal
   *
   * @private
   * @returns {Post[]} The sorted array of Post objects.
   */
  _sortPosts() {
    return this._posts.sort((a, b) => b.date - a.date || a.rank - b.rank);
  }

  /**
   * Validates the extracted post data before creating a Post object.
   *
   * Ensures that rank is a positive number, title and href are non-empty strings,
   * and timestamp is a non-empty string.
   *
   * @private
   * @param {Object} postData - The extracted post data.
   * @param {number} postData.rank - The rank of the post.
   * @param {string} postData.title - The title of the post.
   * @param {string} postData.href - The URL of the post.
   * @param {string} postData.timestamp - The relative timestamp string.
   * @returns {boolean} Returns true if all post data is valid; otherwise, false.
   */
  _validatePostData(rank, title, href, timestamp) {
    if (!Number.isFinite(rank) || rank <= 0) return false;
    if (typeof title !== 'string' || !title.trim()) return false;
    if (typeof href !== 'string' || !href.trim()) return false;
    if (typeof timestamp !== 'string' || !timestamp.trim()) return false;
    return true;
  }
}
