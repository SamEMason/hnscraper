/**
 * @project Hacker News Scraper
 * @author Sam Mason
 * @file clean.js
 * @description Utility script for cleaning or resetting data directories,
 *              caches, or temporary files related to the project.
 * @created 2026-02-27
 */
import { access, rm } from 'fs/promises';
import { constants } from 'fs';

import Config from '#src/Config.js';

/**
 * List of directories to remove during cleanup.
 * @type {string[]}
 */
const TARGETS = Config.CLEAN_TARGETS;

/**
 * Deletes script-generated output directories if they exist.
 *
 * @returns {Promise<void>}
 */
async function clean() {
  let deleted = 0;

  for (const target of TARGETS) {
    try {
      // Check if target exists
      await access(target, constants.F_OK);
      ++deleted;
      // If target exists, delete it
      await rm(target, { recursive: true, force: true });
    } catch {}
  }
  console.log(`Cleaned up ${deleted} item${deleted == 1 ? '' : 's'}.`);
}

clean();
