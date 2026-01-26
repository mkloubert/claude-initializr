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

import { useMemo, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/contexts';
import { PERMISSIONS_DOCS_URL } from '@/config/env';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PermissionRuleRow } from './PermissionRuleRow';
import {
  Shield,
  Eye,
  Plus,
  Loader2,
  CheckCircle,
  HelpCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import type { PermissionCategory } from '@/types';

// Lazy load the preview component to reduce initial bundle size
const SettingsJsonPreview = lazy(() =>
  import('@/components/preview/SettingsJsonPreview').then((m) => ({
    default: m.SettingsJsonPreview,
  }))
);

/**
 * Card component for settings.json configuration with tabs for permissions and preview.
 */
export function SettingsJsonCard() {
  const { t } = useTranslation();
  const {
    config,
    addPermissionRule,
    updatePermissionDirective,
    updatePermissionPattern,
    removePermissionRule,
  } = useConfig();

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

  const [activeTab, setActiveTab] = useState('permissions');

  const handleTogglePreview = useCallback(() => {
    setActiveTab((prev) => (prev === 'preview' ? 'permissions' : 'preview'));
  }, []);

  useEffect(() => {
    window.addEventListener('toggle-preview', handleTogglePreview);
    return () => window.removeEventListener('toggle-preview', handleTogglePreview);
  }, [handleTogglePreview]);

  const renderPermissionSection = (
    category: PermissionCategory,
    rules: typeof sortedAllowRules,
    icon: React.ReactNode,
    emptyMessage: string
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          {icon}
          <span>{t(`settings.${category}`)}</span>
          <span className="text-muted-foreground">({rules.length})</span>
        </div>
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
    <Card id="card-settings-json">
      <CardHeader>
        <CardTitle>{t('settings.title')}</CardTitle>
        <CardDescription>{t('settings.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="permissions" className="gap-2">
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>{t('settings.permissions')}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{t('tabs.preview')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="permissions" className="mt-4 space-y-6">
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

            {renderPermissionSection(
              'deny',
              sortedDenyRules,
              <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />,
              t('settings.noDenyRules')
            )}

            <hr className="border-border" />

            {renderPermissionSection(
              'ask',
              sortedAskRules,
              <HelpCircle className="h-4 w-4 text-yellow-600" aria-hidden="true" />,
              t('settings.noAskRules')
            )}

            <hr className="border-border" />

            {renderPermissionSection(
              'allow',
              sortedAllowRules,
              <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />,
              t('settings.noAllowRules')
            )}
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <SettingsJsonPreview />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
