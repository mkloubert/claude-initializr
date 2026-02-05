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

import { lazy, Suspense } from 'react';
import { SidebarLayout, EditorPreviewSplitPane } from '@/components/layout';
import {
  DockerfileEditor,
  DockerComposeEditor,
} from '@/components/config';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { SectionId } from '@/hooks/useActiveSection';

// Lazy load heavy components to reduce initial bundle size
const ClaudeMdEditor = lazy(() =>
  import('@/components/config/ClaudeMdEditor').then((m) => ({ default: m.ClaudeMdEditor }))
);

const SettingsEditor = lazy(() =>
  import('@/components/config/SettingsEditor').then((m) => ({ default: m.SettingsEditor }))
);

const DevContainerEditor = lazy(() =>
  import('@/components/config/DevContainerEditor').then((m) => ({ default: m.DevContainerEditor }))
);

function LoadingFallback() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

function SectionContent({ activeSection }: { activeSection: SectionId }) {
  switch (activeSection) {
    case 'dockerfile':
      return <DockerfileEditor />;
    case 'docker-compose':
      return <DockerComposeEditor />;
    case 'claude-md':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ClaudeMdEditor />
        </Suspense>
      );
    case 'settings':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <SettingsEditor />
        </Suspense>
      );
    case 'devcontainer':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <DevContainerEditor />
        </Suspense>
      );
  }
}

/**
 * Home page with sidebar navigation, editor content, and live preview split pane.
 */
export default function Home() {
  return (
    <SidebarLayout>
      {(activeSection, togglePreviewRef) => (
        <EditorPreviewSplitPane activeSection={activeSection} togglePreviewRef={togglePreviewRef}>
          <SectionContent activeSection={activeSection} />
        </EditorPreviewSplitPane>
      )}
    </SidebarLayout>
  );
}
