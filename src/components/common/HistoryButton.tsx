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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHistory } from '@/contexts';
import { HistoryPanel } from './HistoryPanel';

/**
 * Button that opens the history panel.
 * Shows a badge with the history count when there are entries.
 */
export function HistoryButton() {
  const { t } = useTranslation();
  const { entries, isAvailable } = useHistory();
  const [panelOpen, setPanelOpen] = useState(false);

  // Don't show badge for just the initial state
  const historyCount = entries.length > 1 ? entries.length - 1 : 0;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setPanelOpen(true)}
        aria-label={t('history.title')}
        title={t('history.title')}
        disabled={!isAvailable}
        className="relative"
      >
        <History className="h-5 w-5" aria-hidden="true" />
        {historyCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {historyCount > 9 ? '9+' : historyCount}
          </span>
        )}
      </Button>

      <HistoryPanel open={panelOpen} onOpenChange={setPanelOpen} />
    </>
  );
}
