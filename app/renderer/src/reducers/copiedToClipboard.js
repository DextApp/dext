import {
  UPDATE_QUERY,
  SELECT_ITEM,
  SELECT_NEXT_ITEM,
  SELECT_PREVIOUS_ITEM,
  COPY_ITEM,
} from '../actions/types';

export default function (state = false, { type }) {
  switch (type) {
    case UPDATE_QUERY:
    case SELECT_ITEM:
    case SELECT_NEXT_ITEM:
    case SELECT_PREVIOUS_ITEM:
      return false;
    case COPY_ITEM:
      return true;
    default:
      return state;
  }
}
