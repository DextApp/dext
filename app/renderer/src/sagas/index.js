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
} from '../actions/creators';
import {
  IPC_QUERY_COMMAND,
  IPC_WINDOW_EXPAND,
  IPC_WINDOW_COLLAPSE,
} from '../../../ipc';

/**
 * Makes a query
 */
export function* queryCommand(q) {
  yield call(ipcRenderer.send, IPC_QUERY_COMMAND, q);
}

/**
 * Resets the results
 */
export function* resetQuery() {
  yield put(resetResults());
}

/**
 * Expands the window
 */
export function* expandWindow() {
  yield call(ipcRenderer.send, IPC_WINDOW_EXPAND);
}

/**
 * Collapases the window
 */
export function* collapseWindow() {
  yield call(ipcRenderer.send, IPC_WINDOW_COLLAPSE);
}

/**
 * Makes a query for each action dispatched
 */
export default function* () {
  yield [
    takeEvery(UPDATE_QUERY, queryCommand),
    takeEvery(RESET_QUERY, resetQuery),
    takeEvery(UPDATE_RESULTS, expandWindow),
    takeEvery(RESET_RESULTS, collapseWindow),
  ];
}
