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

import { useState, useCallback, type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { KeyboardShortcutsDialog } from '@/components/common';
import { useHistory } from '@/contexts';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper with header, content area, footer, and keyboard shortcuts.
 */
export function MainLayout({ children }: MainLayoutProps) {
  const [shortcutsHelpOpen, setShortcutsHelpOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const { undo, redo, canUndo, canRedo } = useHistory();

  const handleAnnounce = useCallback((message: string) => {
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(message));
  }, []);

  useKeyboardShortcuts({
    onOpenResetDialog: () => setResetDialogOpen(true),
    onOpenLanguageSwitcher: () => setLanguageSwitcherOpen(true),
    onOpenShortcutsHelp: () => setShortcutsHelpOpen(true),
    onAnnounce: handleAnnounce,
    onUndo: undo,
    onRedo: redo,
    canUndo,
    canRedo,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        resetDialogOpen={resetDialogOpen}
        onResetDialogOpenChange={setResetDialogOpen}
        languageSwitcherOpen={languageSwitcherOpen}
        onLanguageSwitcherOpenChange={setLanguageSwitcherOpen}
        onOpenShortcutsHelp={() => setShortcutsHelpOpen(true)}
      />
      <main className="flex-1 pb-14">
        {children}
      </main>
      <Footer />

      <KeyboardShortcutsDialog
        open={shortcutsHelpOpen}
        onOpenChange={setShortcutsHelpOpen}
      />

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </div>
  );
}
