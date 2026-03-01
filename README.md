# Hacker News Scraper

A Node.js scraper that retrieves the newest posts from [Hacker News](https://news.ycombinator.com/newest), displays posts in a formatted console table, and includes automated tests for data integrity and chronological ordering.

## Features

- Scrapes **any number of newest posts** from Hacker News.
- Maintains **chronological order** of posts.
- Detects and **skips duplicate posts**.
- Outputs:
  - Rank
  - Title (truncated for readability)
  - URL (truncated for readability)
  - Timestamp
  - Date object representation
- Includes **unit and E2E tests** for critical helpers and scraper logic.

## Project Structure

```
.
├── src/
│ ├── models/
│ │ └── Post.js # Post class representing a Hacker News post
│ ├── services/
│ │ └── HNScraper.js # Scraper class for Hacker News posts
│ ├── views/
│ │ └── ConsoleView.js # Handles console output formatting
│ ├── extractors.js # Helper functions to extract rank, title, URL, timestamp

│ └── main.js # Entry point to run the scraper
├── tests/
│ ├── ConsoleView.spec.js
│ ├── HNScraper.spec.js
│ └── Post.spec.js
├── tools/
│ └── clean.js # Utility script to clean test reports
├── .gitignore
├── index.js # Bootstraps the main function
├── package.json
├── playwright.config.js
└── README.md
```

## Usage

1. Unzip the submitted project folder.
2. Install dependencies:

```
npm install
```

3. Run the scraper:

```
npm start
```

4. Run the tests:

```
npm run test
```

## Tests

Tests are written using [Playwright Test](https://playwright.dev/docs/intro)
and cover:

- Scraping the correct number of posts.
- Chronological order of posts.
- No duplicate posts.
- Validity of post timestamps.
- Utility methods in `ConsoleView`, `Post`, and `HNScraper` classes.

## Code Notes

- **Maintainability & Readability**: Core classes ( `HNScraper`, `Post`, `ConsoleView`) are structured for clear separation of concerns.
- **Reliability**: Automated tests cover key functionality and data integrity.
- **Extensibility**: Classes are designed to easily accommodate future features, such as new output formats or additional scraping targets.
- **Design Philosophy:** Combines object-oriented design, modular file organization, JS documentation, and error handling to make the code clear, consistent, and easy to work with.
- Posts are sorted in **reverse chronological order** (`newest first`) before being returned.
- `ConsoleView` handles project-specific console rendering of posts, keeping scraping logic separate.
