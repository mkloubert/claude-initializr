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

import axios from 'axios';

const CACHE_KEY = 'claude-initializr-marketplace-plugins';

/**
 * Response item from GitHub Contents API.
 */
interface GitHubContentItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

/**
 * A plugin suggestion from a marketplace.
 */
export interface MarketplacePlugin {
  /** Plugin name (directory name) */
  name: string;
  /** Full plugin identifier in format "plugin-name@marketplace-name" */
  fullName: string;
  /** URL to the plugin on GitHub */
  htmlUrl: string;
  /** Marketplace name this plugin belongs to */
  marketplace: string;
}

/**
 * Marketplace configuration.
 */
export interface MarketplaceConfig {
  /** Unique identifier for the marketplace */
  id: string;
  /** GitHub owner (organization or user) */
  owner: string;
  /** GitHub repository name */
  repo: string;
  /** Display name for the marketplace */
  displayName: string;
}

/**
 * Default marketplace configurations.
 * Currently only includes the official Anthropic marketplace.
 * Architecture is prepared for adding more marketplaces in the future.
 */
export const defaultMarketplaces: MarketplaceConfig[] = [
  {
    id: 'official',
    owner: 'anthropics',
    repo: 'claude-plugins-official',
    displayName: 'official',
  },
];

/**
 * Fetches plugins from a GitHub-based marketplace.
 * Only returns directories from the plugins folder.
 *
 * @param marketplace - The marketplace configuration
 * @returns Array of plugin suggestions, sorted alphabetically (case-insensitive)
 */
async function fetchPluginsFromMarketplace(
  marketplace: MarketplaceConfig
): Promise<MarketplacePlugin[]> {
  const url = `https://api.github.com/repos/${marketplace.owner}/${marketplace.repo}/contents/plugins`;

  const response = await axios.get<GitHubContentItem[]>(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    timeout: 10000,
  });

  return response.data
    .filter((item) => item.type === 'dir')
    .map((item) => ({
      name: item.name,
      fullName: `${item.name}@${marketplace.repo}`,
      htmlUrl: item.html_url,
      marketplace: marketplace.displayName,
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
}

/**
 * Loads cached plugins from sessionStorage.
 *
 * @returns Cached plugins array or null if cache is empty/invalid
 */
function loadFromCache(): MarketplacePlugin[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    const plugins = JSON.parse(cached) as MarketplacePlugin[];

    // Validate that we have at least one valid entry
    if (
      !Array.isArray(plugins) ||
      plugins.length === 0 ||
      !plugins.every(
        (p) =>
          typeof p.name === 'string' &&
          typeof p.fullName === 'string' &&
          typeof p.htmlUrl === 'string' &&
          typeof p.marketplace === 'string'
      )
    ) {
      return null;
    }

    return plugins;
  } catch {
    return null;
  }
}

/**
 * Saves plugins to sessionStorage cache.
 *
 * @param plugins - Array of plugins to cache
 */
function saveToCache(plugins: MarketplacePlugin[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(plugins));
  } catch {
    // Silent failure - caching is optional
  }
}

/**
 * Fetches all plugins from all configured marketplaces.
 * Uses sessionStorage cache to reduce GitHub API calls.
 * Only fetches from API if cache is empty or invalid.
 * Silently handles errors by logging them to console.warn.
 *
 * @param marketplaces - Array of marketplace configurations (defaults to official marketplace)
 * @returns Array of all plugin suggestions from all marketplaces, sorted alphabetically
 */
export async function fetchAllMarketplacePlugins(
  marketplaces: MarketplaceConfig[] = defaultMarketplaces
): Promise<MarketplacePlugin[]> {
  // Try to load from cache first
  const cached = loadFromCache();
  if (cached) {
    return cached;
  }

  // Cache miss - fetch from API
  const results: MarketplacePlugin[] = [];

  for (const marketplace of marketplaces) {
    try {
      const plugins = await fetchPluginsFromMarketplace(marketplace);
      results.push(...plugins);
    } catch (error) {
      // Silent failure with console.warn as per requirements
      console.warn(
        `Failed to fetch plugins from marketplace "${marketplace.displayName}":`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  // Sort all results alphabetically (case-insensitive)
  const sorted = results.sort((a, b) =>
    a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' })
  );

  // Save to cache if we got results
  if (sorted.length > 0) {
    saveToCache(sorted);
  }

  return sorted;
}
