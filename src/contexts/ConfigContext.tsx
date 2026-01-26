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

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  defaultAppConfig,
  defaultClaudePermissions,
  defaultSoftwareConfig,
  defaultTelemetryEnvVariables,
  type AppConfig,
  type ClaudePermissions,
  type ConfigExportData,
  type CustomNpmPackage,
  type CustomRunCommand,
  type DockerfileUser,
  type EnvVariable,
  type PermissionCategory,
  type PermissionDirectiveType,
  type PermissionRule,
  type ProtectedFile,
  type SoftwareConfig,
} from '../types';
import { APP_VERSION } from '../config/env';
import { ConfigContext, type ConfigContextValue } from './configContextValue';

const STORAGE_KEY = 'claude-initializr-config';
const AUTOSAVE_KEY = 'claude-initializr-autosave';

/**
 * Loads autosave preference from localStorage.
 * Defaults to true (enabled).
 */
function loadAutosavePreference(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  try {
    const stored = localStorage.getItem(AUTOSAVE_KEY);
    return stored !== 'false'; // Default to true
  } catch {
    return true;
  }
}

/**
 * Saves autosave preference to localStorage.
 */
function saveAutosavePreference(enabled: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(AUTOSAVE_KEY, String(enabled));
  } catch {
    // Silently fail
  }
}

/**
 * Stored permission rule format (without id).
 */
interface StoredPermissionRule {
  directive: PermissionDirectiveType;
  pattern: string;
}

/**
 * Storage format for persisted configuration.
 * Note: Environment variable values are NOT stored for security reasons.
 * Note: Software versions are configured via Docker build arguments, not stored.
 */
interface StoredConfig {
  baseImage?: string;
  nodeVersion?: string;
  dockerPlatform?: string;
  software?: Partial<Record<keyof SoftwareConfig, { enabled?: boolean }>>;
  customAptPackages?: string[];
  customNpmPackages?: Array<{ name: string; installAs: DockerfileUser }>;
  customRunCommands?: Array<{ command: string; runAs: DockerfileUser }>;
  envVariableKeys?: string[];
  protectedFilePaths?: string[];
  claudeMdContent?: string;
  claudePermissions?: {
    allow?: StoredPermissionRule[];
    ask?: StoredPermissionRule[];
    deny?: StoredPermissionRule[];
  };
}

/**
 * Generates a unique ID, with fallback for environments without crypto.randomUUID.
 */
function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Fallback for older environments
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

/**
 * Ensures envVariables is initialized with default telemetry-disabling variables
 * if it's undefined or null.
 */
function ensureEnvVariables(config: AppConfig): AppConfig {
  if (config.envVariables === undefined || config.envVariables === null) {
    return {
      ...config,
      envVariables: defaultTelemetryEnvVariables.map((env) => ({
        id: generateId(),
        key: env.key,
        value: env.value,
      })),
    };
  }
  return config;
}

/**
 * Safely loads configuration from localStorage.
 * Returns default config if nothing is stored, parsing fails, or data is corrupted.
 * This function is designed to NEVER throw - it always returns a valid config.
 */
function loadConfigFromStorage(): AppConfig {
  // SSR safety check
  if (typeof window === 'undefined') {
    return ensureEnvVariables(defaultAppConfig);
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return ensureEnvVariables(defaultAppConfig);
    }

    const parsed: unknown = JSON.parse(stored);

    // Ensure parsed is a non-null object
    if (typeof parsed !== 'object' || parsed === null) {
      return ensureEnvVariables(defaultAppConfig);
    }

    // Type assertion after validation
    const data = parsed as Record<string, unknown>;

    // Merge stored values with defaults, validating each field
    const software: SoftwareConfig = { ...defaultSoftwareConfig };

    const softwareData = data.software;
    if (softwareData && typeof softwareData === 'object' && softwareData !== null) {
      const softwareRecord = softwareData as Record<string, unknown>;
      for (const key of Object.keys(defaultSoftwareConfig) as Array<keyof SoftwareConfig>) {
        const storedSoftware = softwareRecord[key];
        if (storedSoftware && typeof storedSoftware === 'object' && storedSoftware !== null) {
          const entry = storedSoftware as Record<string, unknown>;
          software[key] = {
            ...defaultSoftwareConfig[key],
            enabled: typeof entry.enabled === 'boolean'
              ? entry.enabled
              : defaultSoftwareConfig[key].enabled,
          };
        }
      }
    }

    // Restore custom APT packages
    const customAptPackages: string[] = Array.isArray(data.customAptPackages)
      ? data.customAptPackages.filter((pkg): pkg is string => typeof pkg === 'string' && pkg.length > 0)
      : [];

    // Restore custom NPM packages
    const customNpmPackages: CustomNpmPackage[] = Array.isArray(data.customNpmPackages)
      ? data.customNpmPackages
        .filter((pkg): pkg is { name: string; installAs: DockerfileUser } =>
          typeof pkg === 'object' &&
          pkg !== null &&
          typeof (pkg as Record<string, unknown>).name === 'string' &&
          ((pkg as Record<string, unknown>).name as string).length > 0 &&
          ((pkg as Record<string, unknown>).installAs === 'node' || (pkg as Record<string, unknown>).installAs === 'root')
        )
        .map((pkg) => ({
          id: generateId(),
          name: pkg.name,
          installAs: pkg.installAs,
        }))
      : [];

    // Restore custom RUN commands
    const customRunCommands: CustomRunCommand[] = Array.isArray(data.customRunCommands)
      ? data.customRunCommands
        .filter((cmd): cmd is { command: string; runAs: DockerfileUser } =>
          typeof cmd === 'object' &&
          cmd !== null &&
          typeof (cmd as Record<string, unknown>).command === 'string' &&
          ((cmd as Record<string, unknown>).command as string).length > 0 &&
          ((cmd as Record<string, unknown>).runAs === 'node' || (cmd as Record<string, unknown>).runAs === 'root')
        )
        .map((cmd) => ({
          id: generateId(),
          command: cmd.command,
          runAs: cmd.runAs,
        }))
      : [];

    // Restore env variables (keys only, values are empty)
    // If envVariableKeys exists in storage (even if empty), it means user has explicitly set them
    // If envVariableKeys doesn't exist, set to undefined (will be initialized at the end)
    const envVariables: EnvVariable[] | undefined = data.envVariableKeys !== undefined
      ? (Array.isArray(data.envVariableKeys)
        ? data.envVariableKeys
          .filter((key): key is string => typeof key === 'string' && key.length > 0)
          .map((key) => ({
            id: generateId(),
            key,
            value: '',
          }))
        : [])
      : undefined;

    // Restore protected files
    const protectedFiles: ProtectedFile[] = Array.isArray(data.protectedFilePaths)
      ? data.protectedFilePaths
        .filter((path): path is string => typeof path === 'string' && path.length > 0)
        .map((path) => ({
          id: generateId(),
          path,
        }))
      : [];

    // Helper to restore permission rules
    const restorePermissionRules = (rules: unknown): PermissionRule[] => {
      if (!Array.isArray(rules)) return [];
      return rules
        .filter((rule): rule is StoredPermissionRule =>
          typeof rule === 'object' &&
          rule !== null &&
          ['Read', 'Edit', 'WebFetch'].includes((rule as Record<string, unknown>).directive as string) &&
          typeof (rule as Record<string, unknown>).pattern === 'string'
        )
        .map((rule) => ({
          id: generateId(),
          directive: rule.directive,
          pattern: rule.pattern,
        }));
    };

    // Restore Claude permissions
    const storedPermissions = data.claudePermissions as StoredConfig['claudePermissions'];
    const claudePermissions: ClaudePermissions = storedPermissions && typeof storedPermissions === 'object'
      ? {
        allow: restorePermissionRules(storedPermissions.allow),
        ask: restorePermissionRules(storedPermissions.ask),
        deny: restorePermissionRules(storedPermissions.deny),
      }
      : defaultClaudePermissions;

    return ensureEnvVariables({
      baseImage: typeof data.baseImage === 'string' && data.baseImage.length > 0
        ? data.baseImage
        : defaultAppConfig.baseImage,
      nodeVersion: typeof data.nodeVersion === 'string' && data.nodeVersion.length > 0
        ? data.nodeVersion
        : defaultAppConfig.nodeVersion,
      dockerPlatform: typeof data.dockerPlatform === 'string'
        ? data.dockerPlatform
        : defaultAppConfig.dockerPlatform,
      software,
      customAptPackages,
      customNpmPackages,
      customRunCommands,
      envVariables,
      protectedFiles,
      claudeMdContent: typeof data.claudeMdContent === 'string'
        ? data.claudeMdContent
        : defaultAppConfig.claudeMdContent,
      claudePermissions,
    });
  } catch {
    // If anything fails, return default config with telemetry vars initialized
    return ensureEnvVariables(defaultAppConfig);
  }
}

/**
 * Saves configuration to localStorage.
 * Note: Environment variable values are NOT stored for security reasons.
 * This function is designed to NEVER throw - it silently fails on any error.
 */
function saveConfigToStorage(config: AppConfig): void {
  // SSR safety check
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Defensive checks to prevent crashes from corrupted state
    if (!config || typeof config !== 'object') {
      return;
    }

    const toStore: StoredConfig = {
      baseImage: typeof config.baseImage === 'string' ? config.baseImage : defaultAppConfig.baseImage,
      nodeVersion: typeof config.nodeVersion === 'string' ? config.nodeVersion : defaultAppConfig.nodeVersion,
      dockerPlatform: typeof config.dockerPlatform === 'string' ? config.dockerPlatform : defaultAppConfig.dockerPlatform,
      software: config.software && typeof config.software === 'object'
        ? Object.fromEntries(
          (Object.keys(defaultSoftwareConfig) as Array<keyof SoftwareConfig>).map((key) => [
            key,
            {
              enabled: config.software[key]?.enabled ?? defaultSoftwareConfig[key].enabled,
            },
          ])
        )
        : undefined,
      customAptPackages: Array.isArray(config.customAptPackages)
        ? config.customAptPackages.filter((pkg) => typeof pkg === 'string')
        : [],
      customNpmPackages: Array.isArray(config.customNpmPackages)
        ? config.customNpmPackages
          .filter((pkg) => pkg && typeof pkg === 'object' && typeof pkg.name === 'string')
          .map((pkg) => ({
            name: pkg.name,
            installAs: pkg.installAs === 'root' ? 'root' : 'node',
          }))
        : [],
      customRunCommands: Array.isArray(config.customRunCommands)
        ? config.customRunCommands
          .filter((cmd) => cmd && typeof cmd === 'object' && typeof cmd.command === 'string')
          .map((cmd) => ({
            command: cmd.command,
            runAs: cmd.runAs === 'root' ? 'root' : 'node',
          }))
        : [],
      // Only store keys, NOT values for security
      // If envVariables is undefined, don't store envVariableKeys to preserve "not yet initialized" state
      // If envVariables is an array (even empty), store the keys to preserve "explicitly set" state
      envVariableKeys: config.envVariables !== undefined && config.envVariables !== null
        ? config.envVariables
          .filter((env) => env && typeof env === 'object' && typeof env.key === 'string')
          .map((env) => env.key)
          .filter((key) => key.length > 0)
        : undefined,
      protectedFilePaths: Array.isArray(config.protectedFiles)
        ? config.protectedFiles
          .filter((file) => file && typeof file === 'object' && typeof file.path === 'string')
          .map((file) => file.path)
          .filter((path) => path.length > 0)
        : [],
      claudeMdContent: typeof config.claudeMdContent === 'string'
        ? config.claudeMdContent
        : defaultAppConfig.claudeMdContent,
      claudePermissions: config.claudePermissions && typeof config.claudePermissions === 'object'
        ? {
          allow: Array.isArray(config.claudePermissions.allow)
            ? config.claudePermissions.allow.map((rule) => ({
              directive: rule.directive,
              pattern: rule.pattern,
            }))
            : [],
          ask: Array.isArray(config.claudePermissions.ask)
            ? config.claudePermissions.ask.map((rule) => ({
              directive: rule.directive,
              pattern: rule.pattern,
            }))
            : [],
          deny: Array.isArray(config.claudePermissions.deny)
            ? config.claudePermissions.deny.map((rule) => ({
              directive: rule.directive,
              pattern: rule.pattern,
            }))
            : [],
        }
        : undefined,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Silently fail if storage is not available or any error occurs
  }
}

/**
 * Clears configuration from localStorage.
 */
function clearConfigFromStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * Provider component for application configuration state.
 */
export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>(loadConfigFromStorage);
  const [autosaveEnabled, setAutosaveEnabledState] = useState<boolean>(loadAutosavePreference);

  // Persist config changes to localStorage (only when autosave is enabled)
  useEffect(() => {
    if (autosaveEnabled) {
      saveConfigToStorage(config);
    }
  }, [config, autosaveEnabled]);

  // Handler for toggling autosave
  const setAutosaveEnabled = useCallback((enabled: boolean) => {
    setAutosaveEnabledState(enabled);
    saveAutosavePreference(enabled);
    if (enabled) {
      // If enabling autosave, immediately save current config
      saveConfigToStorage(config);
    } else {
      // If disabling autosave, clear stored config from localStorage
      clearConfigFromStorage();
    }
  }, [config]);

  // Base image actions
  const setBaseImage = useCallback((image: string) => {
    setConfig((prev) => ({
      ...prev,
      baseImage: image,
    }));
  }, []);

  const setNodeVersion = useCallback((version: string) => {
    setConfig((prev) => ({
      ...prev,
      nodeVersion: version,
    }));
  }, []);

  const setDockerPlatform = useCallback((platform: string) => {
    setConfig((prev) => ({
      ...prev,
      dockerPlatform: platform,
    }));
  }, []);

  // Software configuration actions
  const toggleSoftware = useCallback((softwareId: keyof SoftwareConfig) => {
    setConfig((prev) => ({
      ...prev,
      software: {
        ...prev.software,
        [softwareId]: {
          ...prev.software[softwareId],
          enabled: !prev.software[softwareId].enabled,
        },
      },
    }));
  }, []);

  // Helper function to get all APT packages from enabled software
  const getBuiltInAptPackages = useCallback((software: SoftwareConfig): string[] => {
    const packages: string[] = [];
    if (software.ffmpeg.enabled) {
      packages.push('ffmpeg');
    }
    if (software.imagemagick.enabled) {
      packages.push('imagemagick');
    }
    if (software.python.enabled) {
      // Python packages use variable substitution, but we track the base names
      packages.push('python3', 'python3-pip', 'python3-venv');
    }
    return packages;
  }, []);

  // Custom APT packages actions
  const addCustomAptPackages = useCallback((input: string) => {
    setConfig((prev) => {
      // Parse comma-separated input and clean up package names
      const newPackages = input
        .split(',')
        .map((pkg) => pkg.trim().toLowerCase())
        .filter((pkg) => pkg.length > 0 && /^[a-z0-9][a-z0-9+.-]*$/.test(pkg));

      if (newPackages.length === 0) {
        return prev;
      }

      // Get all existing packages (built-in + custom)
      const builtInPackages = getBuiltInAptPackages(prev.software);
      const existingPackages = new Set([
        ...builtInPackages,
        ...prev.customAptPackages,
      ]);

      // Filter out duplicates
      const uniqueNewPackages = newPackages.filter((pkg) => !existingPackages.has(pkg));

      if (uniqueNewPackages.length === 0) {
        return prev;
      }

      return {
        ...prev,
        customAptPackages: [...prev.customAptPackages, ...uniqueNewPackages].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: 'base' })
        ),
      };
    });
  }, [getBuiltInAptPackages]);

  const removeCustomAptPackage = useCallback((packageName: string) => {
    setConfig((prev) => ({
      ...prev,
      customAptPackages: prev.customAptPackages.filter((pkg) => pkg !== packageName),
    }));
  }, []);

  const getAllAptPackages = useCallback((): string[] => {
    const builtInPackages = getBuiltInAptPackages(config.software);
    return [...new Set([...builtInPackages, ...config.customAptPackages])].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );
  }, [config.software, config.customAptPackages, getBuiltInAptPackages]);

  // Custom NPM packages actions
  const addCustomNpmPackages = useCallback((input: string, installAs: DockerfileUser) => {
    setConfig((prev) => {
      // Parse comma-separated input and clean up package names
      // NPM package names can include @scope/name format
      const newPackages = input
        .split(',')
        .map((pkg) => pkg.trim())
        .filter((pkg) => pkg.length > 0 && /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(pkg));

      if (newPackages.length === 0) {
        return prev;
      }

      // Get existing package names
      const existingNames = new Set(prev.customNpmPackages.map((pkg) => pkg.name));

      // Filter out duplicates
      const uniqueNewPackages = newPackages.filter((pkg) => !existingNames.has(pkg));

      if (uniqueNewPackages.length === 0) {
        return prev;
      }

      const newNpmPackages: CustomNpmPackage[] = uniqueNewPackages.map((name) => ({
        id: crypto.randomUUID(),
        name,
        installAs,
      }));

      return {
        ...prev,
        customNpmPackages: [...prev.customNpmPackages, ...newNpmPackages].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        ),
      };
    });
  }, []);

  const removeCustomNpmPackage = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      customNpmPackages: prev.customNpmPackages.filter((pkg) => pkg.id !== id),
    }));
  }, []);

  const updateCustomNpmPackageUser = useCallback((id: string, installAs: DockerfileUser) => {
    setConfig((prev) => ({
      ...prev,
      customNpmPackages: prev.customNpmPackages.map((pkg) =>
        pkg.id === id ? { ...pkg, installAs } : pkg
      ),
    }));
  }, []);

  // Custom RUN commands actions
  const addCustomRunCommand = useCallback((command: string, runAs: DockerfileUser) => {
    setConfig((prev) => {
      const trimmedCommand = command.trim();
      if (trimmedCommand.length === 0) {
        return prev;
      }

      const newCommand: CustomRunCommand = {
        id: crypto.randomUUID(),
        command: trimmedCommand,
        runAs,
      };

      return {
        ...prev,
        customRunCommands: [...prev.customRunCommands, newCommand],
      };
    });
  }, []);

  const removeCustomRunCommand = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      customRunCommands: prev.customRunCommands.filter((cmd) => cmd.id !== id),
    }));
  }, []);

  const updateCustomRunCommandText = useCallback((id: string, command: string) => {
    setConfig((prev) => ({
      ...prev,
      customRunCommands: prev.customRunCommands.map((cmd) =>
        cmd.id === id ? { ...cmd, command } : cmd
      ),
    }));
  }, []);

  const updateCustomRunCommandUser = useCallback((id: string, runAs: DockerfileUser) => {
    setConfig((prev) => ({
      ...prev,
      customRunCommands: prev.customRunCommands.map((cmd) =>
        cmd.id === id ? { ...cmd, runAs } : cmd
      ),
    }));
  }, []);

  // Environment variables actions
  const addEnvVariable = useCallback(() => {
    const newVariable: EnvVariable = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
    };
    setConfig((prev) => ({
      ...prev,
      envVariables: [...(prev.envVariables ?? []), newVariable],
    }));
  }, []);

  const updateEnvVariable = useCallback(
    (id: string, field: 'key' | 'value', value: string) => {
      setConfig((prev) => ({
        ...prev,
        envVariables: (prev.envVariables ?? []).map((envVar) =>
          envVar.id === id ? { ...envVar, [field]: value } : envVar
        ),
      }));
    },
    []
  );

  const removeEnvVariable = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      envVariables: (prev.envVariables ?? []).filter((envVar) => envVar.id !== id),
    }));
  }, []);

  // Protected files actions
  const addProtectedFile = useCallback(() => {
    const newFile: ProtectedFile = {
      id: crypto.randomUUID(),
      path: '',
    };
    setConfig((prev) => ({
      ...prev,
      protectedFiles: [...prev.protectedFiles, newFile],
    }));
  }, []);

  const updateProtectedFile = useCallback((id: string, path: string) => {
    setConfig((prev) => ({
      ...prev,
      protectedFiles: prev.protectedFiles.map((file) =>
        file.id === id ? { ...file, path } : file
      ),
    }));
  }, []);

  const removeProtectedFile = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      protectedFiles: prev.protectedFiles.filter((file) => file.id !== id),
    }));
  }, []);

  // CLAUDE.md actions
  const setClaudeMdContent = useCallback((content: string) => {
    setConfig((prev) => ({
      ...prev,
      claudeMdContent: content,
    }));
  }, []);

  // Claude permissions actions
  const addPermissionRule = useCallback((category: PermissionCategory) => {
    const newRule: PermissionRule = {
      id: crypto.randomUUID(),
      directive: 'Read',
      pattern: '',
    };
    setConfig((prev) => ({
      ...prev,
      claudePermissions: {
        ...prev.claudePermissions,
        [category]: [...prev.claudePermissions[category], newRule],
      },
    }));
  }, []);

  const updatePermissionDirective = useCallback(
    (category: PermissionCategory, id: string, directive: PermissionDirectiveType) => {
      setConfig((prev) => ({
        ...prev,
        claudePermissions: {
          ...prev.claudePermissions,
          [category]: prev.claudePermissions[category].map((rule) =>
            rule.id === id ? { ...rule, directive } : rule
          ),
        },
      }));
    },
    []
  );

  const updatePermissionPattern = useCallback(
    (category: PermissionCategory, id: string, pattern: string) => {
      setConfig((prev) => ({
        ...prev,
        claudePermissions: {
          ...prev.claudePermissions,
          [category]: prev.claudePermissions[category].map((rule) =>
            rule.id === id ? { ...rule, pattern } : rule
          ),
        },
      }));
    },
    []
  );

  const removePermissionRule = useCallback((category: PermissionCategory, id: string) => {
    setConfig((prev) => ({
      ...prev,
      claudePermissions: {
        ...prev.claudePermissions,
        [category]: prev.claudePermissions[category].filter((rule) => rule.id !== id),
      },
    }));
  }, []);

  // Import/Export actions
  const exportConfig = useCallback(() => {
    const exportData: ConfigExportData = {
      version: '1.0',
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      config: {
        ...config,
        envVariables: config.envVariables
          ?.filter((env) => env.key.trim() && /^[A-Za-z_][A-Za-z0-9_]*$/.test(env.key.trim()))
          .map((env) => ({
            ...env,
            key: env.key.trim(),
            value: '',
          })),
      },
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'claude-initializr-config.json';
    link.click();

    URL.revokeObjectURL(url);
  }, [config]);

  const importConfig = useCallback((data: AppConfig) => {
    const regenerateId = (): string => {
      try {
        return crypto.randomUUID();
      } catch {
        return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      }
    };

    const imported: AppConfig = {
      ...data,
      customNpmPackages: data.customNpmPackages.map((pkg) => ({
        ...pkg,
        id: regenerateId(),
      })),
      customRunCommands: data.customRunCommands.map((cmd) => ({
        ...cmd,
        id: regenerateId(),
      })),
      envVariables: data.envVariables?.map((env) => ({
        ...env,
        id: regenerateId(),
        value: '',
      })),
      protectedFiles: data.protectedFiles.map((file) => ({
        ...file,
        id: regenerateId(),
      })),
      claudePermissions: {
        allow: data.claudePermissions.allow.map((rule) => ({
          ...rule,
          id: regenerateId(),
        })),
        ask: data.claudePermissions.ask.map((rule) => ({
          ...rule,
          id: regenerateId(),
        })),
        deny: data.claudePermissions.deny.map((rule) => ({
          ...rule,
          id: regenerateId(),
        })),
      },
    };

    setConfig(imported);
  }, []);

  // Utility actions
  const resetConfig = useCallback(() => {
    setConfig(defaultAppConfig);
  }, []);

  const value = useMemo<ConfigContextValue>(
    () => ({
      config,
      autosaveEnabled,
      setAutosaveEnabled,
      setBaseImage,
      setNodeVersion,
      setDockerPlatform,
      toggleSoftware,
      addCustomAptPackages,
      removeCustomAptPackage,
      getAllAptPackages,
      addCustomNpmPackages,
      removeCustomNpmPackage,
      updateCustomNpmPackageUser,
      addCustomRunCommand,
      removeCustomRunCommand,
      updateCustomRunCommandText,
      updateCustomRunCommandUser,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      addPermissionRule,
      updatePermissionDirective,
      updatePermissionPattern,
      removePermissionRule,
      exportConfig,
      importConfig,
      resetConfig,
    }),
    [
      config,
      autosaveEnabled,
      setAutosaveEnabled,
      setBaseImage,
      setNodeVersion,
      setDockerPlatform,
      toggleSoftware,
      addCustomAptPackages,
      removeCustomAptPackage,
      getAllAptPackages,
      addCustomNpmPackages,
      removeCustomNpmPackage,
      updateCustomNpmPackageUser,
      addCustomRunCommand,
      removeCustomRunCommand,
      updateCustomRunCommandText,
      updateCustomRunCommandUser,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      addPermissionRule,
      updatePermissionDirective,
      updatePermissionPattern,
      removePermissionRule,
      exportConfig,
      importConfig,
      resetConfig,
    ]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
