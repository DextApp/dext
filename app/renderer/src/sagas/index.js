import { ipcRenderer } from 'electron';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  UPDATE_QUERY,
  RESET_QUERY,
  UPDATE_RESULTS,
  RESET_RESULTS,
  SELECT_ITEM,
} from '../actions/types';
import {
  resetResults,
  selectItem,
  resetDetails,
} from '../actions/creators';
import {
  IPC_QUERY_COMMAND,
  IPC_WINDOW_EXPAND,
  IPC_WINDOW_COLLAPSE,
  IPC_ITEM_DETAILS_REQUEST,
} from '../../../ipc';

/**
 * Handles selecting an item
 *
 * @param {Object} action
 */
export function* handleSelectItem(action) {
  yield put(resetDetails());
  yield call(ipcRenderer.send, IPC_ITEM_DETAILS_REQUEST, action.item);
}

/**
 * Handles the making a query
 */
export function* handleQueryCommand(q) {
  yield call(ipcRenderer.send, IPC_QUERY_COMMAND, q);
}

/**
 * Handles the reset results action
 */
export function* handleResetQuery() {
  yield put(resetResults());
}

/**
 * Handles the update results action
 */
export function* handleUpdateResults(action) {
  yield call(ipcRenderer.send, IPC_WINDOW_EXPAND);
  // selects the first item
  const firstItem = action.results ? action.results[0] : null;
  if (firstItem) {
    yield put(selectItem(0, firstItem));
  }
}

/**
 * Handles the window collapse action
 */
export function* handleCollapseWindow() {
  yield call(ipcRenderer.send, IPC_WINDOW_COLLAPSE);
}

/**
 * Makes a query for each action dispatched
 */
export default function* () {
  yield [
    takeEvery(SELECT_ITEM, handleSelectItem),
    takeEvery(UPDATE_QUERY, handleQueryCommand),
    takeEvery(RESET_QUERY, handleResetQuery),
    takeEvery(UPDATE_RESULTS, handleUpdateResults),
    takeEvery(RESET_RESULTS, handleCollapseWindow),
  ];
}
