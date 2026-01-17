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

import { useMemo, lazy, Suspense } from 'react';
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
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EnvRow } from './EnvRow';
import { ProtectedFileRow } from './ProtectedFileRow';
import { Variable, ShieldAlert, Eye, Plus, Loader2 } from 'lucide-react';

// Lazy load the preview component to reduce initial bundle size
const DockerComposePreview = lazy(() =>
  import('@/components/preview/DockerComposePreview').then((m) => ({ default: m.DockerComposePreview }))
);

/**
 * Card component for docker-compose.yaml configuration with tabs for env variables,
 * protected files, and preview.
 */
export function DockerComposeCard() {
  const { t } = useTranslation();
  const {
    config,
    addEnvVariable,
    updateEnvVariable,
    removeEnvVariable,
    addProtectedFile,
    updateProtectedFile,
    removeProtectedFile,
  } = useConfig();

  const envVariables = useMemo(
    () => config.envVariables ?? [],
    [config.envVariables]
  );

  const existingKeys = useMemo(
    () => envVariables.map((v) => v.key),
    [envVariables]
  );

  const sortedEnvVariables = useMemo(
    () =>
      [...envVariables].sort((a, b) =>
        a.key.localeCompare(b.key, undefined, { sensitivity: 'base' })
      ),
    [envVariables]
  );

  const sortedProtectedFiles = useMemo(
    () =>
      [...config.protectedFiles].sort((a, b) =>
        a.path.localeCompare(b.path, undefined, { sensitivity: 'base' })
      ),
    [config.protectedFiles]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preview.dockerCompose')}</CardTitle>
        <CardDescription>{t('preview.dockerComposeDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="env">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="env" className="gap-2">
              <Variable className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('tabs.envVariables')}</span>
              <span className="sm:hidden">{t('tabs.env')}</span>
            </TabsTrigger>
            <TabsTrigger value="protected" className="gap-2">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">
                {t('tabs.protectedFiles')}
              </span>
              <span className="sm:hidden">{t('tabs.protected')}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{t('tabs.preview')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="env" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Button onClick={addEnvVariable} size="sm" className="gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>{t('env.add')}</span>
              </Button>
            </div>
            {envVariables.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                {t('env.description')}
              </p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('env.key')}</TableHead>
                      <TableHead>{t('env.value')}</TableHead>
                      <TableHead className="w-[60px]">
                        <span className="sr-only">{t('env.remove')}</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEnvVariables.map((variable) => (
                      <EnvRow
                        key={variable.id}
                        variable={variable}
                        existingKeys={existingKeys}
                        onUpdate={(field, value) =>
                          updateEnvVariable(variable.id, field, value)
                        }
                        onRemove={() => removeEnvVariable(variable.id)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="protected" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Button onClick={addProtectedFile} size="sm" className="gap-2">
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>{t('protectedFiles.add')}</span>
              </Button>
            </div>
            <Alert>
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>{t('protectedFiles.help')}</AlertDescription>
            </Alert>
            {config.protectedFiles.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                {t('protectedFiles.description')}
              </p>
            ) : (
              <div className="space-y-2">
                {sortedProtectedFiles.map((file) => (
                  <ProtectedFileRow
                    key={file.id}
                    file={file}
                    onUpdate={(path) => updateProtectedFile(file.id, path)}
                    onRemove={() => removeProtectedFile(file.id)}
                  />
                ))}
              </div>
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
              <DockerComposePreview />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
