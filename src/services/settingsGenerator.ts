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

import type { ClaudePermissions, PermissionRule, ProtectedFile } from '@/types';

/**
 * Formats a single permission rule as a directive string.
 * Example: Read(src/**) or Edit(.env)
 */
function formatPermissionRule(rule: PermissionRule): string {
  return `${rule.directive}(${rule.pattern})`;
}

/**
 * Filters and formats permission rules, excluding empty patterns.
 */
function formatPermissionRules(rules: PermissionRule[]): string[] {
  return rules
    .filter((rule) => rule.pattern.trim().length > 0)
    .map(formatPermissionRule);
}

/**
 * Generates deny rules from protected files.
 * Each protected file gets both Read() and Edit() deny rules.
 */
function generateProtectedFileDenyRules(protectedFiles: ProtectedFile[]): string[] {
  const rules: string[] = [];

  for (const file of protectedFiles) {
    const path = file.path.trim();
    if (path.length > 0) {
      rules.push(`Read(${path})`);
      rules.push(`Edit(${path})`);
    }
  }

  return rules;
}

/**
 * Generates the settings.json content from the Claude permissions configuration.
 * Protected files are automatically added as Read() and Edit() deny rules.
 */
export function generateSettingsJson(
  permissions: ClaudePermissions,
  protectedFiles: ProtectedFile[] = []
): string {
  const allowRules = formatPermissionRules(permissions.allow);
  const askRules = formatPermissionRules(permissions.ask);
  // Combine manual deny rules with auto-generated protected file deny rules
  const manualDenyRules = formatPermissionRules(permissions.deny);
  const protectedFileDenyRules = generateProtectedFileDenyRules(protectedFiles);
  const denyRules = [...manualDenyRules, ...protectedFileDenyRules];

  // Build the settings object
  const settings: {
    permissions?: {
      allow?: string[];
      ask?: string[];
      deny?: string[];
    };
  } = {};

  // Only include permissions object if there are any rules
  if (allowRules.length > 0 || askRules.length > 0 || denyRules.length > 0) {
    settings.permissions = {};

    if (allowRules.length > 0) {
      settings.permissions.allow = allowRules;
    }
    if (askRules.length > 0) {
      settings.permissions.ask = askRules;
    }
    if (denyRules.length > 0) {
      settings.permissions.deny = denyRules;
    }
  }

  return JSON.stringify(settings, null, 2);
}
