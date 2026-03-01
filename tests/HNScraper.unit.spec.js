/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file HNScraper.spec.js
 * @description Unit tests for the HNScraper class, including post data validation.
 * @created 2026-02-27
 */
import { expect, test } from '@playwright/test';

import HNScraper from '#src/services/HNScraper.js';
import { describe } from 'node:test';

// Variables to be setup in beforeAll hook and used in tests
const postQuantity = 100;
let scraper;

// Setup the HNScraper before all tests
test.beforeAll(async () => {
  scraper = new HNScraper(postQuantity);
});

describe('HNScraper._validatePostData', () => {
  test('returns true for valid data arguments', () => {
    const rank = 1;
    const title = 'This Post Title Is Happy To Be Read.';
    const href = 'https://www.postdatavalidation.test/';
    const timestamp = '1 minute ago';

    const isValid = scraper._validatePostData(rank, title, href, timestamp);

    expect(isValid).toBe(true);
  });

  test('returns false for invalid rank arguments', () => {
    const title = 'This Post Title Is Happy To Be Read.';
    const href = 'https://www.postdatavalidation.test/';
    const timestamp = '1 minute ago';

    // 1. Test non-number rank argument
    let rank = '1';
    let isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 2. Test negative number rank argument
    rank = -1;
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 3. Test null rank argument
    rank = null;
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);
  });

  test('returns false for invalid title arguments', () => {
    const rank = 1;
    const href = 'https://www.postdatavalidation.test/';
    const timestamp = '1 minute ago';

    // 1. Test non-string title argument
    let title = 500;
    let isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 2. Test empty string title argument
    title = '';
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 3. Test null title argument
    title = null;
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);
  });

  test('returns false for invalid href arguments', () => {
    const rank = 1;
    const title = 'This Post Title Is Happy To Be Read';
    const timestamp = '1 minute ago';

    // 1. Test non-string href argument
    let href = 500;
    let isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 2. Test empty string href argument
    href = '';
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 3. Test null href argument
    href = null;
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);
  });

  test('returns false for invalid timestamp arguments', () => {
    const rank = 1;
    const title = 'This Post Title Is Happy To Be Read';
    const href = 'https://www.postdatavalidation.test/';

    // 1. Test non-string timestamp argument
    let timestamp = 500;
    let isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 2. Test empty string timestamp argument
    timestamp = '';
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);

    // 3. Test null timestamp argument
    timestamp = null;
    isValid = scraper._validatePostData(rank, title, href, timestamp);
    expect(isValid).toBe(false);
  });
});
