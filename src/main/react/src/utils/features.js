/**
 * Checks if given feature is toggled.
 *
 * @param key {string} Feature key.
 * @returns True or false if feature is toggled.
 */
export function isFeatureToggled(key) {
  return !!bootstrap[key];
}

/**
 * Returns valueWhen if feature toggled or valueWhenNot if feature is not toggled.
 *
 * @param key Feature key.
 * @param valueWhen Value to return if feature is toggled.
 * @param valueWhenNot Value to return if feature is not toggled.
 * @returns valueWhen or valueWhenNot
 */
export function whenFeatureToggled(key, valueWhen, valueWhenNot) {
  return isFeatureToggled(key) ? valueWhen : valueWhenNot;
}
