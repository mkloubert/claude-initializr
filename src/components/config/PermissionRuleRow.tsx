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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import type { PermissionDirectiveType, PermissionRule } from '@/types';

interface PermissionRuleRowProps {
  rule: PermissionRule;
  onUpdateDirective: (directive: PermissionDirectiveType) => void;
  onUpdatePattern: (pattern: string) => void;
  onRemove: () => void;
}

const DIRECTIVES: PermissionDirectiveType[] = ['Read', 'Edit', 'WebFetch'];

/**
 * Individual row for a permission rule input with directive selector and pattern.
 */
export function PermissionRuleRow({
  rule,
  onUpdateDirective,
  onUpdatePattern,
  onRemove,
}: PermissionRuleRowProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={rule.directive}
        onValueChange={(value) => onUpdateDirective(value as PermissionDirectiveType)}
      >
        <SelectTrigger
          className="w-[120px]"
          aria-label={t('settings.directive')}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DIRECTIVES.map((directive) => (
            <SelectItem key={directive} value={directive}>
              {directive}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex-1">
        <Input
          type="text"
          value={rule.pattern}
          onChange={(e) => onUpdatePattern(e.target.value)}
          placeholder={t('settings.patternPlaceholder')}
          aria-label={t('settings.pattern')}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label={t('settings.removeRule')}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
