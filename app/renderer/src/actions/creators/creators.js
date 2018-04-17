import {
  UPDATE_RESULTS,
  RESET_RESULTS,
  SELECT_ITEM,
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  RESET_SELECTED_ITEM,
  SET_DETAILS,
  RESET_DETAILS,
  CLOSE_DETAILS,
  OPEN_DETAILS,
  SET_ACTIVE_KEY,
  CLEAR_ACTIVE_KEY,
  RESET_KEYS,
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

/**
 * Sets the details pane content
 *
 * @param {String} value
 * @return {Object}
 */
export function setDetails(value) {
  return { type: SET_DETAILS, value };
}

/**
 * Resets the details pane content
 *
 * @return {Object}
 */
export function resetDetails() {
  return { type: RESET_DETAILS };
}

/**
 * Closes the details pane
 *
 * @return {Object}
 */
export function closeDetails() {
  return { type: CLOSE_DETAILS };
}

/**
 * Opens the details pane
 *
 * @return {Object}
 */
export function openDetails() {
  return { type: OPEN_DETAILS };
}

/**
 * Sets the active key
 *
 * @param {String} key
 * @return {Object}
 */
export function setActiveKey(key) {
  return { type: SET_ACTIVE_KEY, key };
}

/**
 * Clears the active key
 *
 * @param {String} key
 * @return {Object}
 */
export function clearActiveKey(key) {
  return { type: CLEAR_ACTIVE_KEY, key };
}

/**
 * Resets all keys
 *
 * @param {String} key
 * @return {Object}
 */
export function resetKeys() {
  return { type: RESET_KEYS };
}
