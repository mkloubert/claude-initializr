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
import { MainLayout } from '@/components/layout';
import {
  SoftwareSelector,
  EnvEditor,
  ClaudeMdEditor,
  ProtectedFilesEditor,
} from '@/components/config';
import { DownloadButton } from '@/components/common';
import { PreviewTabs } from '@/components/preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Eye } from 'lucide-react';

/**
 * Home page with configuration and preview tabs.
 */
export default function Home() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            {t('app.description')}
          </p>
          <DownloadButton />
        </div>

        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="configuration" className="gap-2">
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span>{t('nav.configuration')}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{t('nav.preview')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="mt-6">
            <div className="space-y-6">
              <SoftwareSelector />
              <EnvEditor />
              <ProtectedFilesEditor />
              <ClaudeMdEditor />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <PreviewTabs />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
