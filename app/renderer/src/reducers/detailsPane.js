import { SET_DETAILS, RESET_DETAILS } from '../actions/types';

const initialState = '';

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DETAILS:
      return action.value;
    case RESET_DETAILS:
      return '';
    default:
      return state;
  }
}
