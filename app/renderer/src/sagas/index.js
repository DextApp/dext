import { ipcRenderer } from 'electron';
import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { UPDATE_RESULTS, RESET_RESULTS } from '../actions/types';
import { IPC_WINDOW_EXPAND, IPC_WINDOW_COLLAPSE } from '../../../ipc';

/**
 * Handles the update results action
 */
export function* handleUpdateResults(action) {
  yield call(ipcRenderer.send, IPC_WINDOW_EXPAND);
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
