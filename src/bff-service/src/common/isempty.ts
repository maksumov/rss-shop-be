/**
 * Check if object is empty
 * @param obj Object to check
 */

export const isEmpty = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
