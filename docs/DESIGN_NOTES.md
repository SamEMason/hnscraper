# Design Notes

#### **Project**: Hacker News Scraper

#### **Author**: Samuel Mason

## Architecture Overview

- The scraper is structured around **object-oriented classes**:

  - `HNScraper` handles the core scraping logic and page navigation.

  - `Post` represents individual posts with relative timestamp parsing and absolute date calculation.

  - `Logger` centralizes logging for all output types (console, JSON), allowing consistent message formatting and configurable logging.

    - `Console` handles console output, separating display logic from scraping.

    - `JSONLogger` writes output to a JSON file, allowing for persistent post data.

- **Separation of concerns** ensures each class has a clear responsibility, improving maintainability and readability.

## Design Decisions

1.  **Class-based architecture**

    - All main functionality is encapsulated in classes to practice OO design and to make the code more modular, extensible, and testable.

    - The `HNScraper` class internally manages state like `_posts` and `_seenKeys` while exposing only public methods (`init`, `scrape`, `getPosts`).

    - `Logger` uses composition to support multiple adapters (`Console`, `JSON`) without altering scraper logic.

2.  **Timestamp handling**

    - Chose native `Date` objects over third-party libraries to minimize dependencies and simplify testing.

    - Considered `date-fns` and the upcoming `Temporal API`, but opted for native functionality for portability and simplicity.

3.  **Error handling**

    - Robust try/catch blocks ensure scraper continues even if a post fails to parse.

    - Duplicate detection via a Set prevents redundant posts.

4.  **Testing & Reliability**

    - Unit tests cover `HNScraper`, `Post`, and `Logger` methods.

    - E2E-style tests verify `HNScraper` produces the correct number of posts, maintains chronological order without duplicates.

5.  **Logging & Output Abstraction**

    - `Console` handles project-specific console rendering.

    - `Logger` unifies multiple outputs, enabling configurable logging to console or JSON file without changing scraper logic.

## Extensibility

- New display formats (e.g., `CSV`, `HTML`) only requires a new logging adapter.

- Additional scraping targets or metadata can be integrated by extending the `HNScraper` or updating utility extractors.

- Future benchmarking could be implemented via a `Benchmark` service that wraps scraper runs, logging timing data independently of the main output.
