import {
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  RESET_SELECTED_ITEM,
} from '../actions/types';

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_NEXT_ITEM:
      return state + 1;
    case SELECT_PREVIOUS_ITEM:
      if (state === 0 || state === 1) {
        return 0;
      }
      return state - 1;
    case RESET_SELECTED_ITEM:
      return 0;
    default:
      return state;
  }
}
