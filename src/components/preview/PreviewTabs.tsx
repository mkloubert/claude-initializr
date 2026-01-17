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

import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DockerfilePreview } from './DockerfilePreview';
import { DockerComposePreview } from './DockerComposePreview';
import { SettingsJsonPreview } from './SettingsJsonPreview';

/**
 * Tabs component for previewing generated configuration files.
 */
export function PreviewTabs() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preview.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dockerfile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dockerfile">
              {t('preview.dockerfile')}
            </TabsTrigger>
            <TabsTrigger value="docker-compose">
              {t('preview.dockerCompose')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {t('preview.settingsJson')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dockerfile" className="mt-4">
            <DockerfilePreview />
          </TabsContent>

          <TabsContent value="docker-compose" className="mt-4">
            <DockerComposePreview />
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <SettingsJsonPreview />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
