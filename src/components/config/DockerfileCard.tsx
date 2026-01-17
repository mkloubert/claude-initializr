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

import { useMemo, useState, lazy, Suspense, type ReactNode, type KeyboardEvent } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SoftwareItem } from './SoftwareItem';
import { Package, Eye, Wand2, Loader2, Plus, X, Terminal } from 'lucide-react';

// Lazy load the preview component to reduce initial bundle size
const DockerfilePreview = lazy(() =>
  import('@/components/preview/DockerfilePreview').then((m) => ({ default: m.DockerfilePreview }))
);
import { SiTypescript, SiPython, SiFfmpeg, SiNodedotjs, SiNpm } from 'react-icons/si';
import type { NpmInstallUser, SoftwareConfig } from '@/types';

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
  const {
    config,
    setBaseImage,
    setNodeVersion,
    toggleSoftware,
    setSoftwareVersion,
    addCustomAptPackages,
    removeCustomAptPackage,
    addCustomNpmPackages,
    removeCustomNpmPackage,
    updateCustomNpmPackageUser,
  } = useConfig();
  const [aptInput, setAptInput] = useState('');
  const [npmInput, setNpmInput] = useState('');
  const [npmInstallAs, setNpmInstallAs] = useState<NpmInstallUser>('node');

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

              {/* Custom APT Packages */}
              <div className="rounded-lg border p-3 mt-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{t('aptPackages.title')}</span>
                      <span className="text-sm text-muted-foreground">
                        {t('aptPackages.description')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Label htmlFor="apt-packages" className="sr-only">
                      {t('aptPackages.placeholder')}
                    </Label>
                    <Input
                      id="apt-packages"
                      type="text"
                      value={aptInput}
                      onChange={(e) => setAptInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && aptInput.trim()) {
                          e.preventDefault();
                          addCustomAptPackages(aptInput);
                          setAptInput('');
                        }
                      }}
                      placeholder={t('aptPackages.placeholder')}
                      className="flex-1"
                      aria-label={t('aptPackages.placeholder')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (aptInput.trim()) {
                          addCustomAptPackages(aptInput);
                          setAptInput('');
                        }
                      }}
                      aria-label={t('aptPackages.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                  {config.customAptPackages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {config.customAptPackages.map((pkg) => (
                        <Badge
                          key={pkg}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {pkg}
                          <button
                            type="button"
                            onClick={() => removeCustomAptPackage(pkg)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('aptPackages.remove', { package: pkg })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom NPM Packages */}
              <div className="rounded-lg border p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <SiNpm className="h-5 w-5 text-red-600" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{t('npmPackages.title')}</span>
                      <span className="text-sm text-muted-foreground">
                        {t('npmPackages.description')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Label htmlFor="npm-packages" className="sr-only">
                      {t('npmPackages.placeholder')}
                    </Label>
                    <Input
                      id="npm-packages"
                      type="text"
                      value={npmInput}
                      onChange={(e) => setNpmInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && npmInput.trim()) {
                          e.preventDefault();
                          addCustomNpmPackages(npmInput, npmInstallAs);
                          setNpmInput('');
                        }
                      }}
                      placeholder={t('npmPackages.placeholder')}
                      className="flex-1"
                      aria-label={t('npmPackages.placeholder')}
                    />
                    <Select
                      value={npmInstallAs}
                      onValueChange={(value: NpmInstallUser) => setNpmInstallAs(value)}
                    >
                      <SelectTrigger className="w-24" aria-label={t('npmPackages.installAs')}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="node">{t('npmPackages.userNode')}</SelectItem>
                        <SelectItem value="root">{t('npmPackages.userRoot')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (npmInput.trim()) {
                          addCustomNpmPackages(npmInput, npmInstallAs);
                          setNpmInput('');
                        }
                      }}
                      aria-label={t('npmPackages.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                  {config.customNpmPackages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {config.customNpmPackages.map((pkg) => (
                        <Badge
                          key={pkg.id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          <span className="flex items-center gap-1">
                            {pkg.name}
                            <button
                              type="button"
                              onClick={() => updateCustomNpmPackageUser(
                                pkg.id,
                                pkg.installAs === 'node' ? 'root' : 'node'
                              )}
                              className="ml-1 rounded px-1 text-xs font-normal bg-muted hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                              aria-label={t('npmPackages.toggleUser', { package: pkg.name })}
                              title={t('npmPackages.installAs') + ': ' + t(`npmPackages.user${pkg.installAs === 'node' ? 'Node' : 'Root'}`)}
                            >
                              <Terminal className="h-3 w-3 inline mr-0.5" aria-hidden="true" />
                              {pkg.installAs}
                            </button>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeCustomNpmPackage(pkg.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('npmPackages.remove', { package: pkg.name })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <DockerfilePreview />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
