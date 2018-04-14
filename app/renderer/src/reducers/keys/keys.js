import {
  SET_ACTIVE_KEY,
  CLEAR_ACTIVE_KEY,
  RESET_KEYS,
} from '../../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_KEY:
      return state.concat([action.key]);
    case CLEAR_ACTIVE_KEY:
      return [
        ...state.slice(0, state.indexOf(action.key)),
        ...state.slice(state.indexOf(action.key) + 1),
      ];
    case RESET_KEYS:
      return [];
    default:
      return state;
  }
}
