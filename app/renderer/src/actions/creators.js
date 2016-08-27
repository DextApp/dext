import {
  UPDATE_QUERY,
  RESET_QUERY,
  UPDATE_RESULTS,
  RESET_RESULTS,
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  RESET_SELECTED_ITEM,
  SET_THEME,
} from './types';

/**
 * Updates the query value
 *
 * @param {String} q - The command query
 */
export function updateQuery(q) {
  return { type: UPDATE_QUERY, q };
}

/**
 * Resets the query value
 */
export function resetQuery() {
  return { type: RESET_QUERY };
}

/**
 * Updates the results
 *
 * @param {Object[]} results - The results array
 */
export function updateResults(results) {
  return { type: UPDATE_RESULTS, results };
}

/**
 * Resets the results
 */
export function resetResults() {
  return { type: RESET_RESULTS };
}

/**
 * Resets the selected item
 */
export function resetSelectedItem() {
  return { type: RESET_SELECTED_ITEM };
}

/**
 * Selects the previous item
 */
export function selectPreviousItem() {
  return { type: SELECT_PREVIOUS_ITEM };
}

/**
 * Selects the next item
 */
export function selectNextItem() {
  return { type: SELECT_NEXT_ITEM };
}

/**
 * Sets the theme
 *
 * @param {Object} theme
 */
export function setTheme(theme) {
  return { type: SET_THEME, theme };
}
