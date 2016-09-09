import { CLOSE_DETAILS, OPEN_DETAILS } from '../actions/types';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOSE_DETAILS:
      return false;
    case OPEN_DETAILS:
      return true;
    default:
      return false;
  }
}
