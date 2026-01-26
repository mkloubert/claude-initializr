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

import { useMemo, useState, useEffect, useCallback, lazy, Suspense, type ReactNode, type KeyboardEvent } from 'react';
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
import { SiTypescript, SiPython, SiFfmpeg, SiNodedotjs, SiNpm, SiGo, SiFlutter, SiRust } from 'react-icons/si';
import { TbBrandPython } from 'react-icons/tb';
import type { DockerfileUser, SoftwareConfig } from '@/types';

/**
 * Software metadata for rendering.
 */
const softwareMetadata: Record<string, {
  id: keyof SoftwareConfig;
  labelKey: string;
  descriptionKey: string;
  icon: ReactNode;
}> = {
  typescript: {
    id: 'typescript',
    labelKey: 'software.typescript',
    descriptionKey: 'software.typescriptDesc',
    icon: <SiTypescript className="h-5 w-5" aria-hidden="true" />,
  },
  ffmpeg: {
    id: 'ffmpeg',
    labelKey: 'software.ffmpeg',
    descriptionKey: 'software.ffmpegDesc',
    icon: <SiFfmpeg className="h-5 w-5" aria-hidden="true" />,
  },
  imagemagick: {
    id: 'imagemagick',
    labelKey: 'software.imagemagick',
    descriptionKey: 'software.imagemagickDesc',
    icon: <Wand2 className="h-5 w-5" aria-hidden="true" />,
  },
  python: {
    id: 'python',
    labelKey: 'software.python',
    descriptionKey: 'software.pythonDesc',
    icon: <SiPython className="h-5 w-5" aria-hidden="true" />,
  },
  uv: {
    id: 'uv',
    labelKey: 'software.uv',
    descriptionKey: 'software.uvDesc',
    icon: <TbBrandPython className="h-5 w-5" aria-hidden="true" />,
  },
  golang: {
    id: 'golang',
    labelKey: 'software.golang',
    descriptionKey: 'software.golangDesc',
    icon: <SiGo className="h-5 w-5" aria-hidden="true" />,
  },
  flutter: {
    id: 'flutter',
    labelKey: 'software.flutter',
    descriptionKey: 'software.flutterDesc',
    icon: <SiFlutter className="h-5 w-5" aria-hidden="true" />,
  },
  rust: {
    id: 'rust',
    labelKey: 'software.rust',
    descriptionKey: 'software.rustDesc',
    icon: <SiRust className="h-5 w-5" aria-hidden="true" />,
  },
};

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
    addCustomAptPackages,
    removeCustomAptPackage,
    addCustomNpmPackages,
    removeCustomNpmPackage,
    updateCustomNpmPackageUser,
    addCustomRunCommand,
    removeCustomRunCommand,
    updateCustomRunCommandUser,
  } = useConfig();
  const [activeTab, setActiveTab] = useState('software');
  const [aptInput, setAptInput] = useState('');
  const [npmInput, setNpmInput] = useState('');
  const [npmInstallAs, setNpmInstallAs] = useState<DockerfileUser>('node');
  const [runCommandInput, setRunCommandInput] = useState('');
  const [runCommandAs, setRunCommandAs] = useState<DockerfileUser>('node');

  const handleTogglePreview = useCallback(() => {
    setActiveTab((prev) => (prev === 'preview' ? 'software' : 'preview'));
  }, []);

  useEffect(() => {
    window.addEventListener('toggle-preview', handleTogglePreview);
    return () => window.removeEventListener('toggle-preview', handleTogglePreview);
  }, [handleTogglePreview]);

  const sortedSoftwareMetadata = useMemo(
    () =>
      Object.values(softwareMetadata).sort((a, b) =>
        t(a.labelKey).localeCompare(t(b.labelKey), undefined, {
          sensitivity: 'base',
        })
      ),
    [t]
  );

  return (
    <Card id="card-dockerfile">
      <CardHeader>
        <CardTitle>{t('preview.dockerfile')}</CardTitle>
        <CardDescription>{t('preview.dockerfileDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
              {sortedSoftwareMetadata.map((meta) => {
                const software = config.software[meta.id];
                const missingRecommendations = software.recommends?.filter(
                  (recId) => !config.software[recId as keyof typeof config.software]?.enabled
                ) ?? [];

                return (
                  <SoftwareItem
                    key={meta.id}
                    software={software}
                    labelKey={meta.labelKey}
                    descriptionKey={meta.descriptionKey}
                    icon={meta.icon}
                    onToggle={() => toggleSoftware(meta.id)}
                    missingRecommendations={missingRecommendations}
                    softwareLabels={Object.fromEntries(
                      Object.entries(softwareMetadata).map(([id, m]) => [id, t(m.labelKey)])
                    )}
                  />
                );
              })}

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
                      onValueChange={(value: DockerfileUser) => setNpmInstallAs(value)}
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

              {/* Custom RUN Commands */}
              <div className="rounded-lg border p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-amber-600" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="font-medium">{t('runCommands.title')}</span>
                      <span className="text-sm text-muted-foreground">
                        {t('runCommands.description')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Label htmlFor="run-command" className="sr-only">
                      {t('runCommands.placeholder')}
                    </Label>
                    <Input
                      id="run-command"
                      type="text"
                      value={runCommandInput}
                      onChange={(e) => setRunCommandInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && runCommandInput.trim()) {
                          e.preventDefault();
                          addCustomRunCommand(runCommandInput, runCommandAs);
                          setRunCommandInput('');
                        }
                      }}
                      placeholder={t('runCommands.placeholder')}
                      className="flex-1"
                      aria-label={t('runCommands.placeholder')}
                    />
                    <Select
                      value={runCommandAs}
                      onValueChange={(value: DockerfileUser) => setRunCommandAs(value)}
                    >
                      <SelectTrigger className="w-24" aria-label={t('runCommands.runAs')}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="node">{t('runCommands.userNode')}</SelectItem>
                        <SelectItem value="root">{t('runCommands.userRoot')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (runCommandInput.trim()) {
                          addCustomRunCommand(runCommandInput, runCommandAs);
                          setRunCommandInput('');
                        }
                      }}
                      aria-label={t('runCommands.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                  {config.customRunCommands.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {config.customRunCommands.map((cmd) => (
                        <div
                          key={cmd.id}
                          className="flex items-center gap-2 rounded-md bg-muted p-2"
                        >
                          <code className="flex-1 text-sm font-mono truncate" title={cmd.command}>
                            {cmd.command}
                          </code>
                          <button
                            type="button"
                            onClick={() => updateCustomRunCommandUser(
                              cmd.id,
                              cmd.runAs === 'node' ? 'root' : 'node'
                            )}
                            className="rounded px-2 py-0.5 text-xs font-normal bg-background hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('runCommands.toggleUser', { command: cmd.command })}
                            title={t('runCommands.runAs') + ': ' + t(`runCommands.user${cmd.runAs === 'node' ? 'Node' : 'Root'}`)}
                          >
                            <Terminal className="h-3 w-3 inline mr-0.5" aria-hidden="true" />
                            {cmd.runAs}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCustomRunCommand(cmd.id)}
                            className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('runCommands.remove', { command: cmd.command })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
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
