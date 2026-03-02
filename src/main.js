/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file main.js
 * @description Entry point module that instantiates the HNScraper and Console,
 *              runs the scraper, and renders post data to the console.
 * @created 2026-02-27
 */
import Config from '#src/Config.js';
import Logger from '#src/services/Logger.js';
import HNScraper from '#src/services/HNScraper.js';

/**
 * Main application entry point for the Hacker News Scraper.
 *
 * Responsibilities:
 *  - Initialize and run the HNScraper
 *  - Initialize the Logger
 *  - Display headings, scripts, and scraped post data
 *  - Handle errors during scraping
 *
 * @returns {Promise<void>}
 */
export default async function main() {
  const logger = new Logger();
  const scraper = new HNScraper(Config.POST_QUANTITY);
  logger.heading();

  try {
    await scraper.init();

    logger.log('Scraping initiated...');
    await scraper.scrape();
    logger.log('Scraping completed...\n');

    const posts = scraper.getPosts();
    logger.logData(posts);
  } catch (err) {
    console.error(`Error scraping Hacker News: ${err}`);
  }
}
