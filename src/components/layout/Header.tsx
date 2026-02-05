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
import { SiGithub } from 'react-icons/si';
import { toast } from 'sonner';
import {
  Archive,
  ChevronDown,
  Download,
  Globe,
  History,
  Keyboard,
  Moon,
  Monitor,
  RotateCcw,
  Save,
  SaveOff,
  Settings,
  Sun,
  Upload,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UndoRedoButtons, HistoryPanel } from '@/components/common';
import { APP_VERSION, GITHUB_URL } from '@/config';
import { useConfig, useTheme } from '@/contexts';
import { useHistory } from '@/contexts';
import { getModifierKey } from '@/hooks/useKeyboardShortcuts';
import { validateImportData, downloadZipFile, type ReadmeLanguageConfig } from '@/services';
import { configToComparableJson, computeLineDiff, type DiffLine } from '@/utils';
import type { AppConfig } from '@/types';
import logoImage from '@/assets/logo.png';

const languageNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
  he: 'עברית',
  hi: 'हिन्दी',
  ur: 'اردو',
  uk: 'Українська',
  el: 'Ελληνικά',
  pl: 'Polski',
  tr: 'Türkçe',
};

interface LanguageConfig {
  code: string;
  sortValue: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageConfig[] = [
  { code: 'ar', sortValue: 'arabic', nativeName: 'العربية', flag: '🌍' },
  { code: 'zh', sortValue: 'chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'nl', sortValue: 'dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', sortValue: 'english', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', sortValue: 'french', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', sortValue: 'german', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', sortValue: 'greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', sortValue: 'hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'hi', sortValue: 'hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', sortValue: 'italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', sortValue: 'japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', sortValue: 'korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'pl', sortValue: 'polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'pt', sortValue: 'portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'es', sortValue: 'spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'tr', sortValue: 'turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', sortValue: 'ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'ur', sortValue: 'urdu', nativeName: 'اردو', flag: '🇵🇰' },
];

interface HeaderProps {
  resetDialogOpen?: boolean;
  onResetDialogOpenChange?: (open: boolean) => void;
  onOpenShortcutsHelp?: () => void;
}

/**
 * Compact application header with grouped dropdown actions.
 */
export function Header({
  resetDialogOpen,
  onResetDialogOpenChange,
  onOpenShortcutsHelp,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { config, exportConfig, importConfig, resetConfig, autosaveEnabled, setAutosaveEnabled } = useConfig();
  const { theme, setTheme } = useTheme();
  const { entries, isAvailable } = useHistory();
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [pendingConfig, setPendingConfig] = useState<AppConfig | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modKey = getModifierKey();

  const tEnglish = useMemo(() => i18n.getFixedT('en'), [i18n]);

  const sortedLanguages = useMemo(() => {
    return [...languages].sort((a, b) => a.sortValue.localeCompare(b.sortValue));
  }, []);

  const historyCount = entries.length > 1 ? entries.length - 1 : 0;

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
          setImportDialogOpen(true);
        } catch {
          toast.error(t('importExport.importErrorInvalidFile'));
        }
      };

      reader.onerror = () => {
        toast.error(t('importExport.importErrorRead'));
      };

      reader.readAsText(file);
      event.target.value = '';
    },
    [t],
  );

  const handleApplyImport = useCallback(() => {
    if (pendingConfig) {
      importConfig(pendingConfig);
      toast.success(t('importExport.importSuccess'));
    }
    setImportDialogOpen(false);
    setPendingConfig(null);
  }, [pendingConfig, importConfig, t]);

  const handleCancelImport = useCallback(() => {
    setImportDialogOpen(false);
    setPendingConfig(null);
  }, []);

  const handleDownloadZip = useCallback(async () => {
    setIsDownloading(true);
    try {
      const currentLanguage = i18n.language;
      const readmeConfig: ReadmeLanguageConfig = {
        language: currentLanguage,
        languageName: languageNames[currentLanguage] || currentLanguage,
        t,
        tEnglish,
        initializerUrl: window.location.origin + window.location.pathname,
      };
      await downloadZipFile(config, t('download.filename'), readmeConfig);
    } finally {
      setIsDownloading(false);
    }
  }, [config, t, tEnglish, i18n]);

  const handleLanguageChange = useCallback((code: string) => {
    i18n.changeLanguage(code);
  }, [i18n]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger aria-label={t('sidebar.toggle')} />
            <Separator orientation="vertical" className="h-4" />
            <img
              src={logoImage}
              alt=""
              className="h-6 w-6"
              aria-hidden="true"
            />
            <h1 className="text-sm font-semibold tracking-tight hidden sm:block">
              {t('app.title')}
            </h1>
            <Badge variant="secondary" className="hidden md:inline-flex text-xs">
              {APP_VERSION}
            </Badge>
          </div>

          <nav aria-label={t('nav.header')} className="flex items-center gap-1">
            {/* Download Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t('header.download')}</span>
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownloadZip} disabled={isDownloading}>
                  <Archive className="h-4 w-4" aria-hidden="true" />
                  {t('header.downloadZip')}
                  <DropdownMenuShortcut>{modKey}+S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExport}>
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  {t('header.exportConfig')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleImportClick}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('header.importConfig')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-4" />

            {/* Undo/Redo — standalone, frequently used */}
            <UndoRedoButtons />

            <Separator orientation="vertical" className="h-4" />

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('header.settings')}>
                  <Settings className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuCheckboxItem
                  checked={autosaveEnabled}
                  onCheckedChange={() => setAutosaveEnabled(!autosaveEnabled)}
                >
                  {autosaveEnabled ? (
                    <Save className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <SaveOff className="h-4 w-4" aria-hidden="true" />
                  )}
                  {t('header.autosave')}
                </DropdownMenuCheckboxItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {theme === 'dark' ? (
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    ) : theme === 'light' ? (
                      <Sun className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Monitor className="h-4 w-4" aria-hidden="true" />
                    )}
                    {t('header.theme')}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      <Sun className="h-4 w-4" aria-hidden="true" />
                      {t('header.themeLight')}
                      <DropdownMenuShortcut>{modKey}+⇧+D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      <Moon className="h-4 w-4" aria-hidden="true" />
                      {t('header.themeDark')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      <Monitor className="h-4 w-4" aria-hidden="true" />
                      {t('header.themeSystem')}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    {t('header.language')}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-80 overflow-y-auto">
                    {sortedLanguages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-current={i18n.language === lang.code ? 'true' : undefined}
                        className={i18n.language === lang.code ? 'bg-accent' : ''}
                      >
                        <span className="mr-2" aria-hidden="true">{lang.flag}</span>
                        {lang.nativeName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setHistoryPanelOpen(true)}
                  disabled={!isAvailable}
                >
                  <History className="h-4 w-4" aria-hidden="true" />
                  {t('header.history')}
                  {historyCount > 0 && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {historyCount > 9 ? '9+' : historyCount}
                    </Badge>
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onResetDialogOpenChange?.(true)}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {t('header.resetDefaults')}
                  <DropdownMenuShortcut>{modKey}+⇧+X</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onOpenShortcutsHelp}>
                  <Keyboard className="h-4 w-4" aria-hidden="true" />
                  {t('header.keyboardShortcuts')}
                  <DropdownMenuShortcut>{modKey}+/</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {GITHUB_URL && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('links.github')}
                >
                  <SiGithub className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t('importExport.importButton')}
        tabIndex={-1}
      />

      {/* Import confirmation dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
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
            <Button variant="outline" onClick={handleCancelImport}>
              {t('importExport.importConfirmCancel')}
            </Button>
            <Button onClick={handleApplyImport}>
              {t('importExport.importConfirmApply')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset confirmation dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={onResetDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('reset.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('reset.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('reset.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={resetConfig}>
              {t('reset.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* History panel */}
      <HistoryPanel open={historyPanelOpen} onOpenChange={setHistoryPanelOpen} />
    </>
  );
}
