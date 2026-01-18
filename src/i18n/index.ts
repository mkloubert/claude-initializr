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

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { Translations } from './locales/types';
import ar from './locales/ar';
import de from './locales/de';
import el from './locales/el';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import he from './locales/he';
import hi from './locales/hi';
import it from './locales/it';
import ja from './locales/ja';
import ko from './locales/ko';
import nl from './locales/nl';
import pl from './locales/pl';
import pt from './locales/pt';
import tr from './locales/tr';
import uk from './locales/uk';
import ur from './locales/ur';
import zh from './locales/zh';

const resources = {
  ar: { translation: ar },
  de: { translation: de },
  el: { translation: el },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  he: { translation: he },
  hi: { translation: hi },
  it: { translation: it },
  ja: { translation: ja },
  ko: { translation: ko },
  nl: { translation: nl },
  pl: { translation: pl },
  pt: { translation: pt },
  tr: { translation: tr },
  uk: { translation: uk },
  ur: { translation: ur },
  zh: { translation: zh },
};

export const supportedLanguages = Object.keys(resources);

const storedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language.split('-')[0];
const defaultLanguage = storedLanguage || (supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en');

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export type { Translations };

export default i18n;
