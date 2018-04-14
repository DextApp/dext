import * as types from '../../actions/types';
import detailsPaneExpanded from './details-pane-expanded';

describe('detailsPaneExpanded reducer', () => {
  it('should return the intial state', () => {
    const state = false;
    const action = {};
    expect(detailsPaneExpanded(state, action)).toBeFalsy();
  });

  it('should handle CLOSE_DETAILS', () => {
    const state = true;
    const action = { type: types.CLOSE_DETAILS };
    expect(detailsPaneExpanded(state, action)).toBeFalsy();
  });

  it('should handle OPEN_DETAILS', () => {
    const state = false;
    const action = { type: types.OPEN_DETAILS };
    expect(detailsPaneExpanded(state, action)).toBeTruthy();
  });
});
