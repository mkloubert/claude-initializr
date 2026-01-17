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

import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import type { SoftwarePackage } from '@/types';

interface SoftwareItemProps {
  software: SoftwarePackage;
  labelKey: string;
  descriptionKey: string;
  icon?: ReactNode;
  onToggle: () => void;
  /** List of software IDs that are recommended but not enabled */
  missingRecommendations?: string[];
  /** Map of software IDs to their translated labels */
  softwareLabels?: Record<string, string>;
}

/**
 * Individual software item with checkbox and icon.
 * Version configuration is handled via Docker build arguments.
 */
export function SoftwareItem({
  software,
  labelKey,
  descriptionKey,
  icon,
  onToggle,
  missingRecommendations = [],
  softwareLabels = {},
}: SoftwareItemProps) {
  const { t } = useTranslation();
  const checkboxId = `software-${software.id}`;
  const showWarning = software.enabled && missingRecommendations.length > 0;

  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">
      <Checkbox
        id={checkboxId}
        checked={software.enabled}
        onCheckedChange={onToggle}
        aria-describedby={`${checkboxId}-description`}
      />
      {icon && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="grid gap-1">
        <Label
          htmlFor={checkboxId}
          className="cursor-pointer font-medium leading-none"
        >
          {t(labelKey)}
        </Label>
        <p
          id={`${checkboxId}-description`}
          className="text-sm text-muted-foreground"
        >
          {t(descriptionKey)}
        </p>
        {showWarning && (
          <p className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-500">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {t('software.recommendsHint', {
                packages: missingRecommendations
                  .map((id) => softwareLabels[id] || id)
                  .join(', '),
              })}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
