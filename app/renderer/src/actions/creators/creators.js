import {
  UPDATE_RESULTS,
  RESET_RESULTS,
  SELECT_ITEM,
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  RESET_SELECTED_ITEM,
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

/**
 * Resets the selected item
 *
 * @return {Object}
 */
export function resetSelectedItem() {
  return { type: RESET_SELECTED_ITEM };
}

/**
 * Selects the first item
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Object}
 */
export function selectItem(index, item) {
  return { type: SELECT_ITEM, index, item };
}

/**
 * Selects the previous item
 *
 * @return {Object}
 */
export function selectPreviousItem() {
  return { type: SELECT_PREVIOUS_ITEM };
}

/**
 * Selects the next item
 *
 * @return {Object}
 */
export function selectNextItem() {
  return { type: SELECT_NEXT_ITEM };
}
