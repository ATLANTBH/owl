/**
 * Capitalizes input string, ie passed -> Passed
 *
 * @param str Input string.
 * @returns Capitalized string.
 */
export function capitalize(str) {
  if (str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
  }

  return str;
}

/**
 * Shortens input string to a length  of len.
 *
 * @param str Input string.
 * @param len Length to shorten this string.
 * @returns {string} Shorten string.
 */
export function shortString(str, len) {
  if (str) {
    return str.substr(0, len);
  }
  return str;
}
