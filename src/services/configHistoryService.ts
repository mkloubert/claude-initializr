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

import { openDB, type IDBPDatabase } from 'idb';
import {
  HISTORY_DB_NAME,
  HISTORY_DB_VERSION,
  HISTORY_STORE_NAME,
  MAX_HISTORY_ENTRIES,
  type HistoryEntry,
} from '../types/history';

/**
 * Schema definition for the history database.
 */
interface HistoryDBSchema {
  [HISTORY_STORE_NAME]: {
    key: string;
    value: HistoryEntry;
    indexes: {
      'by-timestamp': number;
    };
  };
}

/** Cached database instance */
let dbInstance: IDBPDatabase<HistoryDBSchema> | null = null;

/**
 * Checks if IndexedDB is available in the current environment.
 * Returns false for SSR, private browsing in some browsers, etc.
 */
export function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return 'indexedDB' in window && window.indexedDB !== null;
  } catch {
    return false;
  }
}

/**
 * Initializes and returns the IndexedDB database instance.
 * Creates the database and object stores if they don't exist.
 * Returns null if IndexedDB is not available.
 */
async function getDB(): Promise<IDBPDatabase<HistoryDBSchema> | null> {
  if (!isIndexedDBAvailable()) {
    return null;
  }

  if (dbInstance) {
    return dbInstance;
  }

  try {
    dbInstance = await openDB<HistoryDBSchema>(HISTORY_DB_NAME, HISTORY_DB_VERSION, {
      upgrade(db, oldVersion) {
        // Handle schema migrations
        if (oldVersion < 1) {
          // Initial schema: create history store with timestamp index
          const store = db.createObjectStore(HISTORY_STORE_NAME, {
            keyPath: 'id',
          });
          store.createIndex('by-timestamp', 'timestamp');
        }
        // Future migrations would go here:
        // if (oldVersion < 2) { ... }
      },
      blocked() {
        // Called if another tab has an older version open
        console.warn('History database blocked by another tab');
      },
      blocking() {
        // Called if this tab is blocking another tab's upgrade
        dbInstance?.close();
        dbInstance = null;
      },
      terminated() {
        // Called if the database connection is unexpectedly terminated
        dbInstance = null;
      },
    });

    return dbInstance;
  } catch (error) {
    console.error('Failed to open history database:', error);
    return null;
  }
}

/**
 * Saves a history entry to IndexedDB.
 * Automatically trims old entries if the maximum is exceeded.
 */
export async function saveHistoryEntry(entry: HistoryEntry): Promise<boolean> {
  try {
    const db = await getDB();
    if (!db) {
      return false;
    }

    // Save the entry
    await db.put(HISTORY_STORE_NAME, entry);

    // Check if we need to trim old entries
    const count = await db.count(HISTORY_STORE_NAME);
    if (count > MAX_HISTORY_ENTRIES) {
      await trimOldestEntries(db, count - MAX_HISTORY_ENTRIES);
    }

    return true;
  } catch (error) {
    console.error('Failed to save history entry:', error);
    return false;
  }
}

/**
 * Saves multiple history entries to IndexedDB in a single transaction.
 */
export async function saveHistoryEntries(entries: HistoryEntry[]): Promise<boolean> {
  if (entries.length === 0) {
    return true;
  }

  try {
    const db = await getDB();
    if (!db) {
      return false;
    }

    const tx = db.transaction(HISTORY_STORE_NAME, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE_NAME);

    for (const entry of entries) {
      await store.put(entry);
    }

    await tx.done;

    // Check if we need to trim old entries
    const count = await db.count(HISTORY_STORE_NAME);
    if (count > MAX_HISTORY_ENTRIES) {
      await trimOldestEntries(db, count - MAX_HISTORY_ENTRIES);
    }

    return true;
  } catch (error) {
    console.error('Failed to save history entries:', error);
    return false;
  }
}

/**
 * Loads all history entries from IndexedDB, sorted by timestamp (newest first).
 */
export async function loadAllHistory(): Promise<HistoryEntry[]> {
  try {
    const db = await getDB();
    if (!db) {
      return [];
    }

    const entries = await db.getAllFromIndex(HISTORY_STORE_NAME, 'by-timestamp');
    // Sort by timestamp descending (newest first)
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

/**
 * Loads a specific history entry by ID.
 */
export async function loadHistoryEntry(id: string): Promise<HistoryEntry | null> {
  try {
    const db = await getDB();
    if (!db) {
      return null;
    }

    const entry = await db.get(HISTORY_STORE_NAME, id);
    return entry ?? null;
  } catch (error) {
    console.error('Failed to load history entry:', error);
    return null;
  }
}

/**
 * Deletes a specific history entry by ID.
 */
export async function deleteHistoryEntry(id: string): Promise<boolean> {
  try {
    const db = await getDB();
    if (!db) {
      return false;
    }

    await db.delete(HISTORY_STORE_NAME, id);
    return true;
  } catch (error) {
    console.error('Failed to delete history entry:', error);
    return false;
  }
}

/**
 * Deletes multiple history entries by their IDs.
 */
export async function deleteHistoryEntries(ids: string[]): Promise<boolean> {
  if (ids.length === 0) {
    return true;
  }

  try {
    const db = await getDB();
    if (!db) {
      return false;
    }

    const tx = db.transaction(HISTORY_STORE_NAME, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE_NAME);

    for (const id of ids) {
      await store.delete(id);
    }

    await tx.done;
    return true;
  } catch (error) {
    console.error('Failed to delete history entries:', error);
    return false;
  }
}

/**
 * Clears all history entries from IndexedDB.
 */
export async function clearAllHistory(): Promise<boolean> {
  try {
    const db = await getDB();
    if (!db) {
      return false;
    }

    await db.clear(HISTORY_STORE_NAME);
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
}

/**
 * Returns the number of history entries in IndexedDB.
 */
export async function getHistoryCount(): Promise<number> {
  try {
    const db = await getDB();
    if (!db) {
      return 0;
    }

    return await db.count(HISTORY_STORE_NAME);
  } catch (error) {
    console.error('Failed to get history count:', error);
    return 0;
  }
}

/**
 * Trims the oldest entries from the database.
 * @param db Database instance
 * @param count Number of entries to remove
 */
async function trimOldestEntries(
  db: IDBPDatabase<HistoryDBSchema>,
  count: number
): Promise<void> {
  if (count <= 0) {
    return;
  }

  try {
    // Get all entries sorted by timestamp (oldest first)
    const entries = await db.getAllFromIndex(HISTORY_STORE_NAME, 'by-timestamp');
    entries.sort((a, b) => a.timestamp - b.timestamp);

    // Delete the oldest entries
    const toDelete = entries.slice(0, count);
    const tx = db.transaction(HISTORY_STORE_NAME, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE_NAME);

    for (const entry of toDelete) {
      await store.delete(entry.id);
    }

    await tx.done;
  } catch (error) {
    console.error('Failed to trim old history entries:', error);
  }
}

/**
 * Closes the database connection.
 * Call this when the app is unmounting or to release resources.
 */
export function closeHistoryDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Checks if the history database has any entries.
 */
export async function hasHistory(): Promise<boolean> {
  const count = await getHistoryCount();
  return count > 0;
}
