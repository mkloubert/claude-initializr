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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow, type Locale } from 'date-fns';
import { de, enUS, es, fr, it, ja, ko, nl, pl, pt, tr, uk, zhCN, ar, el, he, hi } from 'date-fns/locale';
import { History, RotateCcw, GitCompare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useHistory } from '@/contexts';
import type { HistoryEntry } from '@/types/history';
import { HistoryDiffDialog } from './HistoryDiffDialog';

interface HistoryPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dateLocales: Record<string, Locale> = {
  de,
  en: enUS,
  es,
  fr,
  it,
  ja,
  ko,
  nl,
  pl,
  pt,
  tr,
  uk,
  zh: zhCN,
  ar,
  el,
  he,
  hi,
};

/**
 * Translates a change description key to a human-readable string.
 */
function translateChangeDescription(
  description: string,
  t: (key: string, options?: Record<string, string>) => string
): string {
  // Handle software enabled/disabled with package names
  if (description.startsWith('softwareEnabled:')) {
    const packages = description.split(':')[1];
    return t('history.changes.softwareEnabled', { software: packages });
  }
  if (description.startsWith('softwareDisabled:')) {
    const packages = description.split(':')[1];
    return t('history.changes.softwareDisabled', { software: packages });
  }

  // Map description keys to translation keys
  const descriptionMap: Record<string, string> = {
    initial: 'history.changes.initial',
    baseImage: 'history.changes.baseImage',
    nodeVersion: 'history.changes.nodeVersion',
    dockerPlatform: 'history.changes.dockerPlatform',
    aptPackagesAdded: 'history.changes.aptPackagesAdded',
    aptPackagesRemoved: 'history.changes.aptPackagesRemoved',
    npmPackagesAdded: 'history.changes.npmPackagesAdded',
    npmPackagesRemoved: 'history.changes.npmPackagesRemoved',
    runCommandsAdded: 'history.changes.runCommandsAdded',
    runCommandsRemoved: 'history.changes.runCommandsRemoved',
    envVariablesAdded: 'history.changes.envVariablesAdded',
    envVariablesRemoved: 'history.changes.envVariablesRemoved',
    envVariablesChanged: 'history.changes.envVariablesChanged',
    protectedFilesAdded: 'history.changes.protectedFilesAdded',
    protectedFilesRemoved: 'history.changes.protectedFilesRemoved',
    claudeMdChanged: 'history.changes.claudeMdChanged',
    permissionsChanged: 'history.changes.permissionsChanged',
    devContainerChanged: 'history.changes.devContainerChanged',
    multipleChanges: 'history.changes.multipleChanges',
  };

  const translationKey = descriptionMap[description];
  if (translationKey) {
    return t(translationKey);
  }

  return description;
}

/**
 * Panel showing configuration history with restore and diff options.
 */
export function HistoryPanel({ open, onOpenChange }: HistoryPanelProps) {
  const { t, i18n } = useTranslation();
  const { entries, goToState, clearHistory, isAvailable } = useHistory();
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [diffDialogOpen, setDiffDialogOpen] = useState(false);
  const [diffNewerEntry, setDiffNewerEntry] = useState<HistoryEntry | null>(null);
  const [diffOlderEntry, setDiffOlderEntry] = useState<HistoryEntry | null>(null);

  const currentLocale = dateLocales[i18n.language] || enUS;

  const handleRestore = (entry: HistoryEntry) => {
    goToState(entry.id);
    onOpenChange(false);
  };

  const handleViewDiff = (index: number) => {
    if (index < entries.length - 1) {
      setDiffNewerEntry(entries[index]);
      setDiffOlderEntry(entries[index + 1]);
      setDiffDialogOpen(true);
    }
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setClearDialogOpen(false);
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: currentLocale,
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5" aria-hidden="true" />
              {t('history.title')}
            </SheetTitle>
            <SheetDescription>
              {isAvailable
                ? t('history.description')
                : t('history.unavailable')}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col flex-1 min-h-0 px-4 pb-4">
            {entries.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground text-center">
                  {t('history.emptyState')}
                </p>
              </div>
            ) : (
              <ScrollArea className="flex-1 h-full overflow-hidden">
                <div className="relative py-2 pr-4">
                  {/* Timeline line */}
                  {entries.length > 1 && (
                    <div
                      className="absolute left-1 top-6 bottom-6 w-px bg-border"
                      aria-hidden="true"
                    />
                  )}

                  {/* Timeline entries */}
                  <div className="relative space-y-6">
                    {entries.map((entry, index) => {
                      const isCurrent = index === 0;

                      return (
                        <div key={entry.id} className="relative flex gap-4 pl-1">
                          {/* Timeline dot */}
                          <div
                            className={`relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full ring-[3px] ring-background ${isCurrent
                                ? 'bg-primary'
                                : 'bg-muted-foreground/50'
                              }`}
                            aria-hidden="true"
                          />

                          {/* Entry content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              {isCurrent && (
                                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  {t('history.currentState')}
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatTime(entry.timestamp)}
                              </span>
                            </div>

                            <p className="mt-1 text-sm font-medium leading-snug">
                              {translateChangeDescription(entry.description, t)}
                            </p>

                            {entry.affectedSections.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {entry.affectedSections.slice(0, 3).map((section) => (
                                  <span
                                    key={section}
                                    className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                                  >
                                    {section}
                                  </span>
                                ))}
                                {entry.affectedSections.length > 3 && (
                                  <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                                    +{entry.affectedSections.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Buttons: Restore for non-current, Diff if not oldest */}
                            {(!isCurrent || index < entries.length - 1) && (
                              <div className="mt-3 flex items-center gap-2">
                                {!isCurrent && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRestore(entry)}
                                    className="h-8 text-xs"
                                  >
                                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                                    {t('history.restoreButton')}
                                  </Button>
                                )}
                                {index < entries.length - 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewDiff(index)}
                                    className="h-8 text-xs"
                                  >
                                    <GitCompare className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                                    {t('history.viewDiffButton')}
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            )}

            {/* Clear history link at bottom */}
            {entries.length > 1 && (
              <div className="pt-4 mt-4 border-t">
                <button
                  onClick={() => setClearDialogOpen(true)}
                  className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors py-1"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('history.clearAll')}
                </button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('history.clearConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('history.clearConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('history.clearConfirmCancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory}>
              {t('history.clearConfirmClear')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <HistoryDiffDialog
        open={diffDialogOpen}
        onOpenChange={setDiffDialogOpen}
        newerEntry={diffNewerEntry}
        olderEntry={diffOlderEntry}
      />
    </>
  );
}
