import { ipcRenderer } from 'electron';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { UPDATE_RESULTS, RESET_RESULTS } from '../actions/types';
import { selectItem } from '../actions/creators';
import { IPC_WINDOW_EXPAND, IPC_WINDOW_COLLAPSE } from '../../../ipc';

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
export default function*() {
  yield [
    takeEvery(UPDATE_RESULTS, handleUpdateResults),
    takeEvery(RESET_RESULTS, handleCollapseWindow),
  ];
}
