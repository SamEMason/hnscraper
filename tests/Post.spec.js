/**
 * @project Hacker News Scraper
 * @author Samuel Mason
 * @file Post.spec.js
 * @description Unit tests for the Post class, including relative timestamp
 *              parsing, date conversion, and utility methods.
 * @created 2026-02-27
 */
import { describe } from 'node:test';
import { expect, test } from '@playwright/test';

import Post from '#src/models/Post.js';

describe('Post._relativeDate', () => {
  test('creates correct date from valid timestamp argument', () => {
    const basetime = 1772404670000;

    // Test second timestamp
    let timestamp = '1 second ago';
    let expectedResult = new Date(basetime - 1000);
    let result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);

    // Test pluralized minute timestamp
    timestamp = '28 minutes ago';
    expectedResult = new Date(basetime - 28 * 60 * 1000);
    result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);

    // Test hour timestamp
    timestamp = '1 hour ago';
    expectedResult = new Date(basetime - 60 * 60 * 1000);
    result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);

    // Test pluralized day timestamp
    timestamp = '17 days ago';
    expectedResult = new Date(basetime - 17 * 24 * 60 * 60 * 1000);
    result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);
  });

  test('creates default date using basetime argument if timestamp is invalid', () => {
    const basetime = 1772404670000;

    // Test timestamp with invalid `week` unit
    let timestamp = '2 weeks ago';
    let expectedResult = new Date(basetime);
    let result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);

    // Test timestamp with invalid time value < 1
    timestamp = '0 minutes ago';
    expectedResult = new Date(basetime);
    result = Post._relativeDate(timestamp, basetime);
    expect(result).toEqual(expectedResult);
  });
});

describe('Post._parseTimestamp', () => {
  test('returns correct value and unit values from valid timestamp', () => {
    let secondTimestamp = '1 second ago';
    let minuteTimestamp = '27 minutes ago';
    let hourTimestamp = '1 hour ago';
    let dayTimestamp = '4 days ago';

    // Test second timestamp
    const { value: secondValue, unit: secondUnit } =
      Post._parseTimestamp(secondTimestamp);
    expect(secondValue).toBe(1);
    expect(secondUnit).toBe('second');

    // Test minute timestamp
    const { value: minuteValue, unit: minuteUnit } =
      Post._parseTimestamp(minuteTimestamp);
    expect(minuteValue).toBe(27);
    expect(minuteUnit).toBe('minute');

    // Test hour timestamp
    const { value: hourValue, unit: hourUnit } =
      Post._parseTimestamp(hourTimestamp);
    expect(hourValue).toBe(1);
    expect(hourUnit).toBe('hour');

    // Test day timestamp
    const { value: dayValue, unit: dayUnit } =
      Post._parseTimestamp(dayTimestamp);
    expect(dayValue).toBe(4);
    expect(dayUnit).toBe('day');
  });
});

describe('Post._depluralize', () => {
  test('removes the trailing "s" from plural word "Removes"', () => {
    const pluralWord = 'Removes';

    const depluralizedWord = Post._depluralize(pluralWord);

    expect(depluralizedWord).toBe('Remove');
  });

  test('returns the the non-plural word "Unchanged" unchanged', () => {
    const nonPluralWord = 'unchanged';

    const depluralizedWord = Post._depluralize(nonPluralWord);

    expect(depluralizedWord).toBe('unchanged');
  });
});
