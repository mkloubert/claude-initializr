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

import { useMemo, useState, useCallback, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/contexts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Puzzle,
  Box,
  Network,
  Plus,
  X,
  Sparkles,
  FileCode2,
} from 'lucide-react';
import {
  extensionsBySoftware,
  featuresBySoftware,
  type ExtensionMetadata,
  type FeatureMetadata,
} from '@/config/devcontainer-extensions';
import type { SoftwareConfig } from '@/types';

/**
 * DevContainer editor with accordion-based progressive disclosure.
 * Enable/disable toggle and container name are always visible.
 * Extensions, features, ports, lifecycle scripts, and VS Code settings are in accordion items.
 */
export function DevContainerEditor() {
  const { t } = useTranslation();
  const {
    config,
    setDevContainerEnabled,
    setDevContainerName,
    addDevContainerExtension,
    removeDevContainerExtension,
    addDevContainerFeature,
    removeDevContainerFeature,
    addDevContainerPort,
    removeDevContainerPort,
    setDevContainerPostCreateScript,
    setDevContainerPostStartScript,
    setDevContainerPostAttachScript,
    addDevContainerSetting,
    removeDevContainerSetting,
  } = useConfig();

  const [activeScriptTab, setActiveScriptTab] = useState<'postCreate' | 'postStart' | 'postAttach'>('postCreate');
  const [extensionInput, setExtensionInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [portInput, setPortInput] = useState('');
  const [portError, setPortError] = useState('');
  const [settingKeyInput, setSettingKeyInput] = useState('');
  const [settingValueInput, setSettingValueInput] = useState('');

  const currentExtensionIds = useMemo(
    () => new Set(config.devContainer.extensions.map((e) => e.extensionId)),
    [config.devContainer.extensions]
  );

  const currentFeatureIds = useMemo(
    () => new Set(config.devContainer.features.map((f) => f.feature)),
    [config.devContainer.features]
  );

  const recommendedExtensions = useMemo(() => {
    const recommendations: ExtensionMetadata[] = [];
    for (const [softwareId, pkg] of Object.entries(config.software)) {
      if (pkg.enabled) {
        const exts = extensionsBySoftware[softwareId as keyof SoftwareConfig];
        for (const ext of exts) {
          if (!currentExtensionIds.has(ext.id) && !recommendations.some((r) => r.id === ext.id)) {
            recommendations.push(ext);
          }
        }
      }
    }
    return recommendations;
  }, [config.software, currentExtensionIds]);

  const recommendedFeatures = useMemo(() => {
    const recommendations: FeatureMetadata[] = [];
    for (const [softwareId, pkg] of Object.entries(config.software)) {
      if (pkg.enabled) {
        const feats = featuresBySoftware[softwareId as keyof SoftwareConfig];
        for (const feat of feats) {
          if (!currentFeatureIds.has(feat.id) && !recommendations.some((r) => r.id === feat.id)) {
            recommendations.push(feat);
          }
        }
      }
    }
    return recommendations;
  }, [config.software, currentFeatureIds]);

  const handleAddExtension = useCallback(() => {
    const trimmed = extensionInput.trim();
    if (trimmed && !currentExtensionIds.has(trimmed)) {
      addDevContainerExtension(trimmed);
      setExtensionInput('');
    }
  }, [extensionInput, currentExtensionIds, addDevContainerExtension]);

  const handleAddFeature = useCallback(() => {
    const trimmed = featureInput.trim();
    if (trimmed && !currentFeatureIds.has(trimmed)) {
      addDevContainerFeature(trimmed);
      setFeatureInput('');
    }
  }, [featureInput, currentFeatureIds, addDevContainerFeature]);

  const handleAddPort = useCallback(() => {
    const portNum = parseInt(portInput.trim(), 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      setPortError(t('devContainer.ports.invalid'));
      return;
    }
    const existingPorts = config.devContainer.forwardedPorts.map((p) => p.port);
    if (!existingPorts.includes(portNum)) {
      addDevContainerPort(portNum);
      setPortInput('');
      setPortError('');
    }
  }, [portInput, config.devContainer.forwardedPorts, addDevContainerPort, t]);

  const handleAddSetting = useCallback(() => {
    const key = settingKeyInput.trim();
    const value = settingValueInput.trim();
    if (key && value) {
      addDevContainerSetting(key, value);
      setSettingKeyInput('');
      setSettingValueInput('');
    }
  }, [settingKeyInput, settingValueInput, addDevContainerSetting]);

  const handleAddAllRecommendedExtensions = useCallback(() => {
    for (const ext of recommendedExtensions) {
      addDevContainerExtension(ext.id);
    }
  }, [recommendedExtensions, addDevContainerExtension]);

  const handleAddAllRecommendedFeatures = useCallback(() => {
    for (const feat of recommendedFeatures) {
      addDevContainerFeature(feat.id);
    }
  }, [recommendedFeatures, addDevContainerFeature]);

  return (
    <div className="space-y-6">
      {/* Enable toggle + description — always visible */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {t('devContainer.description')}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <Label htmlFor="devcontainer-toggle" className="text-sm">
            {t('devContainer.enable')}
          </Label>
          <Switch
            id="devcontainer-toggle"
            checked={config.devContainer.enabled}
            onCheckedChange={setDevContainerEnabled}
            aria-label={t('devContainer.enable')}
          />
        </div>
      </div>

      {config.devContainer.enabled && (
        <>
          {/* Container Name — always visible when enabled */}
          <div className="space-y-2">
            <Label htmlFor="devcontainer-name">{t('devContainer.name')}</Label>
            <Input
              id="devcontainer-name"
              type="text"
              value={config.devContainer.name}
              onChange={(e) => setDevContainerName(e.target.value)}
              placeholder={t('devContainer.namePlaceholder')}
              aria-describedby="devcontainer-name-desc"
            />
            <p id="devcontainer-name-desc" className="text-sm text-muted-foreground">
              {t('devContainer.nameDesc')}
            </p>
          </div>

          {/* Accordion sections */}
          <Accordion type="multiple" defaultValue={['extensions']}>
            {/* Extensions */}
            <AccordionItem value="extensions" className="border rounded-lg px-4">
              <AccordionTrigger className="min-h-[44px]">
                <span className="flex items-center gap-2">
                  <Puzzle className="h-4 w-4 text-purple-600" aria-hidden="true" />
                  {t('devContainer.extensionsSection')}
                  {config.devContainer.extensions.length > 0 && (
                    <Badge variant="secondary" className="font-normal">
                      {config.devContainer.extensions.length}
                    </Badge>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('devContainer.extensions.description')}
                  </p>

                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={extensionInput}
                      onChange={(e) => setExtensionInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddExtension();
                        }
                      }}
                      placeholder={t('devContainer.extensions.placeholder')}
                      className="flex-1"
                      aria-label={t('devContainer.extensions.placeholder')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddExtension}
                      aria-label={t('devContainer.extensions.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  {/* Recommended Extensions */}
                  {recommendedExtensions.length > 0 && (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-500" aria-hidden="true" />
                          <span className="font-medium text-sm">{t('devContainer.extensions.recommended')}</span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddAllRecommendedExtensions}
                        >
                          {t('devContainer.extensions.addRecommended')}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {t('devContainer.extensions.recommendedDesc')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recommendedExtensions.map((ext) => (
                          <Badge
                            key={ext.id}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => addDevContainerExtension(ext.id)}
                            title={ext.description}
                          >
                            <Plus className="h-3 w-3 mr-1" aria-hidden="true" />
                            {ext.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {recommendedExtensions.length === 0 && config.devContainer.extensions.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {t('devContainer.extensions.noRecommendations')}
                    </p>
                  )}

                  {config.devContainer.extensions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {config.devContainer.extensions.map((ext) => (
                        <Badge
                          key={ext.id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {ext.extensionId}
                          <button
                            type="button"
                            onClick={() => removeDevContainerExtension(ext.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('devContainer.extensions.remove', { extension: ext.extensionId })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Features */}
            <AccordionItem value="features" className="border rounded-lg px-4 mt-2">
              <AccordionTrigger className="min-h-[44px]">
                <span className="flex items-center gap-2">
                  <Box className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  {t('devContainer.featuresSection')}
                  {config.devContainer.features.length > 0 && (
                    <Badge variant="secondary" className="font-normal">
                      {config.devContainer.features.length}
                    </Badge>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('devContainer.features.description')}
                  </p>

                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      placeholder={t('devContainer.features.placeholder')}
                      className="flex-1"
                      aria-label={t('devContainer.features.placeholder')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddFeature}
                      aria-label={t('devContainer.features.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  {/* Recommended Features */}
                  {recommendedFeatures.length > 0 && (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-500" aria-hidden="true" />
                          <span className="font-medium text-sm">{t('devContainer.features.recommended')}</span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddAllRecommendedFeatures}
                        >
                          {t('devContainer.features.addRecommended')}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {t('devContainer.features.recommendedDesc')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recommendedFeatures.map((feat) => (
                          <Badge
                            key={feat.id}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => addDevContainerFeature(feat.id)}
                            title={feat.description}
                          >
                            <Plus className="h-3 w-3 mr-1" aria-hidden="true" />
                            {feat.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {recommendedFeatures.length === 0 && config.devContainer.features.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {t('devContainer.features.noRecommendations')}
                    </p>
                  )}

                  {config.devContainer.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {config.devContainer.features.map((feat) => (
                        <Badge
                          key={feat.id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          <code className="text-xs">{feat.feature}</code>
                          <button
                            type="button"
                            onClick={() => removeDevContainerFeature(feat.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('devContainer.features.remove', { feature: feat.feature })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Ports */}
            <AccordionItem value="ports" className="border rounded-lg px-4 mt-2">
              <AccordionTrigger className="min-h-[44px]">
                <span className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-green-600" aria-hidden="true" />
                  {t('devContainer.portsSection')}
                  {config.devContainer.forwardedPorts.length > 0 && (
                    <Badge variant="secondary" className="font-normal">
                      {config.devContainer.forwardedPorts.length}
                    </Badge>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('devContainer.ports.description')}
                  </p>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="65535"
                      value={portInput}
                      onChange={(e) => {
                        setPortInput(e.target.value);
                        setPortError('');
                      }}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPort();
                        }
                      }}
                      placeholder={t('devContainer.ports.placeholder')}
                      className="flex-1"
                      aria-label={t('devContainer.ports.placeholder')}
                      aria-invalid={!!portError}
                      aria-describedby={portError ? 'port-error' : undefined}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddPort}
                      aria-label={t('devContainer.ports.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  {portError && (
                    <p id="port-error" className="text-sm text-destructive">
                      {portError}
                    </p>
                  )}

                  {config.devContainer.forwardedPorts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {config.devContainer.forwardedPorts.map((port) => (
                        <Badge
                          key={port.id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          <Network className="h-3 w-3 mr-1" aria-hidden="true" />
                          {port.port}
                          <button
                            type="button"
                            onClick={() => removeDevContainerPort(port.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('devContainer.ports.remove', { port: port.port })}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Lifecycle Scripts — with internal tabs */}
            <AccordionItem value="scripts" className="border rounded-lg px-4 mt-2">
              <AccordionTrigger className="min-h-[44px]">
                <span className="flex items-center gap-2">
                  <FileCode2 className="h-4 w-4 text-amber-600" aria-hidden="true" />
                  {t('devContainer.scriptsSection')}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('devContainer.scripts.description')}
                  </p>

                  <Tabs
                    value={activeScriptTab}
                    onValueChange={(v) => setActiveScriptTab(v as 'postCreate' | 'postStart' | 'postAttach')}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="postCreate" className="text-xs sm:text-sm">
                        {t('devContainer.scripts.tabs.postCreate')}
                      </TabsTrigger>
                      <TabsTrigger value="postStart" className="text-xs sm:text-sm">
                        {t('devContainer.scripts.tabs.postStart')}
                      </TabsTrigger>
                      <TabsTrigger value="postAttach" className="text-xs sm:text-sm">
                        {t('devContainer.scripts.tabs.postAttach')}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="postCreate" className="mt-0">
                      <div className="grid gap-2">
                        <Label htmlFor="post-create-script">{t('devContainer.scripts.postCreateTitle')}</Label>
                        <p className="text-xs text-muted-foreground">
                          {t('devContainer.scripts.postCreateDesc')}
                        </p>
                        <Textarea
                          id="post-create-script"
                          value={config.devContainer.postCreateScript}
                          onChange={(e) => setDevContainerPostCreateScript(e.target.value)}
                          placeholder={t('devContainer.scripts.editorPlaceholder')}
                          className="font-mono text-sm min-h-[200px] resize-y"
                          aria-label={t('devContainer.scripts.postCreateTitle')}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="postStart" className="mt-0">
                      <div className="grid gap-2">
                        <Label htmlFor="post-start-script">{t('devContainer.scripts.postStartTitle')}</Label>
                        <p className="text-xs text-muted-foreground">
                          {t('devContainer.scripts.postStartDesc')}
                        </p>
                        <Textarea
                          id="post-start-script"
                          value={config.devContainer.postStartScript}
                          onChange={(e) => setDevContainerPostStartScript(e.target.value)}
                          placeholder={t('devContainer.scripts.editorPlaceholder')}
                          className="font-mono text-sm min-h-[200px] resize-y"
                          aria-label={t('devContainer.scripts.postStartTitle')}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="postAttach" className="mt-0">
                      <div className="grid gap-2">
                        <Label htmlFor="post-attach-script">{t('devContainer.scripts.postAttachTitle')}</Label>
                        <p className="text-xs text-muted-foreground">
                          {t('devContainer.scripts.postAttachDesc')}
                        </p>
                        <Textarea
                          id="post-attach-script"
                          value={config.devContainer.postAttachScript}
                          onChange={(e) => setDevContainerPostAttachScript(e.target.value)}
                          placeholder={t('devContainer.scripts.editorPlaceholder')}
                          className="font-mono text-sm min-h-[200px] resize-y"
                          aria-label={t('devContainer.scripts.postAttachTitle')}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* VS Code Settings */}
            <AccordionItem value="settings" className="border rounded-lg px-4 mt-2 last:border-b">
              <AccordionTrigger className="min-h-[44px]">
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  {t('devContainer.settingsSection')}
                  {config.devContainer.settings.length > 0 && (
                    <Badge variant="secondary" className="font-normal">
                      {config.devContainer.settings.length}
                    </Badge>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('devContainer.settings.description')}
                  </p>

                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={settingKeyInput}
                      onChange={(e) => setSettingKeyInput(e.target.value)}
                      placeholder={t('devContainer.settings.keyPlaceholder')}
                      className="flex-1"
                      aria-label={t('devContainer.settings.key')}
                    />
                    <Input
                      type="text"
                      value={settingValueInput}
                      onChange={(e) => setSettingValueInput(e.target.value)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSetting();
                        }
                      }}
                      placeholder={t('devContainer.settings.valuePlaceholder')}
                      className="flex-1"
                      aria-label={t('devContainer.settings.value')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddSetting}
                      aria-label={t('devContainer.settings.add')}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>

                  {config.devContainer.settings.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {config.devContainer.settings.map((setting) => (
                        <div
                          key={setting.id}
                          className="flex items-center gap-2 rounded-md bg-muted p-2"
                        >
                          <code className="flex-1 text-sm font-mono truncate">
                            {setting.key}: {setting.value}
                          </code>
                          <button
                            type="button"
                            onClick={() => removeDevContainerSetting(setting.id)}
                            className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label={t('devContainer.settings.remove')}
                          >
                            <X className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
}
