import { UPDATE_RESULTS, RESET_RESULTS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return action.results;
    case RESET_RESULTS:
      return [];
    default:
      return state;
  }
}
