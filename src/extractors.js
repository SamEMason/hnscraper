/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file extractors.js
 * @description Provides utility functions to extract post rank, anchor data (title and URL),
 *              and relative timestamps from Hacker News submission elements.
 * @created 2026-02-27
 */

/**
 * Extracts the numeric rank of a Hacker News post.
 *
 * @param {import('playwright').Locator} submission - The submission row element.
 * @returns {Promise<number>} The parsed post rank.
 */
export const extractRank = async (submission) => {
  const rawRank = (await submission.locator('.rank').textContent()).trim();
  const rank = rawRank.replace('.', '');
  return parseInt(rank, 10);
};

/**
 * Extracts the title and URL from a Hacker News submission.
 *
 * @param {import('playwright').Locator} submission - The submission row element.
 * @returns {Promise<{title: string, href: string}>} The post title and URL.
 */
export const extractAnchorData = async (submission) => {
  const anchor = submission.locator('.title a').first();
  const title = (await anchor.textContent()).trim();
  const href = await anchor.getAttribute('href');

  return { title, href };
};

/**
 * Extracts the relative timestamp string from a post subline.
 *
 * @param {import('playwright').Locator} subline - The metadata row element.
 * @returns {Promise<string>} The relative timestamp (e.g., "5 minutes ago").
 */
export const extractTimestamp = async (subline) => {
  return (await subline.locator('.age').textContent()).trim();
};
