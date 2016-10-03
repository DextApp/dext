const math = {};

let mockReturnValue = null;
let mockSetThrowError = false;

/**
 * Sets the mock return value
 *
 * @param {String} value
 */
// eslint-disable-next-line no-underscore-dangle
math.__setReturnValue = (value) => {
  mockReturnValue = value;
};

/**
 * Sets the mock throw error flag
 *
 * @param {Boolean} flag
 */
// eslint-disable-next-line no-underscore-dangle
math.__setThrowError = (flag) => {
  mockSetThrowError = flag;
};

/**
 * Evaluates the expression
 *
 * @return {String}
 */
math.eval = jest.fn(() => {
  if (mockSetThrowError) {
    throw new Error(true);
  }
  return mockReturnValue;
});

module.exports = math;
