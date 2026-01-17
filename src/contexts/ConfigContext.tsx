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
  defaultSoftwareConfig,
  type AppConfig,
  type EnvVariable,
  type ProtectedFile,
  type SoftwareConfig,
  type SoftwarePackage,
} from '../types';
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
 * Storage format for persisted configuration.
 * Note: Environment variable values are NOT stored for security reasons.
 */
interface StoredConfig {
  baseImage?: string;
  nodeVersion?: string;
  software?: Partial<Record<keyof SoftwareConfig, { enabled?: boolean; version?: string }>>;
  envVariableKeys?: string[];
  protectedFilePaths?: string[];
  claudeMdContent?: string;
}

/**
 * Safely loads configuration from localStorage.
 * Returns default config if nothing is stored or parsing fails.
 */
function loadConfigFromStorage(): AppConfig {
  if (typeof window === 'undefined') {
    return defaultAppConfig;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultAppConfig;
    }

    const parsed: StoredConfig = JSON.parse(stored);

    // Merge stored values with defaults, validating each field
    const software: SoftwareConfig = { ...defaultSoftwareConfig };

    if (parsed.software && typeof parsed.software === 'object') {
      for (const key of Object.keys(defaultSoftwareConfig) as Array<keyof SoftwareConfig>) {
        const storedSoftware = parsed.software[key];
        if (storedSoftware && typeof storedSoftware === 'object') {
          software[key] = {
            ...defaultSoftwareConfig[key],
            enabled: typeof storedSoftware.enabled === 'boolean'
              ? storedSoftware.enabled
              : defaultSoftwareConfig[key].enabled,
            version: typeof storedSoftware.version === 'string'
              ? storedSoftware.version
              : defaultSoftwareConfig[key].version,
          };
        }
      }
    }

    // Restore env variables (keys only, values are empty)
    const envVariables: EnvVariable[] = Array.isArray(parsed.envVariableKeys)
      ? parsed.envVariableKeys
        .filter((key): key is string => typeof key === 'string' && key.length > 0)
        .map((key) => ({
          id: crypto.randomUUID(),
          key,
          value: '',
        }))
      : [];

    // Restore protected files
    const protectedFiles: ProtectedFile[] = Array.isArray(parsed.protectedFilePaths)
      ? parsed.protectedFilePaths
        .filter((path): path is string => typeof path === 'string' && path.length > 0)
        .map((path) => ({
          id: crypto.randomUUID(),
          path,
        }))
      : [];

    return {
      baseImage: typeof parsed.baseImage === 'string' ? parsed.baseImage : defaultAppConfig.baseImage,
      nodeVersion: typeof parsed.nodeVersion === 'string' ? parsed.nodeVersion : defaultAppConfig.nodeVersion,
      software,
      envVariables,
      protectedFiles,
      claudeMdContent: typeof parsed.claudeMdContent === 'string'
        ? parsed.claudeMdContent
        : defaultAppConfig.claudeMdContent,
    };
  } catch {
    // If parsing fails, return default config
    return defaultAppConfig;
  }
}

/**
 * Saves configuration to localStorage.
 * Note: Environment variable values are NOT stored for security reasons.
 */
function saveConfigToStorage(config: AppConfig): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const toStore: StoredConfig = {
      baseImage: config.baseImage,
      nodeVersion: config.nodeVersion,
      software: Object.fromEntries(
        (Object.keys(config.software) as Array<keyof SoftwareConfig>).map((key) => [
          key,
          {
            enabled: config.software[key].enabled,
            version: config.software[key].version,
          },
        ])
      ),
      // Only store keys, NOT values for security
      envVariableKeys: config.envVariables
        .map((env) => env.key)
        .filter((key) => key.length > 0),
      protectedFilePaths: config.protectedFiles
        .map((file) => file.path)
        .filter((path) => path.length > 0),
      claudeMdContent: config.claudeMdContent,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Silently fail if storage is not available
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

  // Software configuration actions
  const toggleSoftware = useCallback((softwareId: keyof SoftwareConfig) => {
    setConfig((prev) => ({
      ...prev,
      software: {
        ...prev.software,
        [softwareId]: {
          ...prev.software[softwareId],
          enabled: !prev.software[softwareId].enabled,
        } satisfies SoftwarePackage,
      },
    }));
  }, []);

  const setSoftwareVersion = useCallback(
    (softwareId: keyof SoftwareConfig, version: string) => {
      setConfig((prev) => ({
        ...prev,
        software: {
          ...prev.software,
          [softwareId]: {
            ...prev.software[softwareId],
            version,
          } satisfies SoftwarePackage,
        },
      }));
    },
    []
  );

  // Environment variables actions
  const addEnvVariable = useCallback(() => {
    const newVariable: EnvVariable = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
    };
    setConfig((prev) => ({
      ...prev,
      envVariables: [...prev.envVariables, newVariable],
    }));
  }, []);

  const updateEnvVariable = useCallback(
    (id: string, field: 'key' | 'value', value: string) => {
      setConfig((prev) => ({
        ...prev,
        envVariables: prev.envVariables.map((envVar) =>
          envVar.id === id ? { ...envVar, [field]: value } : envVar
        ),
      }));
    },
    []
  );

  const removeEnvVariable = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      envVariables: prev.envVariables.filter((envVar) => envVar.id !== id),
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
      toggleSoftware,
      setSoftwareVersion,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      resetConfig,
    }),
    [
      config,
      autosaveEnabled,
      setAutosaveEnabled,
      setBaseImage,
      setNodeVersion,
      toggleSoftware,
      setSoftwareVersion,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      resetConfig,
    ]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
