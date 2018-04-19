/**
 * Prevent a function from being called multiple times
 * repeatedly within a short time frame.
 *
 * @param {Function} fn
 * @param {Number} wait
 * @return {Function}
 */
const debounce = (fn, wait) => {
  let timeout = null;
  return (...args) => {
    const ctx = this;
    const later = () => {
      timeout = null;
      fn.apply(ctx, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Given an object, retrieve the value of a property
 * based on the given path (dot notation).
 *
 * @param {Object} obj - The object
 * @param {String} path - The property path to retrieve
 * @return {Any} - Returns the value if the property is defined
 */
const getOwnProp = (obj, path) => {
  try {
    const v = path.split('.').reduce((curr, next) => curr[next], obj);
    return v;
  } catch (err) {
    return undefined;
  }
};

/**
 * Given an object, checks to see if a property is set
 * based on the given path (dot notation).
 *
 * @param {Object} obj - The object
 * @param {String} path - The property path to check
 * @return {Boolean} - Returns true if the property is set
 */
const hasOwnProp = (obj, path) => {
  const v = getOwnProp(obj, path);
  return v !== undefined;
};

module.exports = {
  debounce,
  getOwnProp,
  hasOwnProp,
};
