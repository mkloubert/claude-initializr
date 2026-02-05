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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import { Variable, ShieldAlert, Plus } from 'lucide-react';

/**
 * Docker Compose editor with accordion-based progressive disclosure.
 * Platform selector is always visible; env variables and protected files are in collapsible sections.
 */
export function DockerComposeEditor() {
  const { t } = useTranslation();
  const {
    config,
    setDockerPlatform,
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

  // Auto-open sections that already have items
  const defaultOpenSections = useMemo(() => {
    const sections: string[] = [];
    if (envVariables.length > 0) sections.push('env');
    if (config.protectedFiles.length > 0) sections.push('protected');
    return sections;
  }, [envVariables.length, config.protectedFiles.length]);

  return (
    <div className="space-y-6">
      {/* Docker Platform — always visible */}
      <div className="space-y-2">
        <Label htmlFor="docker-platform">{t('dockerCompose.platform')}</Label>
        <Input
          id="docker-platform"
          value={config.dockerPlatform}
          onChange={(e) => setDockerPlatform(e.target.value)}
          placeholder={t('dockerCompose.platformPlaceholder')}
          aria-describedby="docker-platform-description"
        />
        <p id="docker-platform-description" className="text-sm text-muted-foreground">
          {t('dockerCompose.platformDesc')}
        </p>
      </div>

      {/* Environment Variables & Protected Files — collapsible */}
      <Accordion type="multiple" defaultValue={defaultOpenSections}>
        {/* Environment Variables */}
        <AccordionItem value="env" className="border rounded-lg px-4">
          <AccordionTrigger className="min-h-[44px]">
            <span className="flex items-center gap-2">
              <Variable className="h-4 w-4" aria-hidden="true" />
              {t('dockerCompose.envSection')}
              {envVariables.length > 0 && (
                <Badge variant="secondary" className="font-normal">
                  {envVariables.length}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
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
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Protected Files */}
        <AccordionItem value="protected" className="border rounded-lg px-4 mt-2 last:border-b">
          <AccordionTrigger className="min-h-[44px]">
            <span className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              {t('dockerCompose.protectedSection')}
              {config.protectedFiles.length > 0 && (
                <Badge variant="secondary" className="font-normal">
                  {config.protectedFiles.length}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
