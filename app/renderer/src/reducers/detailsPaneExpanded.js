import { CLOSE_DETAILS, OPEN_DETAILS } from '../actions/types';

export default function(_, action) {
  switch (action.type) {
    case CLOSE_DETAILS:
      return false;
    case OPEN_DETAILS:
      return true;
    default:
      return false;
  }
}
