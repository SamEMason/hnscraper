/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file HNScraper.spec.js
 * @description E2E tests for the HNScraper class, including post scraping,
 *              pagination, duplicate handling, and chronological ordering.
 * @created 2026-02-27
 */
import { expect, test } from '@playwright/test';

import HNScraper from '#src/services/HNScraper.js';
import { describe } from 'node:test';

// Variables to be setup in beforeAll hook and used in tests
const postQuantity = 100;
let posts;
let scraper;
scraper = new HNScraper(postQuantity);

// Setup the HNScraper before all tests
test.beforeAll(async () => {
  // Setup HNScraper object to handle all scraping operations
  await scraper.init();
  await scraper.scrape();
  posts = scraper.getPosts();
});

describe('HNScraper.scrape', () => {
  test('retrieves posts in chronological order', () => {
    // Iteratively check that previous post's dates are older than the current
    for (let i = 1; i < scraper.postQuantity; i++) {
      const { date: prevDate, rank: prevRank } = posts[i - 1];
      const { date: currDate, rank: currRank } = posts[i];
      expect(
        currDate <= prevDate,
        `Post ${currRank} is not older than post ${prevRank}`
      ).toBe(true);
    }
  });

  test('retrieves correct number of posts', () => {
    expect(posts.length).toBe(scraper.postQuantity);
  });

  // Validates that posts scraped are not duplicates
  test('does not return duplicate posts', () => {
    const seen = new Set();

    for (const post of posts) {
      const key = `${post.title}|${post.href}`;
      if (seen.has(key)) continue;
      seen.add(key);
    }

    expect(seen.size).toBe(scraper.postQuantity);
  });

  test('retrieves posts with valid timestamps', async () => {
    for (const post of posts) {
      expect(post.date instanceof Date).toBe(true);
      expect(isNaN(post.date.getTime())).toBe(false);

      // Checks that no timestamp is representing a future datetime
      expect(post.date.getTime()).toBeLessThanOrEqual(Date.now());
    }
  });
});
