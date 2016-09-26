import { SET_ACTIVE_KEY, CLEAR_ACTIVE_KEY } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_KEY:
      return state.concat([action.key]);
    case CLEAR_ACTIVE_KEY:
      return [
        ...state.slice(0, state.indexOf(action.key)),
        ...state.slice(state.indexOf(action.key) + 1),
      ];
    default:
      return state;
  }
}
