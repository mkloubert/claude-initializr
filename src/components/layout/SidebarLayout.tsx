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

import { useState, useCallback, useMemo, useRef, type ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { KeyboardShortcutsDialog } from '@/components/common';
import { WelcomeDialog } from '@/components/common/WelcomeDialog';
import { shouldShowWelcome } from '@/components/common/welcomeUtils';
import { useHistory } from '@/contexts';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useActiveSection } from '@/hooks/useActiveSection';

import type { SectionId } from '@/hooks/useActiveSection';

const DESKTOP_BREAKPOINT = 1024;

interface SidebarLayoutProps {
  children: (activeSection: SectionId, togglePreviewRef: React.MutableRefObject<(() => void) | null>) => ReactNode;
}

function getInitialSidebarOpen(): boolean {
  try {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  } catch {
    return true;
  }
}

/**
 * Layout with sidebar navigation, header, content area, and footer.
 */
export function SidebarLayout({ children }: SidebarLayoutProps) {
  const initialSidebarOpen = useMemo(() => getInitialSidebarOpen(), []);
  const [shortcutsHelpOpen, setShortcutsHelpOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(shouldShowWelcome);
  const [announcement, setAnnouncement] = useState('');
  const togglePreviewRef = useRef<(() => void) | null>(null);

  const { activeSection, setActiveSection } = useActiveSection();
  const { undo, redo, canUndo, canRedo } = useHistory();

  const handleAnnounce = useCallback((message: string) => {
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(message));
  }, []);

  const handleTogglePreview = useCallback(() => {
    togglePreviewRef.current?.();
  }, []);

  useKeyboardShortcuts({
    onOpenResetDialog: () => setResetDialogOpen(true),
    onOpenLanguageSwitcher: () => { /* Language is now in the Settings dropdown submenu */ },
    onOpenShortcutsHelp: () => setShortcutsHelpOpen(true),
    onSwitchSection: setActiveSection,
    onTogglePreview: handleTogglePreview,
    onAnnounce: handleAnnounce,
    onUndo: undo,
    onRedo: redo,
    canUndo,
    canRedo,
  });

  return (
    <SidebarProvider defaultOpen={initialSidebarOpen}>
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onOpenAbout={() => setWelcomeOpen(true)}
      />
      <SidebarInset>
        <Header
          resetDialogOpen={resetDialogOpen}
          onResetDialogOpenChange={setResetDialogOpen}
          onOpenShortcutsHelp={() => setShortcutsHelpOpen(true)}
        />
        <main className="flex-1 overflow-hidden">
          {children(activeSection, togglePreviewRef)}
        </main>

        <KeyboardShortcutsDialog
          open={shortcutsHelpOpen}
          onOpenChange={setShortcutsHelpOpen}
        />

        <WelcomeDialog open={welcomeOpen} onOpenChange={setWelcomeOpen} />

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
