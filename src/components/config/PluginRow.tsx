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
import { Trash2 } from 'lucide-react';
import type { PluginEntry } from '@/types';
import { validatePluginName } from './pluginValidation';

interface PluginRowProps {
  plugin: PluginEntry;
  onUpdate: (name: string) => void;
  onRemove: () => void;
}

/**
 * Individual row for a plugin entry input.
 */
export function PluginRow({
  plugin,
  onUpdate,
  onRemove,
}: PluginRowProps) {
  const { t } = useTranslation();
  const [nameError, setNameError] = useState<string | null>(null);

  const handleNameChange = (newName: string) => {
    if (!validatePluginName(newName)) {
      setNameError(t('plugins.invalidFormat'));
    } else {
      setNameError(null);
    }
    onUpdate(newName);
  };

  return (
    <div className="flex items-start gap-2">
      <div className="flex-1 space-y-1">
        <Input
          type="text"
          value={plugin.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder={t('plugins.placeholder')}
          aria-label={t('plugins.title')}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? `error-${plugin.id}` : undefined}
          className={nameError ? 'border-destructive' : ''}
        />
        {nameError && (
          <p
            id={`error-${plugin.id}`}
            className="text-xs text-destructive"
            role="alert"
          >
            {nameError}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label={t('plugins.remove')}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
