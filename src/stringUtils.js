/**
 * 文字列を逆順にする
 * @param {string} str - 対象の文字列
 * @returns {string} 逆順にした文字列
 */
function reverse(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.split('').reverse().join('');
}

/**
 * 各単語の最初の文字を大文字にする
 * @param {string} str - 対象の文字列
 * @returns {string} 各単語の最初の文字を大文字にした文字列
 */
function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * 指定文字の出現回数をカウント
 * @param {string} str - 対象の文字列
 * @param {string} char - カウントする文字
 * @returns {number} 出現回数
 */
function count(str, char) {
  if (typeof str !== 'string' || typeof char !== 'string') {
    throw new Error('Both arguments must be strings');
  }
  if (char.length !== 1) {
    throw new Error('Second argument must be a single character');
  }
  return str.split(char).length - 1;
}

/**
 * 指定長で切り詰める（省略記号付き）
 * @param {string} str - 対象の文字列
 * @param {number} length - 切り詰める長さ
 * @returns {string} 切り詰めた文字列
 */
function truncate(str, length) {
  if (typeof str !== 'string') {
    throw new Error('First argument must be a string');
  }
  if (!Number.isInteger(length) || length < 0) {
    throw new Error('Length must be a non-negative integer');
  }
  
  if (str.length <= length) {
    return str;
  }
  
  if (length <= 3) {
    return '...';
  }
  
  return str.slice(0, length - 3) + '...';
}

module.exports = {
  reverse,
  capitalize,
  count,
  truncate
};