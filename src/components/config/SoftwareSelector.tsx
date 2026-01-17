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
import { useConfig } from '@/contexts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SoftwareItem } from './SoftwareItem';
import type { SoftwareConfig } from '@/types';

/**
 * Software metadata for rendering.
 */
const softwareMetadata: Array<{
  id: keyof SoftwareConfig;
  labelKey: string;
  descriptionKey: string;
}> = [
    {
      id: 'typescript',
      labelKey: 'software.typescript',
      descriptionKey: 'software.typescriptDesc',
    },
    {
      id: 'ffmpeg',
      labelKey: 'software.ffmpeg',
      descriptionKey: 'software.ffmpegDesc',
    },
    {
      id: 'imagemagick',
      labelKey: 'software.imagemagick',
      descriptionKey: 'software.imagemagickDesc',
    },
    {
      id: 'python',
      labelKey: 'software.python',
      descriptionKey: 'software.pythonDesc',
    },
  ];

/**
 * Software selection panel with checkboxes and version inputs.
 */
export function SoftwareSelector() {
  const { t } = useTranslation();
  const { config, toggleSoftware, setSoftwareVersion } = useConfig();

  const sortedSoftwareMetadata = useMemo(
    () =>
      [...softwareMetadata].sort((a, b) =>
        t(a.labelKey).localeCompare(t(b.labelKey), undefined, { sensitivity: 'base' })
      ),
    [t]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('software.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {sortedSoftwareMetadata.map((meta) => (
            <SoftwareItem
              key={meta.id}
              software={config.software[meta.id]}
              labelKey={meta.labelKey}
              descriptionKey={meta.descriptionKey}
              onToggle={() => toggleSoftware(meta.id)}
              onVersionChange={(version) => setSoftwareVersion(meta.id, version)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
