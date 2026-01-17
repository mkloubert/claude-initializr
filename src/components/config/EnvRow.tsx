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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import type { EnvVariable } from '@/types';
import { validateEnvKey } from './envValidation';

interface EnvRowProps {
  variable: EnvVariable;
  existingKeys: string[];
  onUpdate: (field: 'key' | 'value', value: string) => void;
  onRemove: () => void;
}

/**
 * Individual row in the environment variables table.
 */
export function EnvRow({
  variable,
  existingKeys,
  onUpdate,
  onRemove,
}: EnvRowProps) {
  const { t } = useTranslation();
  const [keyError, setKeyError] = useState<string | null>(null);

  const handleKeyChange = (newKey: string) => {
    // Check for valid format
    if (!validateEnvKey(newKey)) {
      setKeyError(t('errors.invalidEnvKey'));
    } else if (
      newKey &&
      existingKeys.filter((k) => k === newKey).length > 0 &&
      newKey !== variable.key
    ) {
      // Check for duplicates (excluding current variable)
      setKeyError(t('errors.duplicateEnvKey'));
    } else {
      setKeyError(null);
    }
    onUpdate('key', newKey);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="space-y-1">
          <Input
            type="text"
            value={variable.key}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder={t('env.keyPlaceholder')}
            aria-label={t('env.key')}
            aria-invalid={!!keyError}
            aria-describedby={keyError ? `error-${variable.id}` : undefined}
            className={keyError ? 'border-destructive' : ''}
          />
          {keyError && (
            <p
              id={`error-${variable.id}`}
              className="text-xs text-destructive"
              role="alert"
            >
              {keyError}
            </p>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={variable.value}
          onChange={(e) => onUpdate('value', e.target.value)}
          placeholder={t('env.valuePlaceholder')}
          aria-label={t('env.value')}
        />
      </TableCell>
      <TableCell className="w-[60px]">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label={t('env.remove')}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
