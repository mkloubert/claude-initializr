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

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CheckCircle,
  Lock,
  Settings,
  Shield,
} from 'lucide-react';
import { WELCOME_STORAGE_KEY } from './welcomeUtils';

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Welcome dialog shown on first visit with features, security info, and privacy notice.
 */
export function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
  const { t } = useTranslation();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleGetStarted = useCallback(() => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
      } catch {
        // localStorage unavailable
      }
    }
    onOpenChange(false);
  }, [dontShowAgain, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('welcome.dialogTitle')}</DialogTitle>
          <DialogDescription>{t('welcome.description')}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            <p className="text-sm text-muted-foreground">
              {t('welcome.purpose')}
            </p>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                {t('welcome.features.title')}
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground" role="list">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                  {t('welcome.features.dockerfile')}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                  {t('welcome.features.compose')}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                  {t('welcome.features.claudeMd')}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                  {t('welcome.features.devContainer')}
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                {t('welcome.security.title')}
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground" role="list">
                <li className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  {t('welcome.security.firewall')}
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  {t('welcome.security.isolation')}
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  {t('welcome.security.readonly')}
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  {t('welcome.security.capabilities')}
                </li>
              </ul>
            </div>

            {/* Privacy */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                {t('welcome.privacy.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('welcome.privacy.description')}
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col gap-4 sm:flex-col">
          <div className="flex items-center gap-2">
            <Checkbox
              id="welcome-dont-show"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked === true)}
            />
            <label
              htmlFor="welcome-dont-show"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              {t('welcome.dontShowAgain')}
            </label>
          </div>
          <Button onClick={handleGetStarted} className="w-full sm:w-auto sm:self-end">
            {t('welcome.getStarted')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

