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
import { SiGithub, SiPaypal } from 'react-icons/si';
import { AutosaveSwitcher, LanguageSwitcher, ResetButton, ThemeSwitcher } from '@/components/common';
import { Button } from '@/components/ui/button';
import { GITHUB_URL, PAYPAL_URL } from '@/config';
import logoImage from '@/assets/logo.png';

/**
 * Application header with logo, title, and navigation links.
 */
export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt=""
            className="h-8 w-8"
            aria-hidden="true"
          />
          <h1 className="text-lg font-semibold tracking-tight">
            {t('app.title')}
          </h1>
        </div>
        <nav aria-label={t('nav.header')} className="flex items-center gap-1">
          {GITHUB_URL && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('links.github')}
              >
                <SiGithub className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          )}
          {PAYPAL_URL && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('links.paypal')}
              >
                <SiPaypal className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          )}
          <ResetButton />
          <AutosaveSwitcher />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
