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

import { createContext } from 'react';
import type { HistoryEntry } from '@/types/history';

/**
 * Context value interface for history state and actions.
 */
export interface HistoryContextValue {
  /** Whether IndexedDB is available for history storage */
  isAvailable: boolean;

  /** Whether history is currently loading from IndexedDB */
  isLoading: boolean;

  /** Whether undo is possible */
  canUndo: boolean;

  /** Whether redo is possible */
  canRedo: boolean;

  /** Number of entries in the undo stack */
  undoCount: number;

  /** Number of entries in the redo stack */
  redoCount: number;

  /** All history entries for display in history panel (newest first) */
  entries: HistoryEntry[];

  /** Undo the last change */
  undo: () => void;

  /** Redo a previously undone change */
  redo: () => void;

  /** Jump to a specific history entry by ID */
  goToState: (entryId: string) => void;

  /** Clear all history */
  clearHistory: () => Promise<void>;
}

export const HistoryContext = createContext<HistoryContextValue | null>(null);
