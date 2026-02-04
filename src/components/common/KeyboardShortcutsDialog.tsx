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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import {
  getModifierKey,
  isMac,
  type ShortcutCategory,
} from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DisplayShortcut {
  keys: string[];
  label: string;
  category: ShortcutCategory;
}

function getDisplayKey(key: string): string {
  const mac = isMac();
  switch (key) {
    case 'mod':
      return getModifierKey();
    case 'Shift':
      return mac ? '⇧' : 'Shift';
    case 'Escape':
      return 'Esc';
    default:
      return key;
  }
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const { t } = useTranslation();

  const shortcuts = useMemo((): DisplayShortcut[] => [
    { keys: ['mod', 'S'], label: t('keyboardShortcuts.shortcuts.downloadZip'), category: 'actions' },
    { keys: ['mod', 'Z'], label: t('keyboardShortcuts.shortcuts.undo'), category: 'actions' },
    { keys: ['mod', 'Y'], label: t('keyboardShortcuts.shortcuts.redo'), category: 'actions' },
    { keys: ['mod', 'Shift', 'X'], label: t('keyboardShortcuts.shortcuts.resetDefaults'), category: 'actions' },
    { keys: ['mod', 'E'], label: t('keyboardShortcuts.shortcuts.togglePreview'), category: 'actions' },
    { keys: ['mod', 'Shift', 'D'], label: t('keyboardShortcuts.shortcuts.toggleDarkMode'), category: 'actions' },
    { keys: ['mod', 'Shift', 'L'], label: t('keyboardShortcuts.shortcuts.openLanguageSwitcher'), category: 'actions' },
    { keys: ['mod', '1-5'], label: t('keyboardShortcuts.shortcuts.scrollToCard', { number: '1-5' }), category: 'navigation' },
    { keys: ['mod', '/'], label: t('keyboardShortcuts.shortcuts.openShortcutsHelp'), category: 'actions' },
    { keys: ['Escape'], label: t('keyboardShortcuts.shortcuts.closeDialog'), category: 'navigation' },
  ], [t]);

  const navigationShortcuts = useMemo(
    () => shortcuts.filter((s) => s.category === 'navigation'),
    [shortcuts]
  );

  const actionShortcuts = useMemo(
    () => shortcuts.filter((s) => s.category === 'actions'),
    [shortcuts]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('keyboardShortcuts.title')}</DialogTitle>
          <DialogDescription>
            {t('keyboardShortcuts.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <ShortcutGroup
            title={t('keyboardShortcuts.categories.actions')}
            shortcuts={actionShortcuts}
          />
          <ShortcutGroup
            title={t('keyboardShortcuts.categories.navigation')}
            shortcuts={navigationShortcuts}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutGroup({ title, shortcuts }: { title: string; shortcuts: DisplayShortcut[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="space-y-1">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.label}
            className="flex items-center justify-between rounded-md px-2 py-1.5"
          >
            <span className="text-sm">{shortcut.label}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, index) => (
                <span key={index} className="flex items-center gap-1">
                  {index > 0 && <span className="text-xs text-muted-foreground">+</span>}
                  <Kbd>{getDisplayKey(key)}</Kbd>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
