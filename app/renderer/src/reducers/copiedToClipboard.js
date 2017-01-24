import {
  COPY_ITEM,
  SET_ACTIVE_KEY,
  CLEAR_ACTIVE_KEY,
} from '../actions/types';

const initialState = false;

export default function (state = initialState, { type }) {
  switch (type) {
    case SET_ACTIVE_KEY:
    case CLEAR_ACTIVE_KEY:
      return state;
    case COPY_ITEM:
      return true;
    default:
      return false;
  }
}
