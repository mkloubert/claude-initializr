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

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MDEditor, { commands, type ICommand } from '@uiw/react-md-editor';
import { useConfig, useTheme } from '@/contexts';
import {
  baseAptPackages,
  baseNpmPackages,
  optionalAptPackages,
  optionalNpmPackages,
} from '@/config';
import type { CustomNpmPackage, SoftwareConfig } from '@/types';

/**
 * Generates the list of all available software in the container.
 */
function generateSoftwareList(
  software: SoftwareConfig,
  customAptPackages: string[],
  customNpmPackages: CustomNpmPackage[]
): string {
  const aptPackages = [...baseAptPackages];

  for (const [key, packages] of Object.entries(optionalAptPackages)) {
    if (software[key as keyof SoftwareConfig]?.enabled) {
      aptPackages.push(...packages);
    }
  }

  aptPackages.push(...customAptPackages);

  const uniqueAptPackages = [...new Set(aptPackages)].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  const npmPackages = [...baseNpmPackages];

  for (const [key, packages] of Object.entries(optionalNpmPackages)) {
    if (software[key as keyof SoftwareConfig]?.enabled) {
      npmPackages.push(...packages);
    }
  }

  customNpmPackages.forEach((pkg) => {
    npmPackages.push(pkg.name);
  });

  const sortedNpmPackages = [...new Set(npmPackages)].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  const lines: string[] = [
    '',
    'The following software is available to you:',
    '',
    '## APT Packages',
    '',
    ...uniqueAptPackages.map((pkg) => `- ${pkg}`),
    '',
    '## NPM Packages (Global)',
    '',
    ...sortedNpmPackages.map((pkg) => `- ${pkg}`),
    '',
  ];

  return lines.join('\n');
}

/**
 * Creates the custom command for inserting the software list.
 */
function createSoftwareListCommand(
  software: SoftwareConfig,
  customAptPackages: string[],
  customNpmPackages: CustomNpmPackage[]
): ICommand {
  return {
    name: 'software-list',
    keyCommand: 'software-list',
    buttonProps: {
      'aria-label': 'Insert available software list',
      title: 'Insert available software list',
    },
    icon: (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
        <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm8 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V8h12v2z" />
      </svg>
    ),
    execute: (_state, api) => {
      const softwareList = generateSoftwareList(software, customAptPackages, customNpmPackages);
      api.replaceSelection(softwareList);
    },
  };
}

/**
 * CLAUDE.md editor with markdown editing and built-in preview.
 */
export function ClaudeMdEditor() {
  const { t } = useTranslation();
  const { config, setClaudeMdContent } = useConfig();
  const { resolvedTheme } = useTheme();

  const toolbarCommands = useMemo(() => [
    commands.title,
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.divider,
    commands.link,
    commands.quote,
    commands.code,
    commands.codeBlock,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
    commands.divider,
    commands.hr,
    commands.divider,
    createSoftwareListCommand(config.software, config.customAptPackages, config.customNpmPackages),
  ], [config.software, config.customAptPackages, config.customNpmPackages]);

  const extraCommands = useMemo(() => [
    commands.codeEdit,
    commands.codeLive,
    commands.codePreview,
  ], []);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">
          {t('claudeMd.description')}
        </p>
      </div>
      <div data-color-mode={resolvedTheme} className="wmde-markdown-var">
        <MDEditor
          value={config.claudeMdContent}
          onChange={(value) => setClaudeMdContent(value ?? '')}
          height={400}
          preview="edit"
          commands={toolbarCommands}
          extraCommands={extraCommands}
          aria-label={t('claudeMd.title')}
        />
      </div>
    </div>
  );
}
