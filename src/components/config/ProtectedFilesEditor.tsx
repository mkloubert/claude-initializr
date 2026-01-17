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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, ShieldAlert } from 'lucide-react';
import { ProtectedFileRow } from './ProtectedFileRow';

/**
 * Editor for protected file paths that will be mounted as empty read-only files.
 */
export function ProtectedFilesEditor() {
  const { t } = useTranslation();
  const { config, addProtectedFile, updateProtectedFile, removeProtectedFile } =
    useConfig();

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{t('protectedFiles.title')}</CardTitle>
          <Button onClick={addProtectedFile} size="sm" className="gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{t('protectedFiles.add')}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
