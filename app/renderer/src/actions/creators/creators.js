import {
  UPDATE_RESULTS,
  RESET_RESULTS,
} from '../types';

/**
 * Updates the results
 *
 * @param {Object[]} results - The results array
 * @return {Object}
 */
export function updateResults(results) {
  return { type: UPDATE_RESULTS, results };
}

/**
 * Resets the results
 *
 * @return {Object}
 */
export function resetResults() {
  return { type: RESET_RESULTS };
}
