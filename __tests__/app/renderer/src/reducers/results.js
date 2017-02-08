import results from '../../../../../app/renderer/src/reducers/results';
import * as types from '../../../../../app/renderer/src/actions/types';

describe('theme reducer', () => {
  it('should return the intial state', () => {
    const state = undefined;
    const action = {};
    expect(results(state, action)).toEqual([]);
  });

  it('should handle UPDATE_RESULTS', () => {
    const state = [];
    const action = {
      type: types.UPDATE_RESULTS,
      results: [
        {
          item: { title: 'Foo' },
        },
      ],
    };
    expect(
      results(state, action)
    ).toEqual([
      { item: { title: 'Foo' } },
    ]);
  });

  it('should handle RESET_RESULTS', () => {
    const state = 5;
    const action = { type: types.RESET_RESULTS };
    expect(results(state, action)).toEqual([]);
  });
});
