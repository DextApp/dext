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

module.exports = {
  debounce,
};
