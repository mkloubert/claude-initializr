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

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useConfig } from '@/contexts';
import { downloadZipFile, type ReadmeLanguageConfig } from '@/services';
import { getModifierKey } from '@/hooks/useKeyboardShortcuts';
import { Download, Loader2 } from 'lucide-react';

/**
 * Language display names map.
 */
const languageNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
  he: 'עברית',
  hi: 'हिन्दी',
  ur: 'اردو',
  uk: 'Українська',
  el: 'Ελληνικά',
  pl: 'Polski',
  tr: 'Türkçe',
};

/**
 * Button component to trigger ZIP file generation and download.
 */
export function DownloadButton() {
  const { t, i18n } = useTranslation();
  const { config } = useConfig();
  const [isGenerating, setIsGenerating] = useState(false);

  // Get the English translation function
  const tEnglish = useMemo(() => {
    return i18n.getFixedT('en');
  }, [i18n]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Build the README language configuration
      const currentLanguage = i18n.language;
      const readmeConfig: ReadmeLanguageConfig = {
        language: currentLanguage,
        languageName: languageNames[currentLanguage] || currentLanguage,
        t,
        tEnglish,
        initializerUrl: window.location.origin + window.location.pathname,
      };

      await downloadZipFile(config, t('download.filename'), readmeConfig);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      size="lg"
      className="gap-2"
      title={`${t('download.button')} (${getModifierKey()}+S)`}
      aria-busy={isGenerating}
      aria-live="polite"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{t('download.generating')}</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>{t('download.button')}</span>
        </>
      )}
    </Button>
  );
}
