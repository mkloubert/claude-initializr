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

/**
 * Configuration for a single software package that can be installed.
 * Version configuration is handled via Docker build arguments.
 */
export interface SoftwarePackage {
  /** Unique identifier for the software */
  id: string;
  /** Whether the software is enabled for installation */
  enabled: boolean;
  /** Optional list of software IDs that this package recommends (soft dependency) */
  recommends?: string[];
}

/**
 * Configuration for all available software packages.
 */
export interface SoftwareConfig {
  typescript: SoftwarePackage;
  ffmpeg: SoftwarePackage;
  imagemagick: SoftwarePackage;
  python: SoftwarePackage;
  uv: SoftwarePackage;
  golang: SoftwarePackage;
  flutter: SoftwarePackage;
  rust: SoftwarePackage;
}

/**
 * A single environment variable entry.
 */
export interface EnvVariable {
  /** Unique identifier for the variable (used as React key) */
  id: string;
  /** Environment variable name (e.g., "ANTHROPIC_API_KEY") */
  key: string;
  /** Environment variable value */
  value: string;
}

/**
 * A file path that should be protected (mounted as empty read-only).
 */
export interface ProtectedFile {
  /** Unique identifier for the file (used as React key) */
  id: string;
  /** Absolute path to the file (e.g., "/workspace/.env.local") */
  path: string;
}

/**
 * User context for installing NPM packages or running commands.
 */
export type DockerfileUser = 'node' | 'root';

/**
 * @deprecated Use DockerfileUser instead
 */
export type NpmInstallUser = DockerfileUser;

/**
 * A custom NPM package to install globally.
 */
export interface CustomNpmPackage {
  /** Unique identifier for the package (used as React key) */
  id: string;
  /** NPM package name (e.g., "typescript", "@scope/package") */
  name: string;
  /** User context for installation (node or root) */
  installAs: DockerfileUser;
}

/**
 * A custom RUN command for the Dockerfile.
 */
export interface CustomRunCommand {
  /** Unique identifier for the command (used as React key) */
  id: string;
  /** The shell command to execute (without RUN prefix) */
  command: string;
  /** User context for execution (node or root) */
  runAs: DockerfileUser;
}

/**
 * Permission directive types for Claude Code settings.
 * Reference: https://code.claude.com/docs/en/settings
 */
export type PermissionDirectiveType = 'Read' | 'Edit' | 'WebFetch';

/**
 * Permission category for organizing rules.
 */
export type PermissionCategory = 'allow' | 'ask' | 'deny';

/**
 * A single permission rule entry.
 */
export interface PermissionRule {
  /** Unique identifier for the rule (used as React key) */
  id: string;
  /** The directive type (Read, Edit, WebFetch) */
  directive: PermissionDirectiveType;
  /** The path or pattern argument (e.g., "src/**", ".env") */
  pattern: string;
}

/**
 * Claude Code settings.json permissions configuration.
 */
export interface ClaudePermissions {
  /** Rules for automatically allowed operations */
  allow: PermissionRule[];
  /** Rules that require user confirmation */
  ask: PermissionRule[];
  /** Rules that are always denied */
  deny: PermissionRule[];
}

/**
 * A Claude Code plugin to install from a marketplace.
 * Reference: https://code.claude.com/docs/en/plugin-marketplaces
 */
export interface PluginEntry {
  /** Unique identifier for the plugin entry (used as React key) */
  id: string;
  /** Plugin identifier in format "plugin-name@marketplace-name" */
  name: string;
}

/**
 * Default empty permissions configuration.
 */
export const defaultClaudePermissions: ClaudePermissions = {
  allow: [],
  ask: [],
  deny: [],
};

/**
 * Complete application configuration state.
 */
export interface AppConfig {
  /** Base image name (e.g., "node", "node-slim") */
  baseImage: string;
  /** Node.js version for the base image */
  nodeVersion: string;
  /** Docker platform for the dev service (e.g., "linux/amd64"), empty = not set */
  dockerPlatform: string;
  /** Software package configuration */
  software: SoftwareConfig;
  /** Custom APT packages to install */
  customAptPackages: string[];
  /** Custom NPM packages to install globally */
  customNpmPackages: CustomNpmPackage[];
  /** Custom RUN commands for the Dockerfile */
  customRunCommands: CustomRunCommand[];
  /** List of environment variables for .env file (undefined = use defaults on next load) */
  envVariables: EnvVariable[] | undefined;
  /** List of files to protect with .empty mount */
  protectedFiles: ProtectedFile[];
  /** Content of the CLAUDE.md file */
  claudeMdContent: string;
  /** Claude Code settings.json permissions */
  claudePermissions: ClaudePermissions;
  /** Claude Code plugins to install from marketplaces */
  plugins: PluginEntry[];
}

/**
 * Default software package configuration.
 */
export const defaultSoftwareConfig: SoftwareConfig = {
  typescript: {
    id: 'typescript',
    enabled: false,
  },
  ffmpeg: {
    id: 'ffmpeg',
    enabled: false,
  },
  imagemagick: {
    id: 'imagemagick',
    enabled: false,
  },
  python: {
    id: 'python',
    enabled: false,
  },
  uv: {
    id: 'uv',
    enabled: false,
    recommends: ['python'],
  },
  golang: {
    id: 'golang',
    enabled: false,
  },
  flutter: {
    id: 'flutter',
    enabled: false,
  },
  rust: {
    id: 'rust',
    enabled: false,
  },
};

/**
 * Default application configuration.
 */
export const defaultAppConfig: AppConfig = {
  baseImage: 'node',
  nodeVersion: '24',
  dockerPlatform: '',
  software: defaultSoftwareConfig,
  customAptPackages: [],
  customNpmPackages: [],
  customRunCommands: [],
  envVariables: undefined,
  protectedFiles: [],
  claudeMdContent: '# Project Instructions\n\n',
  claudePermissions: defaultClaudePermissions,
  plugins: [],
};

/**
 * Default telemetry-disabling environment variables for Claude Code.
 * These are automatically added when envVariables is undefined (initial load).
 */
export const defaultTelemetryEnvVariables: Array<{ key: string; value: string }> = [
  { key: 'CLAUDE_CODE_ENABLE_TELEMETRY', value: '0' },
  { key: 'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', value: '1' },
  { key: 'DISABLE_TELEMETRY', value: '1' },
  { key: 'DISABLE_ERROR_REPORTING', value: '1' },
  { key: 'DISABLE_BUG_COMMAND', value: '1' },
  { key: 'CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY', value: '1' },
];
