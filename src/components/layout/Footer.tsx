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
import { AUTHOR_URL, AUTHOR_NAME } from '@/config/env';

/**
 * Application footer with copyright information.
 */
export function Footer() {
  const { t } = useTranslation();

  // Split the copyright text to make the author name a link
  // The copyright format is "© 2026 Marcel Joachim Kloubert"
  const copyrightText = t('footer.copyright');
  const parts = copyrightText.split(AUTHOR_NAME);

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto flex h-12 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          {parts[0]}
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground hover:underline underline-offset-4"
          >
            {AUTHOR_NAME}
          </a>
          {parts[1]}
        </p>
      </div>
    </footer>
  );
}
