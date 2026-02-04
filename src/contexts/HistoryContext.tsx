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

import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useConfig } from './useConfig';
import { useConfigHistory } from '@/hooks/useConfigHistory';
import { HistoryContext, type HistoryContextValue } from './historyContextValue';

interface HistoryProviderProps {
  children: ReactNode;
}

/**
 * Provider component for configuration history state.
 * Must be used inside ConfigProvider as it depends on useConfig.
 */
export function HistoryProvider({ children }: HistoryProviderProps) {
  const { config, importConfig } = useConfig();
  const {
    isAvailable,
    isLoading,
    canUndo,
    canRedo,
    pastCount,
    futureCount,
    allEntries,
    undo: undoHistory,
    redo: redoHistory,
    goToState: goToHistoryState,
    clearHistory,
    trackChange,
    initializeWithConfig,
  } = useConfigHistory();

  // Track the previous config for change detection
  const prevConfigRef = useRef(config);
  const isRestoringRef = useRef(false);

  // Initialize history with current config on mount
  useEffect(() => {
    initializeWithConfig(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Track config changes (but not when we're restoring from history)
  useEffect(() => {
    if (isRestoringRef.current) {
      // Skip tracking when we're restoring from history
      isRestoringRef.current = false;
      prevConfigRef.current = config;
      return;
    }

    const prevConfig = prevConfigRef.current;
    if (prevConfig !== config) {
      trackChange(prevConfig, config);
      prevConfigRef.current = config;
    }
  }, [config, trackChange]);

  /**
   * Undo the last change and restore the previous config.
   */
  const undo = useCallback(() => {
    const restoredConfig = undoHistory();
    if (restoredConfig) {
      isRestoringRef.current = true;
      importConfig(restoredConfig);
    }
  }, [undoHistory, importConfig]);

  /**
   * Redo a previously undone change.
   */
  const redo = useCallback(() => {
    const restoredConfig = redoHistory();
    if (restoredConfig) {
      isRestoringRef.current = true;
      importConfig(restoredConfig);
    }
  }, [redoHistory, importConfig]);

  /**
   * Jump to a specific history state.
   */
  const goToState = useCallback((entryId: string) => {
    const restoredConfig = goToHistoryState(entryId);
    if (restoredConfig) {
      isRestoringRef.current = true;
      importConfig(restoredConfig);
    }
  }, [goToHistoryState, importConfig]);

  const value = useMemo<HistoryContextValue>(
    () => ({
      isAvailable,
      isLoading,
      canUndo,
      canRedo,
      undoCount: pastCount,
      redoCount: futureCount,
      entries: allEntries,
      undo,
      redo,
      goToState,
      clearHistory,
    }),
    [
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
      clearHistory,
    ]
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
