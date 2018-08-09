/**
 * Parse data from clipboard
 *
 * @param {string} data
 */
export function parse(data) {
  if (!data) {
    return '';
  }

  return data.split('\n').map(line => line.split('\t'));
}
