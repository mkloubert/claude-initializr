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

import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/contexts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SoftwareItem } from './SoftwareItem';
import { DockerfilePreview } from '@/components/preview/DockerfilePreview';
import { Package, Eye, Wand2 } from 'lucide-react';
import { SiTypescript, SiPython, SiFfmpeg, SiNodedotjs } from 'react-icons/si';
import type { SoftwareConfig } from '@/types';

/**
 * Software metadata for rendering.
 */
const softwareMetadata: Array<{
  id: keyof SoftwareConfig;
  labelKey: string;
  descriptionKey: string;
  icon: ReactNode;
}> = [
    {
      id: 'typescript',
      labelKey: 'software.typescript',
      descriptionKey: 'software.typescriptDesc',
      icon: <SiTypescript className="h-5 w-5" aria-hidden="true" />,
    },
    {
      id: 'ffmpeg',
      labelKey: 'software.ffmpeg',
      descriptionKey: 'software.ffmpegDesc',
      icon: <SiFfmpeg className="h-5 w-5" aria-hidden="true" />,
    },
    {
      id: 'imagemagick',
      labelKey: 'software.imagemagick',
      descriptionKey: 'software.imagemagickDesc',
      icon: <Wand2 className="h-5 w-5" aria-hidden="true" />,
    },
    {
      id: 'python',
      labelKey: 'software.python',
      descriptionKey: 'software.pythonDesc',
      icon: <SiPython className="h-5 w-5" aria-hidden="true" />,
    },
  ];

/**
 * Card component for Dockerfile configuration with tabs for software selection and preview.
 */
export function DockerfileCard() {
  const { t } = useTranslation();
  const { config, setBaseImage, setNodeVersion, toggleSoftware, setSoftwareVersion } = useConfig();

  const sortedSoftwareMetadata = useMemo(
    () =>
      [...softwareMetadata].sort((a, b) =>
        t(a.labelKey).localeCompare(t(b.labelKey), undefined, {
          sensitivity: 'base',
        })
      ),
    [t]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preview.dockerfile')}</CardTitle>
        <CardDescription>{t('preview.dockerfileDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="software">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="software" className="gap-2">
              <Package className="h-4 w-4" aria-hidden="true" />
              <span>{t('tabs.software')}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{t('tabs.preview')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="software" className="mt-4">
            <div className="grid gap-3">
              {/* Base Image */}
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <SiNodedotjs className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="font-medium">{t('software.baseImage')}</span>
                    <span className="text-sm text-muted-foreground">
                      {t('software.baseImageDesc')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="base-image" className="sr-only">
                    {t('software.image')}
                  </Label>
                  <Input
                    id="base-image"
                    type="text"
                    value={config.baseImage}
                    onChange={(e) => setBaseImage(e.target.value)}
                    className="w-28 h-8"
                    aria-label={t('software.image')}
                  />
                  <span className="text-muted-foreground">:</span>
                  <Label htmlFor="node-version" className="sr-only">
                    {t('software.version')}
                  </Label>
                  <Input
                    id="node-version"
                    type="text"
                    value={config.nodeVersion}
                    onChange={(e) => setNodeVersion(e.target.value)}
                    className="w-20 h-8"
                    aria-label={t('software.version')}
                  />
                </div>
              </div>

              {/* Additional Software */}
              {sortedSoftwareMetadata.map((meta) => (
                <SoftwareItem
                  key={meta.id}
                  software={config.software[meta.id]}
                  labelKey={meta.labelKey}
                  descriptionKey={meta.descriptionKey}
                  icon={meta.icon}
                  onToggle={() => toggleSoftware(meta.id)}
                  onVersionChange={(version) =>
                    setSoftwareVersion(meta.id, version)
                  }
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <DockerfilePreview />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
