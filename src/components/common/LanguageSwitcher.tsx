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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface LanguageConfig {
  code: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageConfig[] = [
  { code: 'ar', nativeName: 'العربية', flag: '🌍' },
  { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'en', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'he', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'hi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'nl', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'pt', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'tr', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'ur', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'zh', nativeName: '中文', flag: '🇨🇳' },
];

/**
 * Language switcher dropdown component.
 * Allows users to switch between supported languages.
 * Languages are sorted alphabetically by their native names.
 */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const sortedLanguages = useMemo(() => {
    return [...languages].sort((a, b) =>
      a.nativeName.localeCompare(b.nativeName, undefined, { sensitivity: 'base' })
    );
  }, []);

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === i18n.language) || languages.find((lang) => lang.code === 'en')!;
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t('language.switch')}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="ml-2 hidden sm:inline">
            {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
        {sortedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            aria-current={i18n.language === lang.code ? 'true' : undefined}
            className={i18n.language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2" aria-hidden="true">{lang.flag}</span>
            {lang.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
