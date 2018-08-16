/**
 * Parse data from clipboard.
 *
 * @param {string} data
 */
export function parse(data) {
  if (!data) {
    return '';
  }

  return data
    .replace(/[\n\r]+/g, '\n')
    .split('\n')
    .map(line => line.split('\t'));
}

/**
 * Stringify data for clipboard.
 *
 * @param {Array} data
 */
export function stringify(data) {
  return data.map(row => row.join('\t')).join('\n');
}
