/**
 * Returns property value.
 *
 * @param propertyKey Key of the value.
 * @returns Property value.
 */
export function getProperty(propertyKey) {
  const value = bootstrap[propertyKey];
  if (value === undefined) {
    console.error('Unknown', propertyKey, 'property!');
  }

  return value;
}
