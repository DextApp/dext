import * as types from '../../actions/types';
import selectedIndex from './selected-index';

describe('theme reducer', () => {
  it('should return the intial state', () => {
    const state = undefined;
    const action = {};
    expect(selectedIndex(state, action)).toEqual(0);
  });

  it('should handle SELECT_ITEM', () => {
    const state = 5;
    const index = 1;
    const action = { type: types.SELECT_ITEM, index };
    expect(selectedIndex(state, action)).toEqual(index);
  });

  it('should handle SELECT_NEXT_ITEM', () => {
    const state = 5;
    const action = { type: types.SELECT_NEXT_ITEM };
    expect(selectedIndex(state, action)).toEqual(6);
  });

  it('should handle SELECT_PREVIOUS_ITEM', () => {
    const state = 5;
    const action = { type: types.SELECT_PREVIOUS_ITEM };
    expect(selectedIndex(state, action)).toEqual(4);
  });

  it('should handle SELECT_PREVIOUS_ITEM for first item', () => {
    const state = 0;
    const action = { type: types.SELECT_PREVIOUS_ITEM };
    expect(selectedIndex(state, action)).toEqual(0);
  });

  it('should handle RESET_SELECTED_ITEM', () => {
    const state = 5;
    const action = { type: types.RESET_SELECTED_ITEM };
    expect(selectedIndex(state, action)).toEqual(0);
  });
});
