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

import { createContext } from 'react';
import type {
  AppConfig,
  DockerfileUser,
  PermissionCategory,
  PermissionDirectiveType,
  SoftwareConfig,
} from '../types';
import type { MarketplacePlugin } from '../services/marketplaceService';

/**
 * Context value interface for configuration state and actions.
 */
export interface ConfigContextValue {
  /** Current application configuration */
  config: AppConfig;

  /** Whether autosave to localStorage is enabled */
  autosaveEnabled: boolean;
  /** Toggle autosave on/off */
  setAutosaveEnabled: (enabled: boolean) => void;

  // Base image actions
  /** Update the base image name */
  setBaseImage: (image: string) => void;
  /** Update the Node.js version for the base image */
  setNodeVersion: (version: string) => void;
  /** Update the Docker platform (e.g., "linux/amd64") */
  setDockerPlatform: (platform: string) => void;

  // Software configuration actions
  /** Toggle a software package on/off */
  toggleSoftware: (softwareId: keyof SoftwareConfig) => void;

  // Custom APT packages actions
  /** Add custom APT packages (comma-separated input supported, duplicates ignored) */
  addCustomAptPackages: (packages: string) => void;
  /** Remove a custom APT package */
  removeCustomAptPackage: (packageName: string) => void;
  /** Get list of all APT packages (from software + custom) */
  getAllAptPackages: () => string[];

  // Custom NPM packages actions
  /** Add custom NPM packages (comma-separated input supported, duplicates ignored) */
  addCustomNpmPackages: (packages: string, installAs: DockerfileUser) => void;
  /** Remove a custom NPM package */
  removeCustomNpmPackage: (id: string) => void;
  /** Update the install user for a custom NPM package */
  updateCustomNpmPackageUser: (id: string, installAs: DockerfileUser) => void;

  // Custom RUN commands actions
  /** Add a custom RUN command */
  addCustomRunCommand: (command: string, runAs: DockerfileUser) => void;
  /** Remove a custom RUN command */
  removeCustomRunCommand: (id: string) => void;
  /** Update the command text for a custom RUN command */
  updateCustomRunCommandText: (id: string, command: string) => void;
  /** Update the run user for a custom RUN command */
  updateCustomRunCommandUser: (id: string, runAs: DockerfileUser) => void;

  // Environment variables actions
  /** Add a new environment variable */
  addEnvVariable: () => void;
  /** Update an existing environment variable */
  updateEnvVariable: (id: string, field: 'key' | 'value', value: string) => void;
  /** Remove an environment variable */
  removeEnvVariable: (id: string) => void;

  // Protected files actions
  /** Add a new protected file path */
  addProtectedFile: () => void;
  /** Update a protected file path */
  updateProtectedFile: (id: string, path: string) => void;
  /** Remove a protected file */
  removeProtectedFile: (id: string) => void;

  // CLAUDE.md actions
  /** Update the CLAUDE.md content */
  setClaudeMdContent: (content: string) => void;

  // Claude permissions actions
  /** Add a permission rule to a category */
  addPermissionRule: (category: PermissionCategory) => void;
  /** Update a permission rule's directive */
  updatePermissionDirective: (
    category: PermissionCategory,
    id: string,
    directive: PermissionDirectiveType
  ) => void;
  /** Update a permission rule's pattern */
  updatePermissionPattern: (
    category: PermissionCategory,
    id: string,
    pattern: string
  ) => void;
  /** Remove a permission rule */
  removePermissionRule: (category: PermissionCategory, id: string) => void;

  // Plugin actions
  /** Add a new plugin entry */
  addPlugin: () => void;
  /** Update a plugin's name */
  updatePlugin: (id: string, name: string) => void;
  /** Remove a plugin */
  removePlugin: (id: string) => void;
  /** Add a plugin from marketplace suggestion */
  addPluginFromSuggestion: (fullName: string) => void;

  // Marketplace plugin suggestions
  /** List of available plugin suggestions from marketplaces */
  marketplacePlugins: MarketplacePlugin[];
  /** Whether marketplace plugins are currently being loaded */
  marketplaceLoading: boolean;

  // Utility actions
  /** Reset configuration to defaults */
  resetConfig: () => void;
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);
