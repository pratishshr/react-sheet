/**
 * Fills array from 1...N values
 * @example
 *  => fill(5)
 *  => [0, 1, 2, 3, 4]
 * @param {*} n
 */
export function fill(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(i);
  }

  return arr;
}
