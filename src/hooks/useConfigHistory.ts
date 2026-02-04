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

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppConfig } from '@/types';
import {
  HISTORY_DEBOUNCE_MS,
  MAX_HISTORY_ENTRIES,
  type HistoryEntry,
  type HistoryState,
} from '@/types/history';
import {
  clearAllHistory,
  isIndexedDBAvailable,
  loadAllHistory,
  saveHistoryEntries,
} from '@/services/configHistoryService';
import {
  configsAreEqual,
  detectChangedSections,
  generateChangeDescription,
} from '@/utils/configDiff';

/**
 * Generates a unique ID for history entries.
 */
function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

/**
 * Creates a history entry from a config snapshot.
 */
function createHistoryEntry(
  config: AppConfig,
  description: string,
  affectedSections: HistoryEntry['affectedSections']
): HistoryEntry {
  return {
    id: generateId(),
    timestamp: Date.now(),
    description,
    affectedSections,
    configSnapshot: config,
  };
}

/**
 * Return type for the useConfigHistory hook.
 */
export interface UseConfigHistoryReturn {
  /** Whether IndexedDB is available for history storage */
  isAvailable: boolean;
  /** Whether history is currently loading from IndexedDB */
  isLoading: boolean;
  /** Whether undo is possible */
  canUndo: boolean;
  /** Whether redo is possible */
  canRedo: boolean;
  /** Number of entries in the past stack */
  pastCount: number;
  /** Number of entries in the future stack */
  futureCount: number;
  /** All history entries (for displaying in history panel) */
  allEntries: HistoryEntry[];
  /** Undo the last change, returns the config to restore or null */
  undo: () => AppConfig | null;
  /** Redo a previously undone change, returns the config to restore or null */
  redo: () => AppConfig | null;
  /** Jump to a specific history entry by ID, returns the config to restore or null */
  goToState: (entryId: string) => AppConfig | null;
  /** Clear all history */
  clearHistory: () => Promise<void>;
  /** Track a config change (called by ConfigContext) */
  trackChange: (oldConfig: AppConfig, newConfig: AppConfig) => void;
  /** Initialize history with the current config (called once on mount) */
  initializeWithConfig: (config: AppConfig) => void;
}

/**
 * Hook for managing configuration history with undo/redo functionality.
 * Uses IndexedDB for persistent storage and implements the Past/Present/Future pattern.
 */
export function useConfigHistory(): UseConfigHistoryReturn {
  const [isAvailable] = useState(() => isIndexedDBAvailable());
  const [isLoading, setIsLoading] = useState(true);
  const [historyState, setHistoryState] = useState<HistoryState>({
    past: [],
    present: null,
    future: [],
  });

  // Refs for debouncing and tracking
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingConfigRef = useRef<AppConfig | null>(null);
  const lastSavedConfigRef = useRef<AppConfig | null>(null);
  const isInitializedRef = useRef(false);

  // Load history from IndexedDB on mount
  useEffect(() => {
    if (!isAvailable) {
      setIsLoading(false);
      return;
    }

    const loadHistory = async () => {
      try {
        const entries = await loadAllHistory();
        if (entries.length > 0) {
          // The most recent entry becomes "present", rest goes to "past"
          const [present, ...past] = entries;
          setHistoryState({
            past,
            present,
            future: [],
          });
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [isAvailable]);

  // Save history to IndexedDB whenever it changes
  useEffect(() => {
    if (!isAvailable || isLoading) {
      return;
    }

    const saveHistory = async () => {
      try {
        // Collect all entries to save
        const allEntries: HistoryEntry[] = [];
        if (historyState.present) {
          allEntries.push(historyState.present);
        }
        allEntries.push(...historyState.past);
        // Note: future entries are NOT persisted (they're in-memory only)

        // Clear and save all entries
        await clearAllHistory();
        if (allEntries.length > 0) {
          await saveHistoryEntries(allEntries);
        }
      } catch (error) {
        console.error('Failed to save history:', error);
      }
    };

    saveHistory();
  }, [historyState, isAvailable, isLoading]);

  /**
   * Initialize history with the current config.
   * Called once when the app mounts.
   */
  const initializeWithConfig = useCallback((config: AppConfig) => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    lastSavedConfigRef.current = config;

    // If we already have history, don't create initial entry
    setHistoryState((prev) => {
      if (prev.present) {
        return prev;
      }
      // Create initial entry
      const initialEntry = createHistoryEntry(config, 'initial', []);
      return {
        past: [],
        present: initialEntry,
        future: [],
      };
    });
  }, []);

  /**
   * Track a configuration change with debouncing.
   */
  const trackChange = useCallback((_oldConfig: AppConfig, newConfig: AppConfig) => {
    if (!isAvailable) {
      return;
    }

    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Store the pending config
    pendingConfigRef.current = newConfig;

    // Debounce the actual history save
    debounceTimerRef.current = setTimeout(() => {
      const configToSave = pendingConfigRef.current;
      if (!configToSave) {
        return;
      }

      // Compare with the last saved config to avoid duplicate entries
      const compareWith = lastSavedConfigRef.current;
      if (compareWith && configsAreEqual(compareWith, configToSave)) {
        return;
      }

      // Generate description and affected sections
      const description = compareWith
        ? generateChangeDescription(compareWith, configToSave) ?? 'unknown'
        : 'initial';
      const affectedSections = compareWith
        ? detectChangedSections(compareWith, configToSave)
        : [];

      // Create new history entry
      const newEntry = createHistoryEntry(configToSave, description, affectedSections);

      // Update state
      setHistoryState((prev) => {
        // Move current present to past (if it exists)
        const newPast = prev.present
          ? [prev.present, ...prev.past]
          : prev.past;

        // Trim past if it exceeds max
        const trimmedPast = newPast.slice(0, MAX_HISTORY_ENTRIES - 1);

        return {
          past: trimmedPast,
          present: newEntry,
          future: [], // Clear future on new change (standard undo/redo behavior)
        };
      });

      // Update last saved config
      lastSavedConfigRef.current = configToSave;
      pendingConfigRef.current = null;
    }, HISTORY_DEBOUNCE_MS);
  }, [isAvailable]);

  /**
   * Undo the last change.
   */
  const undo = useCallback((): AppConfig | null => {
    if (historyState.past.length === 0) {
      return null;
    }

    let configToRestore: AppConfig | null = null;

    setHistoryState((prev) => {
      if (prev.past.length === 0) {
        return prev;
      }

      const [newPresent, ...newPast] = prev.past;
      configToRestore = newPresent.configSnapshot;

      // Update last saved config to prevent re-tracking this change
      lastSavedConfigRef.current = configToRestore;

      return {
        past: newPast,
        present: newPresent,
        future: prev.present ? [prev.present, ...prev.future] : prev.future,
      };
    });

    return configToRestore;
  }, [historyState.past.length]);

  /**
   * Redo a previously undone change.
   */
  const redo = useCallback((): AppConfig | null => {
    if (historyState.future.length === 0) {
      return null;
    }

    let configToRestore: AppConfig | null = null;

    setHistoryState((prev) => {
      if (prev.future.length === 0) {
        return prev;
      }

      const [newPresent, ...newFuture] = prev.future;
      configToRestore = newPresent.configSnapshot;

      // Update last saved config to prevent re-tracking this change
      lastSavedConfigRef.current = configToRestore;

      return {
        past: prev.present ? [prev.present, ...prev.past] : prev.past,
        present: newPresent,
        future: newFuture,
      };
    });

    return configToRestore;
  }, [historyState.future.length]);

  /**
   * Jump to a specific history entry.
   */
  const goToState = useCallback((entryId: string): AppConfig | null => {
    // Find the entry in past, present, or future
    const allEntries = [
      ...(historyState.present ? [historyState.present] : []),
      ...historyState.past,
      ...historyState.future,
    ];

    const targetEntry = allEntries.find((e) => e.id === entryId);
    if (!targetEntry) {
      return null;
    }

    // If it's the current present, nothing to do
    if (historyState.present?.id === entryId) {
      return null;
    }

    let configToRestore: AppConfig | null = null;

    setHistoryState((prev) => {
      // Find index in past
      const pastIndex = prev.past.findIndex((e) => e.id === entryId);
      if (pastIndex !== -1) {
        // Target is in past - undo to that point
        const entriesToMoveToFuture = [
          ...(prev.present ? [prev.present] : []),
          ...prev.past.slice(0, pastIndex),
        ];
        const newPresent = prev.past[pastIndex];
        const newPast = prev.past.slice(pastIndex + 1);

        configToRestore = newPresent.configSnapshot;
        lastSavedConfigRef.current = configToRestore;

        return {
          past: newPast,
          present: newPresent,
          future: [...entriesToMoveToFuture, ...prev.future],
        };
      }

      // Find index in future
      const futureIndex = prev.future.findIndex((e) => e.id === entryId);
      if (futureIndex !== -1) {
        // Target is in future - redo to that point
        const entriesToMoveToPast = [
          ...prev.future.slice(0, futureIndex),
          ...(prev.present ? [prev.present] : []),
        ];
        const newPresent = prev.future[futureIndex];
        const newFuture = prev.future.slice(futureIndex + 1);

        configToRestore = newPresent.configSnapshot;
        lastSavedConfigRef.current = configToRestore;

        return {
          past: [...entriesToMoveToPast.reverse(), ...prev.past],
          present: newPresent,
          future: newFuture,
        };
      }

      return prev;
    });

    return configToRestore;
  }, [historyState]);

  /**
   * Clear all history.
   */
  const clearHistoryFn = useCallback(async () => {
    // Clear IndexedDB
    if (isAvailable) {
      await clearAllHistory();
    }

    // Reset state but keep current config as initial state
    setHistoryState((prev) => {
      if (prev.present) {
        return {
          past: [],
          present: {
            ...prev.present,
            id: generateId(),
            timestamp: Date.now(),
            description: 'initial',
            affectedSections: [],
          },
          future: [],
        };
      }
      return {
        past: [],
        present: null,
        future: [],
      };
    });
  }, [isAvailable]);

  // Compute derived values
  const canUndo = historyState.past.length > 0;
  const canRedo = historyState.future.length > 0;
  const pastCount = historyState.past.length;
  const futureCount = historyState.future.length;

  // Collect all entries for display (sorted by timestamp, newest first)
  const allEntries = [
    ...(historyState.present ? [historyState.present] : []),
    ...historyState.past,
  ].sort((a, b) => b.timestamp - a.timestamp);

  return {
    isAvailable,
    isLoading,
    canUndo,
    canRedo,
    pastCount,
    futureCount,
    allEntries,
    undo,
    redo,
    goToState,
    clearHistory: clearHistoryFn,
    trackChange,
    initializeWithConfig,
  };
}
