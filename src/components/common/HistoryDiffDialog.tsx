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

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConfig } from '@/contexts';
import { configToComparableJson, computeLineDiff } from '@/utils';
import type { HistoryEntry } from '@/types/history';

interface HistoryDiffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The newer entry (what changed TO) */
  newerEntry: HistoryEntry | null;
  /** The older entry (what changed FROM) */
  olderEntry: HistoryEntry | null;
}

/**
 * Dialog showing diff between two history entries.
 */
export function HistoryDiffDialog({
  open,
  onOpenChange,
  newerEntry,
  olderEntry,
}: HistoryDiffDialogProps) {
  const { t } = useTranslation();
  // Keep useConfig for potential future use, but we don't need it now
  useConfig();

  const diffResult = useMemo(() => {
    if (!newerEntry || !olderEntry) {
      return { lines: [], hasChanges: false };
    }

    const oldJson = configToComparableJson(olderEntry.configSnapshot);
    const newJson = configToComparableJson(newerEntry.configSnapshot);
    const lines = computeLineDiff(oldJson, newJson);
    const hasChanges = lines.some((line) => line.type !== 'unchanged');

    return { lines, hasChanges };
  }, [newerEntry, olderEntry]);

  if (!newerEntry || !olderEntry) {
    return null;
  }

  const olderDate = format(new Date(olderEntry.timestamp), 'PPpp');
  const newerDate = format(new Date(newerEntry.timestamp), 'PPpp');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t('history.diffTitle')}</DialogTitle>
          <DialogDescription>
            <span className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <span>
                <strong>{t('history.diffFrom')}:</strong> {olderDate}
              </span>
              <span>
                <strong>{t('history.diffTo')}:</strong> {newerDate}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="min-w-0">
          {!diffResult.hasChanges ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              {t('importExport.diffNoChanges')}
            </p>
          ) : (
            <ScrollArea className="h-80 overflow-hidden rounded-md border">
              <div className="w-fit min-w-full">
                <table
                  className="w-full border-collapse font-mono text-xs"
                  role="presentation"
                  aria-label={t('history.diffTitle')}
                >
                  <tbody>
                    {diffResult.lines.map((line, idx) => (
                      <tr
                        key={idx}
                        className={
                          line.type === 'removed'
                            ? 'bg-red-50 dark:bg-red-950/40'
                            : line.type === 'added'
                              ? 'bg-green-50 dark:bg-green-950/40'
                              : ''
                        }
                      >
                        <td
                          className="select-none px-2 text-right text-muted-foreground/50 align-top"
                          aria-hidden="true"
                        >
                          {line.oldLineNo ?? ''}
                        </td>
                        <td
                          className="select-none px-2 text-right text-muted-foreground/50 align-top"
                          aria-hidden="true"
                        >
                          {line.newLineNo ?? ''}
                        </td>
                        <td
                          className={`select-none w-4 text-center align-top ${line.type === 'removed'
                              ? 'text-red-700 dark:text-red-400'
                              : line.type === 'added'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-muted-foreground/30'
                            }`}
                          aria-hidden="true"
                        >
                          {line.type === 'removed'
                            ? '\u2212'
                            : line.type === 'added'
                              ? '+'
                              : '\u00A0'}
                        </td>
                        <td className="whitespace-pre pr-4 align-top">
                          <span
                            className={
                              line.type === 'removed'
                                ? 'text-red-900 dark:text-red-200'
                                : line.type === 'added'
                                  ? 'text-green-900 dark:text-green-200'
                                  : ''
                            }
                          >
                            {line.content || '\u00A0'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            {t('history.diffClose')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
