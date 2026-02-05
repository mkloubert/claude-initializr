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
import { useTranslation } from 'react-i18next';
import { FileCode, Loader2 } from 'lucide-react';
import type { SectionId } from '@/hooks/useActiveSection';

const DockerfilePreview = lazy(() =>
  import('@/components/preview/DockerfilePreview').then((m) => ({ default: m.DockerfilePreview }))
);

const DockerComposePreview = lazy(() =>
  import('@/components/preview/DockerComposePreview').then((m) => ({ default: m.DockerComposePreview }))
);

const SettingsJsonPreview = lazy(() =>
  import('@/components/preview/SettingsJsonPreview').then((m) => ({ default: m.SettingsJsonPreview }))
);

const DevContainerPreview = lazy(() =>
  import('@/components/preview/DevContainerPreview').then((m) => ({ default: m.DevContainerPreview }))
);

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

const SECTION_LABELS: Record<SectionId, string> = {
  'dockerfile': 'preview.dockerfile',
  'docker-compose': 'preview.dockerCompose',
  'claude-md': 'CLAUDE.md',
  'settings': 'preview.settingsJson',
  'devcontainer': 'preview.devContainer',
};

interface PreviewPaneProps {
  activeSection: SectionId;
}

/**
 * Preview pane that renders the generated file preview for the active section.
 */
export function PreviewPane({ activeSection }: PreviewPaneProps) {
  const { t } = useTranslation();

  const labelKey = SECTION_LABELS[activeSection];
  const label = labelKey.startsWith('preview.') ? t(labelKey) : labelKey;

  return (
    <div
      className="flex h-full flex-col"
      role="region"
      aria-label={`${t('preview.title')}: ${label}`}
    >
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <FileCode className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <h2 className="text-sm font-medium">{label}</h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <Suspense fallback={<LoadingFallback />}>
          <PreviewContent activeSection={activeSection} />
        </Suspense>
      </div>
    </div>
  );
}

function PreviewContent({ activeSection }: { activeSection: SectionId }) {
  const { t } = useTranslation();

  switch (activeSection) {
    case 'dockerfile':
      return <DockerfilePreview />;
    case 'docker-compose':
      return <DockerComposePreview />;
    case 'claude-md':
      return (
        <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
          {t('preview.claudeMdIntegrated')}
        </div>
      );
    case 'settings':
      return <SettingsJsonPreview />;
    case 'devcontainer':
      return <DevContainerPreview />;
  }
}
