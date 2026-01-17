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
 */
export interface SoftwarePackage {
  /** Unique identifier for the software */
  id: string;
  /** Whether the software is enabled for installation */
  enabled: boolean;
  /** Version to install (e.g., "latest", "3.12") */
  version: string;
  /** Whether version selection is available for this software */
  hasVersionSelection: boolean;
}

/**
 * Configuration for all available software packages.
 */
export interface SoftwareConfig {
  typescript: SoftwarePackage;
  ffmpeg: SoftwarePackage;
  imagemagick: SoftwarePackage;
  python: SoftwarePackage;
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
 * User context for installing NPM packages.
 */
export type NpmInstallUser = 'node' | 'root';

/**
 * A custom NPM package to install globally.
 */
export interface CustomNpmPackage {
  /** Unique identifier for the package (used as React key) */
  id: string;
  /** NPM package name (e.g., "typescript", "@scope/package") */
  name: string;
  /** User context for installation (node or root) */
  installAs: NpmInstallUser;
}

/**
 * Complete application configuration state.
 */
export interface AppConfig {
  /** Base image name (e.g., "node", "node-slim") */
  baseImage: string;
  /** Node.js version for the base image */
  nodeVersion: string;
  /** Software package configuration */
  software: SoftwareConfig;
  /** Custom APT packages to install */
  customAptPackages: string[];
  /** Custom NPM packages to install globally */
  customNpmPackages: CustomNpmPackage[];
  /** List of environment variables for .env file */
  envVariables: EnvVariable[];
  /** List of files to protect with .empty mount */
  protectedFiles: ProtectedFile[];
  /** Content of the CLAUDE.md file */
  claudeMdContent: string;
}

/**
 * Default software package configuration.
 */
export const defaultSoftwareConfig: SoftwareConfig = {
  typescript: {
    id: 'typescript',
    enabled: false,
    version: 'latest',
    hasVersionSelection: true,
  },
  ffmpeg: {
    id: 'ffmpeg',
    enabled: false,
    version: 'latest',
    hasVersionSelection: false,
  },
  imagemagick: {
    id: 'imagemagick',
    enabled: false,
    version: 'latest',
    hasVersionSelection: false,
  },
  python: {
    id: 'python',
    enabled: false,
    version: '3',
    hasVersionSelection: true,
  },
};

/**
 * Default application configuration.
 */
export const defaultAppConfig: AppConfig = {
  baseImage: 'node',
  nodeVersion: '24',
  software: defaultSoftwareConfig,
  customAptPackages: [],
  customNpmPackages: [],
  envVariables: [],
  protectedFiles: [],
  claudeMdContent: '# Project Instructions\n\n',
};
