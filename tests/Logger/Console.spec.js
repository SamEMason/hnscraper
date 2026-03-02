/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file Console.spec.js
 * @description Unit tests for the Console class, testing console rendering,
 *              table formatting, headings, and truncation behavior.
 * @created 2026-02-27
 */
import { describe } from 'node:test';
import { expect, test } from '@playwright/test';

import Console from '#src/services/loggerAdapters/Console.js';

describe('Console._truncate', () => {
  test('returns string unchanged if their length is below the max allowed', () => {
    const maxArgLength = 10;
    const lessThan10 = 'a'.repeat(maxArgLength - 1);

    const truncatedResult = Console._truncate(lessThan10, maxArgLength);

    expect(truncatedResult).toBe(lessThan10);
  });

  test('returns string unchanged if their length is equal to the max allowed', () => {
    const maxArgLength = 10;
    const equalTo10 = 'a'.repeat(maxArgLength);

    const truncatedResult = Console._truncate(equalTo10, maxArgLength);

    expect(truncatedResult).toBe(equalTo10);
  });

  test('returns truncated string if length is greater than the max allowed', () => {
    const maxArgLength = 10;
    const greaterThan10 = 'a'.repeat(maxArgLength + 1);

    const expectedResult = greaterThan10.slice(0, maxArgLength) + '...';
    const truncatedResult = Console._truncate(greaterThan10, maxArgLength);

    expect(truncatedResult).toEqual(expectedResult);
  });
});
