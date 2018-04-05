import theme from '../../../../../app/renderer/src/reducers/theme';
import * as types from '../../../../../app/renderer/src/actions/types';

describe('theme reducer', () => {
  it('should return the intial state', () => {
    const state = undefined;
    const action = {};
    expect(theme(state, action)).toEqual({});
  });

  it('should handle SET_THEME', () => {
    const state = '';
    const action = {
      type: types.SET_THEME,
      theme: { window: { backgroundColor: '#fff' } },
    };
    expect(theme(state, action)).toEqual({
      window: { backgroundColor: '#fff' },
    });
  });
});
