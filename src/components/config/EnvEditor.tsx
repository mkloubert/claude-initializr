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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { EnvRow } from './EnvRow';

/**
 * Table-based editor for environment variables.
 */
export function EnvEditor() {
  const { t } = useTranslation();
  const { config, addEnvVariable, updateEnvVariable, removeEnvVariable } =
    useConfig();

  const existingKeys = config.envVariables.map((v) => v.key);

  const sortedEnvVariables = useMemo(
    () =>
      [...config.envVariables].sort((a, b) =>
        a.key.localeCompare(b.key, undefined, { sensitivity: 'base' })
      ),
    [config.envVariables]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{t('env.title')}</CardTitle>
          <Button onClick={addEnvVariable} size="sm" className="gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{t('env.add')}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {config.envVariables.length === 0 ? (
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
      </CardContent>
    </Card>
  );
}
