/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file ConsoleView.spec.js
 * @description Unit tests for the ConsoleView class, testing console rendering,
 *              table formatting, headings, and truncation behavior.
 * @created 2026-02-27
 */
import { expect, test } from '@playwright/test';

import ConsoleView from '#src/views/ConsoleView.js';
import { describe } from 'node:test';

describe('ConsoleView._truncate', () => {
  test('returns string unchanged if their length is below the max allowed', () => {
    const maxArgLength = 10;
    const lessThan10 = 'a'.repeat(maxArgLength - 1);

    const truncatedResult = ConsoleView._truncate(lessThan10, maxArgLength);

    expect(truncatedResult).toBe(lessThan10);
  });

  test('returns string unchanged if their length is equal to the max allowed', () => {
    const maxArgLength = 10;
    const equalTo10 = 'a'.repeat(maxArgLength);

    const truncatedResult = ConsoleView._truncate(equalTo10, maxArgLength);

    expect(truncatedResult).toBe(equalTo10);
  });

  test('returns truncated string if length is greater than the max allowed', () => {
    const maxArgLength = 10;
    const greaterThan10 = 'a'.repeat(maxArgLength + 1);

    const expectedResult = greaterThan10.slice(0, maxArgLength) + '...';
    const truncatedResult = ConsoleView._truncate(greaterThan10, maxArgLength);

    expect(truncatedResult).toEqual(expectedResult);
  });
});
