import keys from '../../../../../app/renderer/src/reducers/keys';
import * as types from '../../../../../app/renderer/src/actions/types';

describe('keys reducer', () => {
  it('should return the intial state', () => {
    const state = [];
    const action = {};
    expect(keys(state, action)).toEqual([]);
  });

  it('should handle SET_ACTIVE_KEY', () => {
    const state = [];
    const action = { type: types.SET_ACTIVE_KEY, key: 'alt' };
    expect(keys(state, action)).toEqual(['alt']);
  });

  it('should handle CLEAR_ACTIVE_KEY', () => {
    const state = ['alt'];
    const action = { type: types.CLEAR_ACTIVE_KEY, key: 'alt' };
    expect(keys(state, action)).toEqual([]);
  });

  it('should handle CLEAR_ACTIVE_KEY (invalid)', () => {
    const state = ['alt'];
    const action = { type: types.CLEAR_ACTIVE_KEY, key: 'foo' };
    expect(keys(state, action)).toEqual(['alt']);
  });
});
