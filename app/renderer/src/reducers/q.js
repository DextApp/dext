import { UPDATE_QUERY, RESET_QUERY } from '../actions/types';

const initialState = '';

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return action.q;
    case RESET_QUERY:
      return '';
    default:
      return state;
  }
}
