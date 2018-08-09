/**
 * Copy text to clipboard.
 *
 * @returns {Promise}
 */
export function copy(text) {
  return navigator.clipboard.writeText(text);
}

/**
 * Read text from clipboard/
 *
 * @returns {Promise}
 */
export function read() {
  return navigator.clipboard.readText();
}
