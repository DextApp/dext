import {
  COPY_ITEM,
} from '../actions/types';

export default function (state, { type }) {
  switch (type) {
    case COPY_ITEM:
      return true;
    default:
      return false;
  }
}
