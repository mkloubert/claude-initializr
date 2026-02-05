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

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/contexts';
import { PERMISSIONS_DOCS_URL } from '@/config/env';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PermissionRuleRow } from './PermissionRuleRow';
import {
  Shield,
  Plus,
  CheckCircle,
  HelpCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import type { PermissionCategory } from '@/types';

/**
 * Settings.json editor with quick summary counts and tabbed permission categories.
 */
export function SettingsEditor() {
  const { t } = useTranslation();
  const {
    config,
    addPermissionRule,
    updatePermissionDirective,
    updatePermissionPattern,
    removePermissionRule,
  } = useConfig();

  const [activeTab, setActiveTab] = useState<PermissionCategory>('deny');

  const sortedAllowRules = useMemo(
    () =>
      [...config.claudePermissions.allow].sort((a, b) =>
        `${a.directive}${a.pattern}`.localeCompare(`${b.directive}${b.pattern}`, undefined, {
          sensitivity: 'base',
        })
      ),
    [config.claudePermissions.allow]
  );

  const sortedAskRules = useMemo(
    () =>
      [...config.claudePermissions.ask].sort((a, b) =>
        `${a.directive}${a.pattern}`.localeCompare(`${b.directive}${b.pattern}`, undefined, {
          sensitivity: 'base',
        })
      ),
    [config.claudePermissions.ask]
  );

  const sortedDenyRules = useMemo(
    () =>
      [...config.claudePermissions.deny].sort((a, b) =>
        `${a.directive}${a.pattern}`.localeCompare(`${b.directive}${b.pattern}`, undefined, {
          sensitivity: 'base',
        })
      ),
    [config.claudePermissions.deny]
  );

  const renderPermissionSection = (
    category: PermissionCategory,
    rules: typeof sortedAllowRules,
    emptyMessage: string
  ) => (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => addPermissionRule(category)}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>{t('settings.addRule')}</span>
        </Button>
      </div>
      {rules.length === 0 ? (
        <p className="py-2 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <PermissionRuleRow
              key={rule.id}
              rule={rule}
              onUpdateDirective={(directive) =>
                updatePermissionDirective(category, rule.id, directive)
              }
              onUpdatePattern={(pattern) =>
                updatePermissionPattern(category, rule.id, pattern)
              }
              onRemove={() => removePermissionRule(category, rule.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick summary with colored counts */}
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-red-600 dark:text-red-500">
          <XCircle className="h-4 w-4" aria-hidden="true" />
          {t('settings.denyCount', { count: config.claudePermissions.deny.length })}
        </span>
        <span className="text-muted-foreground" aria-hidden="true">&middot;</span>
        <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
          {t('settings.askCount', { count: config.claudePermissions.ask.length })}
        </span>
        <span className="text-muted-foreground" aria-hidden="true">&middot;</span>
        <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
          <CheckCircle className="h-4 w-4" aria-hidden="true" />
          {t('settings.allowCount', { count: config.claudePermissions.allow.length })}
        </span>
      </div>

      {/* Help text */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          {t('settings.help')}{' '}
          <a
            href={PERMISSIONS_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('settings.learnMore')}
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </AlertDescription>
      </Alert>

      {/* Tabbed permission categories */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PermissionCategory)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deny" className="gap-2">
            <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
            <span>{t('settings.deny')}</span>
            <span className="text-muted-foreground">({sortedDenyRules.length})</span>
          </TabsTrigger>
          <TabsTrigger value="ask" className="gap-2">
            <HelpCircle className="h-4 w-4 text-yellow-600" aria-hidden="true" />
            <span>{t('settings.ask')}</span>
            <span className="text-muted-foreground">({sortedAskRules.length})</span>
          </TabsTrigger>
          <TabsTrigger value="allow" className="gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
            <span>{t('settings.allow')}</span>
            <span className="text-muted-foreground">({sortedAllowRules.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deny" className="mt-4">
          {renderPermissionSection('deny', sortedDenyRules, t('settings.noDenyRules'))}
        </TabsContent>

        <TabsContent value="ask" className="mt-4">
          {renderPermissionSection('ask', sortedAskRules, t('settings.noAskRules'))}
        </TabsContent>

        <TabsContent value="allow" className="mt-4">
          {renderPermissionSection('allow', sortedAllowRules, t('settings.noAllowRules'))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
