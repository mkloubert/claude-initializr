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

import { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { useConfig, useTheme } from '@/contexts';
import { downloadZipFile, type ReadmeLanguageConfig } from '@/services';

export type ShortcutCategory = 'navigation' | 'actions';

export interface ShortcutDefinition {
  keys: string[];
  labelKey: string;
  category: ShortcutCategory;
}

const CARD_IDS = [
  'card-dockerfile',
  'card-docker-compose',
  'card-claude-md',
  'card-settings-json',
] as const;

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

export function isMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

export function getModifierKey(): string {
  return isMac() ? '⌘' : 'Ctrl';
}

export const SHORTCUT_DEFINITIONS: ShortcutDefinition[] = [
  { keys: ['mod', 'S'], labelKey: 'keyboardShortcuts.shortcuts.downloadZip', category: 'actions' },
  { keys: ['mod', 'Shift', 'X'], labelKey: 'keyboardShortcuts.shortcuts.resetDefaults', category: 'actions' },
  { keys: ['mod', 'E'], labelKey: 'keyboardShortcuts.shortcuts.togglePreview', category: 'actions' },
  { keys: ['mod', 'Shift', 'D'], labelKey: 'keyboardShortcuts.shortcuts.toggleDarkMode', category: 'actions' },
  { keys: ['mod', 'Shift', 'L'], labelKey: 'keyboardShortcuts.shortcuts.openLanguageSwitcher', category: 'actions' },
  { keys: ['mod', '1'], labelKey: 'keyboardShortcuts.shortcuts.scrollToCard', category: 'navigation' },
  { keys: ['mod', '2'], labelKey: 'keyboardShortcuts.shortcuts.scrollToCard', category: 'navigation' },
  { keys: ['mod', '3'], labelKey: 'keyboardShortcuts.shortcuts.scrollToCard', category: 'navigation' },
  { keys: ['mod', '4'], labelKey: 'keyboardShortcuts.shortcuts.scrollToCard', category: 'navigation' },
  { keys: ['mod', '/'], labelKey: 'keyboardShortcuts.shortcuts.openShortcutsHelp', category: 'actions' },
  { keys: ['Escape'], labelKey: 'keyboardShortcuts.shortcuts.closeDialog', category: 'navigation' },
];

export interface UseKeyboardShortcutsOptions {
  onOpenResetDialog: () => void;
  onOpenLanguageSwitcher: () => void;
  onOpenShortcutsHelp: () => void;
  onAnnounce: (message: string) => void;
}

export function useKeyboardShortcuts({
  onOpenResetDialog,
  onOpenLanguageSwitcher,
  onOpenShortcutsHelp,
  onAnnounce,
}: UseKeyboardShortcutsOptions) {
  const { config } = useConfig();
  const { t, i18n } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  const hotkeyOptions = { preventDefault: true, enableOnFormTags: true as const };

  const handleDownload = useCallback(async () => {
    const currentLanguage = i18n.language;
    const readmeConfig: ReadmeLanguageConfig = {
      language: currentLanguage,
      languageName: languageNames[currentLanguage] || currentLanguage,
      t,
      tEnglish: i18n.getFixedT('en'),
      initializerUrl: window.location.origin + window.location.pathname,
    };
    await downloadZipFile(config, t('download.filename'), readmeConfig);
    onAnnounce(t('keyboardShortcuts.announced.downloadStarted'));
  }, [config, t, i18n, onAnnounce]);

  const scrollToCard = useCallback((index: number) => {
    const cardId = CARD_IDS[index];
    if (cardId) {
      const element = document.getElementById(cardId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onAnnounce(t('keyboardShortcuts.announced.scrolledToCard', { number: index + 1 }));
    }
  }, [t, onAnnounce]);

  const togglePreview = useCallback(() => {
    window.dispatchEvent(new CustomEvent('toggle-preview'));
    onAnnounce(t('keyboardShortcuts.announced.previewToggled'));
  }, [t, onAnnounce]);

  const toggleDarkMode = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    onAnnounce(t('keyboardShortcuts.announced.darkModeToggled'));
  }, [resolvedTheme, setTheme, t, onAnnounce]);

  // Ctrl/Cmd + S — Download ZIP
  useHotkeys('mod+s', () => { handleDownload(); }, hotkeyOptions);

  // Ctrl/Cmd + Shift + X — Reset to defaults
  useHotkeys('mod+shift+x', () => {
    onOpenResetDialog();
    onAnnounce(t('keyboardShortcuts.announced.configReset'));
  }, hotkeyOptions);

  // Ctrl/Cmd + E — Toggle preview
  useHotkeys('mod+e', togglePreview, hotkeyOptions);

  // Ctrl/Cmd + Shift + D — Toggle dark mode
  useHotkeys('mod+shift+d', toggleDarkMode, hotkeyOptions);

  // Ctrl/Cmd + Shift + L — Open language switcher
  useHotkeys('mod+shift+l', () => { onOpenLanguageSwitcher(); }, hotkeyOptions);

  // Ctrl/Cmd + 1-4 — Scroll to card
  useHotkeys('mod+1', () => scrollToCard(0), hotkeyOptions);
  useHotkeys('mod+2', () => scrollToCard(1), hotkeyOptions);
  useHotkeys('mod+3', () => scrollToCard(2), hotkeyOptions);
  useHotkeys('mod+4', () => scrollToCard(3), hotkeyOptions);

  // Ctrl/Cmd + / — Open shortcuts help
  useHotkeys('mod+/', () => { onOpenShortcutsHelp(); }, hotkeyOptions);
}
