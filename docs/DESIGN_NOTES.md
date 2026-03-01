# Design Notes

#### **Project**: Hacker News Scraper

#### **Author**: Samuel Mason

## Architecture Overview

- The scraper is structured around **object-oriented classes**:

  - `HNScraper` handles the core scraping logic and page navigation.

  - `Post` represents individual posts with relative timestamp parsing and absolute date calculation.

  - `ConsoleView` handles console output, separating display logic from scraping.

- **Separation of concerns** ensures each class has a clear responsibility, improving maintainability and readability.

## Design Decisions

1.  **Class-based architecture**

    - All main functionality is encapsulated in classes to practice OO design and to make the code more modular, extensible, and testable.

    - The `HNScraper` class internally manages state like `_posts` and `_seenKeys` while exposing only public methods (`init`, `scrape`, `getPosts`).

2.  **Timestamp handling**

    - Chose native `Date` objects over third-party libraries to minimize dependencies and simplify testing.

    - Considered `date-fns` and the upcoming `Temporal API`, but opted for native functionality for portability and simplicity.

3.  **Error handling**

    - Robust try/catch blocks ensure scraper continues even if a post fails to parse.

    - Duplicate detection via a Set prevents redundant posts.

4.  **Testing & Reliability**

    - Unit tests cover `HNScraper`, `Post`, and `ConsoleView` methods.

    - E2E-style tests verify `HNScraper` produces the correct number of posts, maintains chronological order, and skips duplicates.

5.  **Console output**

    - `ConsoleView` abstracts display logic from scraping, making it easier to swap in a different output format in the future.

## Extensibility

- New display formats (e.g., `JSON`, `CSV`) can be added without changing the scraper logic.

- Additional scraping targets or metadata can be integrated by extending the `HNScraper` and utility functions.
