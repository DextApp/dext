const math = {};

let mockReturnValue = null;
let mockSetThrowError = false;

/**
 * Sets the mock return value
 *
 * @param {String} value
 */
math.mockSetReturnValue = (value) => {
  mockReturnValue = value;
};

/**
 * Sets the mock throw error flag
 *
 * @param {Boolean} flag
 */
math.mockSetThrowError = (flag) => {
  mockSetThrowError = flag;
};

/**
 * Evaluates the expression
 *
 * @return {String}
 */
math.eval = jest.fn((expression) => {
  if (mockSetThrowError) {
    throw new Error(true);
  }
  return mockReturnValue;
});

module.exports = math;
