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

import { z } from 'zod';
import type { AppConfig, ConfigExportData } from '../types';

// ---------------------------------------------------------------------------
// Validation regex patterns (consistent with existing codebase validation)
// ---------------------------------------------------------------------------

const APT_PACKAGE_REGEX = /^[a-z0-9][a-z0-9+.-]*$/;
const NPM_PACKAGE_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const ENV_KEY_REGEX = /^[A-Za-z_][A-Za-z0-9_]*$/;

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const softwarePackageSchema = z.object({
  id: z.string(),
  enabled: z.boolean(),
  recommends: z.array(z.string()).optional(),
});

const softwareConfigSchema = z.object({
  typescript: softwarePackageSchema,
  ffmpeg: softwarePackageSchema,
  imagemagick: softwarePackageSchema,
  python: softwarePackageSchema,
  uv: softwarePackageSchema,
  golang: softwarePackageSchema,
  flutter: softwarePackageSchema,
  rust: softwarePackageSchema,
});

const envVariableSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

const protectedFileSchema = z.object({
  id: z.string(),
  path: z.string(),
});

const customNpmPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  installAs: z.enum(['node', 'root']),
});

const customRunCommandSchema = z.object({
  id: z.string(),
  command: z.string(),
  runAs: z.enum(['node', 'root']),
});

const permissionRuleSchema = z.object({
  id: z.string(),
  directive: z.enum(['Read', 'Edit', 'WebFetch']),
  pattern: z.string(),
});

const claudePermissionsSchema = z.object({
  allow: z.array(permissionRuleSchema),
  ask: z.array(permissionRuleSchema),
  deny: z.array(permissionRuleSchema),
});

// DevContainer schemas
const vscodeExtensionSchema = z.object({
  id: z.string(),
  extensionId: z.string(),
});

const vscodeSettingSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

const devContainerFeatureSchema = z.object({
  id: z.string(),
  feature: z.string(),
});

const forwardedPortSchema = z.object({
  id: z.string(),
  port: z.number().int().min(1).max(65535),
});

const devContainerConfigSchema = z.object({
  enabled: z.boolean(),
  name: z.string(),
  extensions: z.array(vscodeExtensionSchema),
  settings: z.array(vscodeSettingSchema),
  features: z.array(devContainerFeatureSchema),
  forwardedPorts: z.array(forwardedPortSchema),
  postCreateScript: z.string(),
  postStartScript: z.string(),
  postAttachScript: z.string(),
});

const appConfigSchema = z.object({
  baseImage: z.string(),
  nodeVersion: z.string(),
  dockerPlatform: z.string(),
  software: softwareConfigSchema,
  customAptPackages: z.array(z.string()),
  customNpmPackages: z.array(customNpmPackageSchema),
  customRunCommands: z.array(customRunCommandSchema),
  envVariables: z.array(envVariableSchema).optional(),
  protectedFiles: z.array(protectedFileSchema),
  claudeMdContent: z.string(),
  claudePermissions: claudePermissionsSchema,
  devContainer: devContainerConfigSchema.optional(),
});

const configExportDataSchema = z.object({
  version: z.string(),
  appVersion: z.string(),
  exportedAt: z.string(),
  config: appConfigSchema,
});

// ---------------------------------------------------------------------------
// Security sanitization
// ---------------------------------------------------------------------------

const MAX_COMMAND_LENGTH = 4096;
const MAX_SCRIPT_LENGTH = 32768; // 32KB for lifecycle scripts

/**
 * Sanitizes a file path by rejecting path traversal and absolute paths.
 * Returns the cleaned path or an empty string if invalid.
 */
export function sanitizePath(path: string): string {
  const trimmed = path.trim();

  if (!trimmed) {
    return '';
  }

  // Reject absolute paths
  if (trimmed.startsWith('/')) {
    return '';
  }

  // Reject path traversal
  if (trimmed.includes('..')) {
    return '';
  }

  // Reject null bytes
  if (trimmed.includes('\0')) {
    return '';
  }

  return trimmed;
}

/**
 * Sanitizes a shell command by trimming and limiting length.
 */
export function sanitizeCommand(command: string): string {
  const trimmed = command.trim();

  if (!trimmed) {
    return '';
  }

  // Reject null bytes
  if (trimmed.includes('\0')) {
    return '';
  }

  // Limit length
  if (trimmed.length > MAX_COMMAND_LENGTH) {
    return trimmed.slice(0, MAX_COMMAND_LENGTH);
  }

  return trimmed;
}

/**
 * Sanitizes a bash script by removing null bytes and limiting length.
 * Preserves whitespace and newlines as they are significant in scripts.
 */
export function sanitizeScript(script: string): string {
  if (!script) {
    return '';
  }

  // Reject null bytes
  if (script.includes('\0')) {
    return script.replace(/\0/g, '');
  }

  // Limit length
  if (script.length > MAX_SCRIPT_LENGTH) {
    return script.slice(0, MAX_SCRIPT_LENGTH);
  }

  return script;
}

/**
 * Applies security sanitization across all fields of an AppConfig.
 * Removes invalid entries and strips environment variable values.
 */
export function sanitizeConfig(config: AppConfig): AppConfig {
  return {
    ...config,

    // Sanitize and filter APT packages
    customAptPackages: config.customAptPackages.filter(
      (pkg) => APT_PACKAGE_REGEX.test(pkg.trim())
    ),

    // Sanitize and filter NPM packages
    customNpmPackages: config.customNpmPackages.filter(
      (pkg) => NPM_PACKAGE_REGEX.test(pkg.name.trim())
    ),

    // Sanitize RUN commands
    customRunCommands: config.customRunCommands
      .map((cmd) => ({
        ...cmd,
        command: sanitizeCommand(cmd.command),
      }))
      .filter((cmd) => cmd.command.length > 0),

    // Strip env variable values for security, keep only keys
    envVariables: config.envVariables
      ?.map((env) => ({
        ...env,
        key: env.key.trim(),
        value: '',
      }))
      ?.filter((env) => !env.key || ENV_KEY_REGEX.test(env.key)),

    // Sanitize protected file paths
    protectedFiles: config.protectedFiles
      .map((file) => ({
        ...file,
        path: sanitizePath(file.path),
      }))
      .filter((file) => file.path.length > 0),

    // Sanitize permission rule patterns
    claudePermissions: {
      allow: config.claudePermissions.allow
        .map((rule) => ({
          ...rule,
          pattern: sanitizePath(rule.pattern) || rule.pattern.trim(),
        }))
        .filter((rule) => rule.pattern.length > 0),
      ask: config.claudePermissions.ask
        .map((rule) => ({
          ...rule,
          pattern: sanitizePath(rule.pattern) || rule.pattern.trim(),
        }))
        .filter((rule) => rule.pattern.length > 0),
      deny: config.claudePermissions.deny
        .map((rule) => ({
          ...rule,
          pattern: sanitizePath(rule.pattern) || rule.pattern.trim(),
        }))
        .filter((rule) => rule.pattern.length > 0),
    },

    // Sanitize DevContainer config if present
    devContainer: config.devContainer
      ? {
        ...config.devContainer,
        name: config.devContainer.name.trim(),
        // Filter extensions with valid format (publisher.extension-name)
        extensions: config.devContainer.extensions.filter((ext) =>
          /^[a-z0-9-]+\.[a-z0-9-]+$/i.test(ext.extensionId.trim())
        ),
        // Filter settings with valid keys
        settings: config.devContainer.settings.filter(
          (setting) => setting.key.trim().length > 0
        ),
        // Filter features with valid format (ghcr.io/... or similar)
        features: config.devContainer.features.filter(
          (feat) => feat.feature.trim().length > 0
        ),
        // Filter ports with valid range
        forwardedPorts: config.devContainer.forwardedPorts.filter(
          (p) => p.port >= 1 && p.port <= 65535
        ),
        // Sanitize lifecycle scripts
        postCreateScript: sanitizeScript(config.devContainer.postCreateScript),
        postStartScript: sanitizeScript(config.devContainer.postStartScript),
        postAttachScript: sanitizeScript(config.devContainer.postAttachScript),
      }
      : config.devContainer,
  };
}

// ---------------------------------------------------------------------------
// Import validation
// ---------------------------------------------------------------------------

/**
 * Result type for import validation.
 */
export type ValidateImportResult =
  | { success: true; data: ConfigExportData }
  | { success: false; errors: string[] };

/**
 * Validates and sanitizes imported configuration data.
 * Returns the validated and sanitized data on success, or a list of errors on failure.
 */
export function validateImportData(data: unknown): ValidateImportResult {
  const result = configExportDataSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) => `${issue.path.join('.')}: ${issue.message}`
    );
    return { success: false, errors };
  }

  const sanitizedConfig = sanitizeConfig(result.data.config as AppConfig);

  return {
    success: true,
    data: {
      ...result.data,
      config: sanitizedConfig,
    } as ConfigExportData,
  };
}
