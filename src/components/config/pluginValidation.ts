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
 * Validates a plugin identifier in the format "plugin-name@marketplace-name".
 * Both parts must be non-empty.
 *
 * @param name - The plugin identifier to validate
 * @returns true if the format is valid, false otherwise
 */
export function validatePluginName(name: string): boolean {
  // Empty string is valid (for new entries being edited)
  if (name.trim() === '') {
    return true;
  }

  // Must contain exactly one @ symbol
  const parts = name.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [pluginName, marketplaceName] = parts;

  // Both parts must be non-empty after trimming
  if (pluginName.trim() === '' || marketplaceName.trim() === '') {
    return false;
  }

  return true;
}

/**
 * Checks if a plugin name is complete and ready for installation.
 * Unlike validatePluginName, this returns false for empty strings.
 *
 * @param name - The plugin identifier to check
 * @returns true if the plugin name is complete and valid
 */
export function isPluginNameComplete(name: string): boolean {
  if (name.trim() === '') {
    return false;
  }

  return validatePluginName(name);
}
