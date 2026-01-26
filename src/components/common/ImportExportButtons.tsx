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

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { diffLines } from 'diff';
import { Download, Upload } from 'lucide-react';
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
import { validateImportData } from '@/services';
import type { AppConfig } from '@/types';

/**
 * Strips internal IDs and sensitive values from a config
 * so that the diff only shows meaningful content changes.
 */
function configToComparableJson(config: AppConfig): string {
  const comparable = {
    baseImage: config.baseImage,
    nodeVersion: config.nodeVersion,
    dockerPlatform: config.dockerPlatform,
    software: Object.fromEntries(
      Object.entries(config.software).map(([key, val]) => [
        key,
        { enabled: val.enabled },
      ]),
    ),
    customAptPackages: [...config.customAptPackages].sort(),
    customNpmPackages: config.customNpmPackages
      .map(({ name, installAs }) => ({ name, installAs }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    customRunCommands: config.customRunCommands.map(({ command, runAs }) => ({
      command,
      runAs,
    })),
    envVariables: (config.envVariables ?? [])
      .map(({ key }) => ({ key }))
      .sort((a, b) => a.key.localeCompare(b.key)),
    protectedFiles: config.protectedFiles
      .map(({ path }) => ({ path }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    claudeMdContent: config.claudeMdContent,
    claudePermissions: {
      allow: config.claudePermissions.allow
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
      ask: config.claudePermissions.ask
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
      deny: config.claudePermissions.deny
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
    },
  };

  return JSON.stringify(comparable, null, 2);
}

/**
 * Represents a single line in the diff output.
 */
interface DiffLine {
  oldLineNo: number | null;
  newLineNo: number | null;
  type: 'added' | 'removed' | 'unchanged';
  content: string;
}

/**
 * Computes a line-by-line diff between two text strings.
 */
function computeLineDiff(oldText: string, newText: string): DiffLine[] {
  const changes = diffLines(oldText, newText);
  const lines: DiffLine[] = [];
  let oldLine = 1;
  let newLine = 1;

  for (const change of changes) {
    const changeLines = change.value.replace(/\n$/, '').split('\n');

    for (const line of changeLines) {
      if (change.added) {
        lines.push({
          oldLineNo: null,
          newLineNo: newLine++,
          type: 'added',
          content: line,
        });
      } else if (change.removed) {
        lines.push({
          oldLineNo: oldLine++,
          newLineNo: null,
          type: 'removed',
          content: line,
        });
      } else {
        lines.push({
          oldLineNo: oldLine++,
          newLineNo: newLine++,
          type: 'unchanged',
          content: line,
        });
      }
    }
  }

  return lines;
}

/**
 * Import and export buttons for configuration files.
 * Renders two icon buttons and a confirmation dialog for import.
 */
export function ImportExportButtons() {
  const { t } = useTranslation();
  const { config, exportConfig, importConfig } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingConfig, setPendingConfig] = useState<AppConfig | null>(null);

  const diffResult = useMemo(() => {
    if (!pendingConfig) return { lines: [] as DiffLine[], hasChanges: false };
    const oldJson = configToComparableJson(config);
    const newJson = configToComparableJson(pendingConfig);
    const lines = computeLineDiff(oldJson, newJson);
    const hasChanges = lines.some((l) => l.type !== 'unchanged');
    return { lines, hasChanges };
  }, [config, pendingConfig]);

  const handleExport = useCallback(() => {
    exportConfig();
    toast.success(t('importExport.exportSuccess'));
  }, [exportConfig, t]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const parsed: unknown = JSON.parse(reader.result as string);
          const result = validateImportData(parsed);

          if (!result.success) {
            toast.error(t('importExport.importErrorValidation'));
            return;
          }

          setPendingConfig(result.data.config);
          setDialogOpen(true);
        } catch {
          toast.error(t('importExport.importErrorInvalidFile'));
        }
      };

      reader.onerror = () => {
        toast.error(t('importExport.importErrorRead'));
      };

      reader.readAsText(file);

      // Reset so the same file can be re-selected
      event.target.value = '';
    },
    [t],
  );

  const handleApply = useCallback(() => {
    if (pendingConfig) {
      importConfig(pendingConfig);
      toast.success(t('importExport.importSuccess'));
    }
    setDialogOpen(false);
    setPendingConfig(null);
  }, [pendingConfig, importConfig, t]);

  const handleCancel = useCallback(() => {
    setDialogOpen(false);
    setPendingConfig(null);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleExport}
        aria-label={t('importExport.exportButton')}
        title={t('importExport.exportButton')}
      >
        <Upload className="h-5 w-5" aria-hidden="true" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleImportClick}
        aria-label={t('importExport.importButton')}
        title={t('importExport.importButton')}
      >
        <Download className="h-5 w-5" aria-hidden="true" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t('importExport.importButton')}
        tabIndex={-1}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{t('importExport.importConfirmTitle')}</DialogTitle>
            <DialogDescription>
              {t('importExport.importConfirmDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="min-w-0">
            <h3 className="mb-3 text-sm font-medium">
              {t('importExport.diffTitle')}
            </h3>

            {!diffResult.hasChanges ? (
              <p className="text-muted-foreground text-sm">
                {t('importExport.diffNoChanges')}
              </p>
            ) : (
              <ScrollArea className="h-80 overflow-hidden rounded-md border">
                <div className="w-fit min-w-full">
                  <table
                    className="w-full border-collapse font-mono text-xs"
                    role="presentation"
                    aria-label={t('importExport.diffTitle')}
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
                            className={`select-none w-4 text-center align-top ${
                              line.type === 'removed'
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
            <Button variant="outline" onClick={handleCancel}>
              {t('importExport.importConfirmCancel')}
            </Button>
            <Button onClick={handleApply}>
              {t('importExport.importConfirmApply')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
