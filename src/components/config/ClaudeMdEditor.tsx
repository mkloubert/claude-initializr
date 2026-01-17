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
import MDEditor from '@uiw/react-md-editor';
import { useConfig } from '@/contexts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Markdown editor for CLAUDE.md file content.
 */
export function ClaudeMdEditor() {
  const { t } = useTranslation();
  const { config, setClaudeMdContent } = useConfig();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('claudeMd.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div data-color-mode="light" className="wmde-markdown-var">
          <MDEditor
            value={config.claudeMdContent}
            onChange={(value) => setClaudeMdContent(value ?? '')}
            height={400}
            preview="edit"
            aria-label={t('claudeMd.title')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
