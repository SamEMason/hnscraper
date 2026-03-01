/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file main.js
 * @description Entry point module that instantiates the HNScraper and ConsoleView,
 *              runs the scraper, and renders post data to the console.
 * @created 2026-02-27
 */
import ConsoleView from '#src/views/ConsoleView.js';
import HNScraper from '#src/services/HNScraper.js';

const POST_QUANTITY = 100;

/**
 * Main application entry point for the Hacker News Scraper.
 *
 * Responsibilities:
 *  - Initialize and run the HNScraper
 *  - Initialize the ConsoleView
 *  - Display headings, scripts, and scraped post data
 *  - Handle errors during scraping
 *
 * @returns {Promise<void>}
 */
export default async function main() {
  const scraper = new HNScraper(POST_QUANTITY);
  const view = new ConsoleView();

  try {
    view.heading();
    view.scripts();

    console.log('Scraper running...');
    await scraper.init();
    await scraper.scrape();
    const posts = scraper.getPosts();
    console.log('Scraping completed...');

    view.renderData(posts);
  } catch (err) {
    console.error(`Error scraping Hacker News: ${err}`);
  }
}
