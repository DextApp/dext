import * as types from '../../actions/types';
import copiedToClipboard from './copied-to-clipboard';

const { COPY_ITEM, ...allTypes } = types;

describe('copied-to-clipboard', () => {
  it('should return the initial state', () => {
    const state = undefined;
    const action = { type: 'SOME_RANDOM_ACTION' };

    expect(copiedToClipboard(state, action)).toBe(false);
  });

  it('should handle COPY_ITEM action', () => {
    const state = undefined;
    const action = { type: COPY_ITEM };

    expect(copiedToClipboard(state, action)).toBe(true);
  });

  it('should handle the rest of the actions', () => {
    const state = undefined;
    Object.keys(allTypes).map(typeKey =>
      expect(copiedToClipboard(state, { type: allTypes[typeKey] })).toBe(false)
    );
  });
});
