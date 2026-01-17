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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SoftwarePackage } from '@/types';

interface SoftwareItemProps {
  software: SoftwarePackage;
  labelKey: string;
  descriptionKey: string;
  icon?: ReactNode;
  onToggle: () => void;
  onVersionChange: (version: string) => void;
}

/**
 * Individual software item with checkbox, icon, and optional version input.
 */
export function SoftwareItem({
  software,
  labelKey,
  descriptionKey,
  icon,
  onToggle,
  onVersionChange,
}: SoftwareItemProps) {
  const { t } = useTranslation();
  const checkboxId = `software-${software.id}`;
  const versionId = `version-${software.id}`;

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
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
        </div>
      </div>

      {software.hasVersionSelection && (
        <div className="flex items-center gap-2 sm:ml-auto">
          <Label htmlFor={versionId} className="text-sm whitespace-nowrap">
            {t('software.version')}:
          </Label>
          <Input
            id={versionId}
            type="text"
            value={software.version}
            onChange={(e) => onVersionChange(e.target.value)}
            disabled={!software.enabled}
            placeholder={t('software.latest')}
            className="w-24"
            aria-label={`${t(labelKey)} ${t('software.version')}`}
          />
        </div>
      )}
    </div>
  );
}
