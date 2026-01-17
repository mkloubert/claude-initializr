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

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/layout';
import {
  DockerfileCard,
  DockerComposeCard,
} from '@/components/config';
import { DownloadButton } from '@/components/common';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Settings,
  FileCode,
  Network,
  Container,
  FileX,
  Lock,
  X,
  Info,
  Loader2,
} from 'lucide-react';

// Lazy load the markdown editor card to reduce initial bundle size (~1.7MB)
const ClaudeMdCard = lazy(() =>
  import('@/components/config/ClaudeMdCard').then((m) => ({ default: m.ClaudeMdCard }))
);

const WELCOME_DISMISSED_KEY = 'claude-initializr-welcome-dismissed';

/**
 * Home page with file-based configuration cards.
 */
export default function Home() {
  const { t } = useTranslation();
  const [welcomeDismissed, setWelcomeDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(WELCOME_DISMISSED_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(WELCOME_DISMISSED_KEY, String(welcomeDismissed));
  }, [welcomeDismissed]);

  const dismissWelcome = useCallback(() => {
    setWelcomeDismissed(true);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        {!welcomeDismissed && (
          <Card className="mb-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={dismissWelcome}
              aria-label={t('welcome.close')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
            <CardContent className="space-y-6 pt-6">
              {/* Introduction */}
              <div className="space-y-3 text-muted-foreground">
                <p>{t('welcome.description')}</p>
                <p>{t('welcome.purpose')}</p>
              </div>

              {/* Features and Security Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Configuration Features */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    {t('welcome.features.title')}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <FileCode className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.features.dockerfile')}</span>
                    </li>
                    <li className="flex gap-2">
                      <Container className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.features.compose')}</span>
                    </li>
                    <li className="flex gap-2">
                      <FileCode className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.features.claudeMd')}</span>
                    </li>
                  </ul>
                </div>

                {/* Security Features */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Shield className="h-5 w-5" aria-hidden="true" />
                    {t('welcome.security.title')}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Network className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.security.firewall')}</span>
                    </li>
                    <li className="flex gap-2">
                      <Container className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.security.isolation')}</span>
                    </li>
                    <li className="flex gap-2">
                      <FileX className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.security.readonly')}</span>
                    </li>
                    <li className="flex gap-2">
                      <Lock className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{t('welcome.security.capabilities')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-sm mb-2">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {t('welcome.privacy.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('welcome.privacy.description')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Download Button */}
        <div className="mb-6 flex justify-end">
          <DownloadButton />
        </div>

        {/* Configuration Cards */}
        <div className="space-y-6">
          <DockerfileCard />
          <DockerComposeCard />
          <Suspense
            fallback={
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
              </Card>
            }
          >
            <ClaudeMdCard />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}
