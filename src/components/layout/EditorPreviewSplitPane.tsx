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

import { useState, useCallback, useEffect, type ReactNode, type MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import { usePanelRef, useDefaultLayout } from 'react-resizable-panels';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { PreviewPane } from './PreviewPane';
import type { SectionId } from '@/hooks/useActiveSection';

const EDITOR_PANEL_ID = 'editor';
const PREVIEW_PANEL_ID = 'preview';

interface EditorPreviewSplitPaneProps {
  activeSection: SectionId;
  children: ReactNode;
  togglePreviewRef?: MutableRefObject<(() => void) | null>;
}

/**
 * Resizable split pane with editor content on the left and live preview on the right.
 * On mobile, the preview is shown in a bottom Sheet instead.
 */
export function EditorPreviewSplitPane({
  activeSection,
  children,
  togglePreviewRef,
}: EditorPreviewSplitPaneProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const previewPanelRef = usePanelRef();

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'claude-initializr-split',
    storage: localStorage,
  });

  const togglePreview = useCallback(() => {
    if (isMobile) {
      setMobilePreviewOpen((prev) => !prev);
      return;
    }

    const panel = previewPanelRef.current;
    if (!panel) return;

    if (panel.isCollapsed()) {
      panel.expand();
    } else {
      panel.collapse();
    }
  }, [isMobile, previewPanelRef]);

  useEffect(() => {
    if (togglePreviewRef) {
      togglePreviewRef.current = togglePreview;
    }
    return () => {
      if (togglePreviewRef) {
        togglePreviewRef.current = null;
      }
    };
  }, [togglePreview, togglePreviewRef]);

  // CLAUDE.md has integrated preview, no need for split pane
  const hasPreview = activeSection !== 'claude-md';

  if (isMobile) {
    return (
      <>
        <div className="flex-1 overflow-auto p-4">{children}</div>
        {hasPreview && (
          <>
            <div className="fixed bottom-4 end-4 z-40">
              <Button
                onClick={() => setMobilePreviewOpen(true)}
                size="sm"
                className="gap-2 shadow-lg"
                aria-label={t('preview.showPreview')}
              >
                <Eye className="h-4 w-4" aria-hidden="true" />
                <span>{t('preview.showPreview')}</span>
              </Button>
            </div>
            <Sheet open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
              <SheetContent side="bottom" className="h-[70vh]">
                <SheetHeader>
                  <SheetTitle>{t('preview.title')}</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-hidden">
                  <PreviewPane activeSection={activeSection} />
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </>
    );
  }

  // No split pane needed for sections with integrated preview
  if (!hasPreview) {
    return (
      <div className="h-full overflow-auto p-4">
        {children}
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
      className="h-full"
    >
      <ResizablePanel
        id={EDITOR_PANEL_ID}
        defaultSize="60%"
        minSize="30%"
      >
        <div className="h-full overflow-auto p-4">
          {children}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        id={PREVIEW_PANEL_ID}
        panelRef={previewPanelRef}
        defaultSize="40%"
        minSize="20%"
        collapsible
        collapsedSize={0}
      >
        <PreviewPane activeSection={activeSection} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
