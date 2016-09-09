import {
  UPDATE_QUERY,
  RESET_QUERY,
  UPDATE_RESULTS,
  RESET_RESULTS,
  SELECT_ITEM,
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  RESET_SELECTED_ITEM,
  SET_THEME,
  SET_DETAILS,
  RESET_DETAILS,
  CLOSE_DETAILS,
  OPEN_DETAILS,
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
 * Selects the first item
 *
 * @param {Number} index
 * @param {Object} item
 */
export function selectItem(index, item) {
  return { type: SELECT_ITEM, index, item };
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

/**
 * Sets the details pane content
 *
 * @param {String} value
 */
export function setDetails(value) {
  return { type: SET_DETAILS, value };
}

/**
 * Resets the details pane content
 */
export function resetDetails() {
  return { type: RESET_DETAILS };
}

/**
 * Closes the details pane
 */
export function closeDetails() {
  return { type: CLOSE_DETAILS };
}

/**
 * Opens the details pane
 */
export function openDetails() {
  return { type: OPEN_DETAILS };
}
