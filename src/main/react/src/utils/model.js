/**
 * Merges paginated model contents.
 *
 * @param prev Previous paginated model.
 * @param next Next paginated model.
 * @returns Merged paginated model.
 */
export function mergePaginatedModels(prev, next) {
  return {
    ...next,
    content: prev.content.concat(next.content)
  };
}