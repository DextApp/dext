import * as types from '../../actions/types';
import detailsPane from './details-pane';

describe('details-pane', () => {
  it('should return the intial state', () => {
    const state = '';
    const action = {};
    expect(detailsPane(state, action)).toEqual('');
  });

  it('should handle SET_DETAILS', () => {
    const state = '';
    const action = { type: types.SET_DETAILS, value: 'test content' };
    expect(detailsPane(state, action)).toEqual('test content');
  });

  it('should handle RESET_DETAILS', () => {
    const state = 'test content';
    const action = { type: types.RESET_DETAILS };
    expect(detailsPane(state, action)).toEqual('');
  });
});
