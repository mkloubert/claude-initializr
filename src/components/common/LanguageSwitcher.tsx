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
import { getModifierKey } from '@/hooks/useKeyboardShortcuts';

interface LanguageConfig {
  code: string;
  sortValue: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageConfig[] = [
  { code: 'ar', sortValue: 'arabic', nativeName: 'العربية', flag: '🌍' },
  { code: 'zh', sortValue: 'chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'nl', sortValue: 'dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', sortValue: 'english', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', sortValue: 'french', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', sortValue: 'german', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', sortValue: 'greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', sortValue: 'hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  { code: 'hi', sortValue: 'hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', sortValue: 'italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', sortValue: 'japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', sortValue: 'korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'pl', sortValue: 'polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'pt', sortValue: 'portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'es', sortValue: 'spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'tr', sortValue: 'turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', sortValue: 'ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'ur', sortValue: 'urdu', nativeName: 'اردو', flag: '🇵🇰' },
];

/**
 * Language switcher dropdown component.
 * Allows users to switch between supported languages.
 * Languages are sorted alphabetically by their English names.
 */
interface LanguageSwitcherProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LanguageSwitcher({ open, onOpenChange }: LanguageSwitcherProps = {}) {
  const { t, i18n } = useTranslation();

  const sortedLanguages = useMemo(() => {
    return [...languages].sort((a, b) => a.sortValue.localeCompare(b.sortValue));
  }, []);

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === i18n.language) || languages.find((lang) => lang.code === 'en')!;
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t('language.switch')}
          title={`${t('language.switch')} (${getModifierKey()}+Shift+L)`}
        >
          <span>
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
