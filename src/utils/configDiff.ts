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

import { diffLines } from 'diff';
import type { AppConfig, SoftwareConfig } from '@/types';
import type { ConfigSection } from '@/types/history';

/**
 * Represents a single line in the diff output.
 */
export interface DiffLine {
  oldLineNo: number | null;
  newLineNo: number | null;
  type: 'added' | 'removed' | 'unchanged';
  content: string;
}

/**
 * Strips internal IDs and sensitive values from a config
 * so that the diff only shows meaningful content changes.
 */
export function configToComparableJson(config: AppConfig): string {
  const comparable = {
    baseImage: config.baseImage,
    nodeVersion: config.nodeVersion,
    dockerPlatform: config.dockerPlatform,
    software: Object.fromEntries(
      Object.entries(config.software).map(([key, val]) => [
        key,
        { enabled: val.enabled },
      ]),
    ),
    customAptPackages: [...config.customAptPackages].sort(),
    customNpmPackages: config.customNpmPackages
      .map(({ name, installAs }) => ({ name, installAs }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    customRunCommands: config.customRunCommands.map(({ command, runAs }) => ({
      command,
      runAs,
    })),
    envVariables: (config.envVariables ?? [])
      .map(({ key }) => ({ key }))
      .sort((a, b) => a.key.localeCompare(b.key)),
    protectedFiles: config.protectedFiles
      .map(({ path }) => ({ path }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    claudeMdContent: config.claudeMdContent,
    claudePermissions: {
      allow: config.claudePermissions.allow
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
      ask: config.claudePermissions.ask
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
      deny: config.claudePermissions.deny
        .map(({ directive, pattern }) => ({ directive, pattern }))
        .sort((a, b) => `${a.directive}:${a.pattern}`.localeCompare(`${b.directive}:${b.pattern}`)),
    },
    devContainer: {
      enabled: config.devContainer.enabled,
      name: config.devContainer.name,
      extensions: config.devContainer.extensions
        .map(({ extensionId }) => ({ extensionId }))
        .sort((a, b) => a.extensionId.localeCompare(b.extensionId)),
      settings: config.devContainer.settings
        .map(({ key, value }) => ({ key, value }))
        .sort((a, b) => a.key.localeCompare(b.key)),
      features: config.devContainer.features
        .map(({ feature }) => ({ feature }))
        .sort((a, b) => a.feature.localeCompare(b.feature)),
      forwardedPorts: config.devContainer.forwardedPorts
        .map(({ port }) => ({ port }))
        .sort((a, b) => a.port - b.port),
      postCreateScript: config.devContainer.postCreateScript,
      postStartScript: config.devContainer.postStartScript,
      postAttachScript: config.devContainer.postAttachScript,
    },
  };

  return JSON.stringify(comparable, null, 2);
}

/**
 * Computes a line-by-line diff between two text strings.
 */
export function computeLineDiff(oldText: string, newText: string): DiffLine[] {
  const changes = diffLines(oldText, newText);
  const lines: DiffLine[] = [];
  let oldLine = 1;
  let newLine = 1;

  for (const change of changes) {
    const changeLines = change.value.replace(/\n$/, '').split('\n');

    for (const line of changeLines) {
      if (change.added) {
        lines.push({
          oldLineNo: null,
          newLineNo: newLine++,
          type: 'added',
          content: line,
        });
      } else if (change.removed) {
        lines.push({
          oldLineNo: oldLine++,
          newLineNo: null,
          type: 'removed',
          content: line,
        });
      } else {
        lines.push({
          oldLineNo: oldLine++,
          newLineNo: newLine++,
          type: 'unchanged',
          content: line,
        });
      }
    }
  }

  return lines;
}

/**
 * Checks if two configs are equal (ignoring IDs and sensitive values).
 */
export function configsAreEqual(configA: AppConfig, configB: AppConfig): boolean {
  return configToComparableJson(configA) === configToComparableJson(configB);
}

/**
 * Detects which sections of the configuration changed between two configs.
 */
export function detectChangedSections(
  oldConfig: AppConfig,
  newConfig: AppConfig
): ConfigSection[] {
  const changedSections: ConfigSection[] = [];

  // Base image
  if (oldConfig.baseImage !== newConfig.baseImage) {
    changedSections.push('baseImage');
  }

  // Node version
  if (oldConfig.nodeVersion !== newConfig.nodeVersion) {
    changedSections.push('nodeVersion');
  }

  // Docker platform
  if (oldConfig.dockerPlatform !== newConfig.dockerPlatform) {
    changedSections.push('dockerPlatform');
  }

  // Software
  const softwareKeys = Object.keys(oldConfig.software) as Array<keyof SoftwareConfig>;
  for (const key of softwareKeys) {
    if (oldConfig.software[key].enabled !== newConfig.software[key].enabled) {
      changedSections.push('software');
      break;
    }
  }

  // Custom APT packages
  if (!arraysEqual([...oldConfig.customAptPackages].sort(), [...newConfig.customAptPackages].sort())) {
    changedSections.push('customAptPackages');
  }

  // Custom NPM packages
  const oldNpm = oldConfig.customNpmPackages.map(p => `${p.name}:${p.installAs}`).sort();
  const newNpm = newConfig.customNpmPackages.map(p => `${p.name}:${p.installAs}`).sort();
  if (!arraysEqual(oldNpm, newNpm)) {
    changedSections.push('customNpmPackages');
  }

  // Custom RUN commands
  const oldRun = oldConfig.customRunCommands.map(c => `${c.command}:${c.runAs}`);
  const newRun = newConfig.customRunCommands.map(c => `${c.command}:${c.runAs}`);
  if (!arraysEqual(oldRun, newRun)) {
    changedSections.push('customRunCommands');
  }

  // Environment variables (keys only, values are sensitive)
  const oldEnvKeys = (oldConfig.envVariables ?? []).map(e => e.key).sort();
  const newEnvKeys = (newConfig.envVariables ?? []).map(e => e.key).sort();
  if (!arraysEqual(oldEnvKeys, newEnvKeys)) {
    changedSections.push('envVariables');
  }

  // Protected files
  const oldPaths = oldConfig.protectedFiles.map(f => f.path).sort();
  const newPaths = newConfig.protectedFiles.map(f => f.path).sort();
  if (!arraysEqual(oldPaths, newPaths)) {
    changedSections.push('protectedFiles');
  }

  // CLAUDE.md content
  if (oldConfig.claudeMdContent !== newConfig.claudeMdContent) {
    changedSections.push('claudeMdContent');
  }

  // Claude permissions
  if (!permissionsEqual(oldConfig.claudePermissions, newConfig.claudePermissions)) {
    changedSections.push('claudePermissions');
  }

  // DevContainer
  if (!devContainerEqual(oldConfig.devContainer, newConfig.devContainer)) {
    changedSections.push('devContainer');
  }

  return changedSections;
}

/**
 * Generates a human-readable description of changes between two configs.
 * Returns null if no changes detected.
 */
export function generateChangeDescription(
  oldConfig: AppConfig,
  newConfig: AppConfig
): string | null {
  const changes: string[] = [];

  // Base image
  if (oldConfig.baseImage !== newConfig.baseImage) {
    changes.push('baseImage');
  }

  // Node version
  if (oldConfig.nodeVersion !== newConfig.nodeVersion) {
    changes.push('nodeVersion');
  }

  // Docker platform
  if (oldConfig.dockerPlatform !== newConfig.dockerPlatform) {
    changes.push('dockerPlatform');
  }

  // Software - be specific about which software
  const softwareKeys = Object.keys(oldConfig.software) as Array<keyof SoftwareConfig>;
  const enabledSoftware: string[] = [];
  const disabledSoftware: string[] = [];
  for (const key of softwareKeys) {
    if (oldConfig.software[key].enabled !== newConfig.software[key].enabled) {
      if (newConfig.software[key].enabled) {
        enabledSoftware.push(key);
      } else {
        disabledSoftware.push(key);
      }
    }
  }
  if (enabledSoftware.length > 0) {
    changes.push(`softwareEnabled:${enabledSoftware.join(',')}`);
  }
  if (disabledSoftware.length > 0) {
    changes.push(`softwareDisabled:${disabledSoftware.join(',')}`);
  }

  // Custom APT packages
  const oldApt = new Set(oldConfig.customAptPackages);
  const newApt = new Set(newConfig.customAptPackages);
  const addedApt = [...newApt].filter(p => !oldApt.has(p));
  const removedApt = [...oldApt].filter(p => !newApt.has(p));
  if (addedApt.length > 0) {
    changes.push('aptPackagesAdded');
  }
  if (removedApt.length > 0) {
    changes.push('aptPackagesRemoved');
  }

  // Custom NPM packages
  const oldNpmNames = new Set(oldConfig.customNpmPackages.map(p => p.name));
  const newNpmNames = new Set(newConfig.customNpmPackages.map(p => p.name));
  const addedNpm = [...newNpmNames].filter(n => !oldNpmNames.has(n));
  const removedNpm = [...oldNpmNames].filter(n => !newNpmNames.has(n));
  if (addedNpm.length > 0) {
    changes.push('npmPackagesAdded');
  }
  if (removedNpm.length > 0) {
    changes.push('npmPackagesRemoved');
  }

  // Custom RUN commands
  const oldRunCount = oldConfig.customRunCommands.length;
  const newRunCount = newConfig.customRunCommands.length;
  if (newRunCount > oldRunCount) {
    changes.push('runCommandsAdded');
  } else if (newRunCount < oldRunCount) {
    changes.push('runCommandsRemoved');
  }

  // Environment variables
  const oldEnvKeys = new Set((oldConfig.envVariables ?? []).map(e => e.key));
  const newEnvKeys = new Set((newConfig.envVariables ?? []).map(e => e.key));
  const addedEnv = [...newEnvKeys].filter(k => !oldEnvKeys.has(k));
  const removedEnv = [...oldEnvKeys].filter(k => !newEnvKeys.has(k));
  if (addedEnv.length > 0) {
    changes.push('envVariablesAdded');
  }
  if (removedEnv.length > 0) {
    changes.push('envVariablesRemoved');
  }

  // Protected files
  const oldPathsSet = new Set(oldConfig.protectedFiles.map(f => f.path));
  const newPathsSet = new Set(newConfig.protectedFiles.map(f => f.path));
  const addedPaths = [...newPathsSet].filter(p => !oldPathsSet.has(p));
  const removedPaths = [...oldPathsSet].filter(p => !newPathsSet.has(p));
  if (addedPaths.length > 0) {
    changes.push('protectedFilesAdded');
  }
  if (removedPaths.length > 0) {
    changes.push('protectedFilesRemoved');
  }

  // CLAUDE.md
  if (oldConfig.claudeMdContent !== newConfig.claudeMdContent) {
    changes.push('claudeMdChanged');
  }

  // Permissions
  if (!permissionsEqual(oldConfig.claudePermissions, newConfig.claudePermissions)) {
    changes.push('permissionsChanged');
  }

  // DevContainer
  if (!devContainerEqual(oldConfig.devContainer, newConfig.devContainer)) {
    changes.push('devContainerChanged');
  }

  if (changes.length === 0) {
    return null;
  }

  // Return the first change as the primary description key
  // The UI will translate and may show "Multiple changes" if more than one
  if (changes.length === 1) {
    return changes[0];
  }

  return 'multipleChanges';
}

/**
 * Helper to compare two arrays for equality.
 */
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Helper to compare permissions objects.
 */
function permissionsEqual(
  a: AppConfig['claudePermissions'],
  b: AppConfig['claudePermissions']
): boolean {
  const serializeRules = (rules: Array<{ directive: string; pattern: string }>) =>
    rules.map(r => `${r.directive}:${r.pattern}`).sort().join('|');

  return (
    serializeRules(a.allow) === serializeRules(b.allow) &&
    serializeRules(a.ask) === serializeRules(b.ask) &&
    serializeRules(a.deny) === serializeRules(b.deny)
  );
}

/**
 * Helper to compare devContainer configs.
 */
function devContainerEqual(
  a: AppConfig['devContainer'],
  b: AppConfig['devContainer']
): boolean {
  if (a.enabled !== b.enabled) return false;
  if (a.name !== b.name) return false;
  if (a.postCreateScript !== b.postCreateScript) return false;
  if (a.postStartScript !== b.postStartScript) return false;
  if (a.postAttachScript !== b.postAttachScript) return false;

  const extA = a.extensions.map(e => e.extensionId).sort().join('|');
  const extB = b.extensions.map(e => e.extensionId).sort().join('|');
  if (extA !== extB) return false;

  const setA = a.settings.map(s => `${s.key}:${s.value}`).sort().join('|');
  const setB = b.settings.map(s => `${s.key}:${s.value}`).sort().join('|');
  if (setA !== setB) return false;

  const featA = a.features.map(f => f.feature).sort().join('|');
  const featB = b.features.map(f => f.feature).sort().join('|');
  if (featA !== featB) return false;

  const portsA = a.forwardedPorts.map(p => p.port).sort().join('|');
  const portsB = b.forwardedPorts.map(p => p.port).sort().join('|');
  if (portsA !== portsB) return false;

  return true;
}
