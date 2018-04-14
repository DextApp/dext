import * as types from '../../actions/types';
import q from './q';

describe('q reducer', () => {
  it('should return the intial state', () => {
    const state = undefined;
    const action = {};
    expect(q(state, action)).toEqual('');
  });

  it('should handle UPDATE_QUERY', () => {
    const state = '';
    const action = { type: types.UPDATE_QUERY, q: 'foo' };
    expect(q(state, action)).toEqual('foo');
  });

  it('should handle RESET_QUERY', () => {
    const state = 'foo';
    const action = { type: types.RESET_QUERY };
    expect(q(state, action)).toEqual('');
  });
});
