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
import { Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHistory } from '@/contexts';
import { getModifierKey, isMac } from '@/hooks/useKeyboardShortcuts';

/**
 * Undo and Redo buttons for the header.
 * Displays controls to navigate through configuration history.
 */
export function UndoRedoButtons() {
  const { t } = useTranslation();
  const { undo, redo, canUndo, canRedo } = useHistory();

  const modKey = getModifierKey();
  const redoShortcut = isMac() ? `${modKey}+Shift+Z` : `${modKey}+Y`;

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={undo}
        disabled={!canUndo}
        aria-label={t('history.undo')}
        title={`${t('history.undo')} (${modKey}+Z)`}
      >
        <Undo2 className="h-5 w-5" aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={redo}
        disabled={!canRedo}
        aria-label={t('history.redo')}
        title={`${t('history.redo')} (${redoShortcut})`}
      >
        <Redo2 className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}
