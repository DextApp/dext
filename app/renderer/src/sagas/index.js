import { ipcRenderer } from 'electron';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  UPDATE_QUERY,
  RESET_QUERY,
  UPDATE_RESULTS,
  RESET_RESULTS,
} from '../actions/types';
import {
  resetResults,
  resetDetails,
} from '../actions/creators';
import {
  IPC_QUERY_COMMAND,
  IPC_WINDOW_EXPAND,
  IPC_WINDOW_COLLAPSE,
} from '../../../ipc';

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
export function* handleUpdateResults() {
  yield call(ipcRenderer.send, IPC_WINDOW_EXPAND);
  yield put(resetDetails());
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
    takeEvery(UPDATE_QUERY, handleQueryCommand),
    takeEvery(RESET_QUERY, handleResetQuery),
    takeEvery(UPDATE_RESULTS, handleUpdateResults),
    takeEvery(RESET_RESULTS, handleCollapseWindow),
  ];
}
