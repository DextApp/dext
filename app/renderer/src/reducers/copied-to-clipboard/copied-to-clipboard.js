const initialState = false;

export default function(state = initialState, { type }) {
  switch (type) {
    case 'COPY_ITEM':
      return true;
    default:
      return false;
  }
}
