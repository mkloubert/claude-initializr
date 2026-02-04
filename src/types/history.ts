// Copyright © 2026 Marcel Joachim Kloubert <marcel@kloubert.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import type { AppConfig } from './config';

/**
 * Sections of the configuration that can be affected by a change.
 */
export type ConfigSection =
  | 'baseImage'
  | 'nodeVersion'
  | 'dockerPlatform'
  | 'software'
  | 'customAptPackages'
  | 'customNpmPackages'
  | 'customRunCommands'
  | 'envVariables'
  | 'protectedFiles'
  | 'claudeMdContent'
  | 'claudePermissions'
  | 'devContainer';

/**
 * Represents a single entry in the configuration history.
 */
export interface HistoryEntry {
  /** Unique identifier for this history entry (UUID) */
  id: string;
  /** Timestamp when this entry was created (Date.now()) */
  timestamp: number;
  /** Human-readable description of the change */
  description: string;
  /** List of configuration sections that were affected by this change */
  affectedSections: ConfigSection[];
  /** Full configuration snapshot at this point in time */
  configSnapshot: AppConfig;
}

/**
 * Represents the current state of the history system.
 * Uses the Past/Present/Future pattern for undo/redo.
 */
export interface HistoryState {
  /** Previous states that can be restored via undo */
  past: HistoryEntry[];
  /** The current state (null if no history yet) */
  present: HistoryEntry | null;
  /** States that were undone and can be restored via redo */
  future: HistoryEntry[];
}

/**
 * Maximum number of history entries to keep.
 * Oldest entries are removed when this limit is exceeded.
 */
export const MAX_HISTORY_ENTRIES = 50;

/**
 * Debounce delay in milliseconds for capturing history snapshots.
 * Changes within this time window are merged into a single entry.
 */
export const HISTORY_DEBOUNCE_MS = 500;

/**
 * Database name for IndexedDB storage.
 */
export const HISTORY_DB_NAME = 'claude-initializr-history';

/**
 * Current database version for IndexedDB schema migrations.
 */
export const HISTORY_DB_VERSION = 1;

/**
 * Object store name for history entries in IndexedDB.
 */
export const HISTORY_STORE_NAME = 'history';
