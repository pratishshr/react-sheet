/**
 * Returns an array containing number from start to end
 *
 * @example
 * getRange(1, 6)
 * => [1, 2, 3, 4, 5, 6]
 *
 * @param {number} start
 * @param {number} end
 */
export function getRange(start, end) {
  let startPos = start;
  let endPos = end;
  let arr = [];

  if (endPos < startPos) {
    startPos = end;
    endPos = start;
  }

  for (let i = startPos; i <= endPos; i++) {
    arr.push(i);
  }

  return arr;
}
