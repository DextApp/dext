import * as types from '../types';
import * as actions from './creators';

describe('action creators', () => {
  it('should create an action to update the results', () => {
    const results = [
      {
        title: 'Foo 1',
        subtitle: 'Bar 1',
      },
      {
        title: 'Foo 2',
        subtitle: 'Bar 2',
      },
    ];
    const expectedAction = {
      type: types.UPDATE_RESULTS,
      results,
    };
    expect(actions.updateResults(results)).toEqual(expectedAction);
  });

  it('should create an action to reset the results', () => {
    const expectedAction = {
      type: types.RESET_RESULTS,
    };
    expect(actions.resetResults()).toEqual(expectedAction);
  });

  it('should create an action to reset the selected item', () => {
    const expectedAction = {
      type: types.RESET_SELECTED_ITEM,
    };
    expect(actions.resetSelectedItem()).toEqual(expectedAction);
  });

  it('should create an action to select an item', () => {
    const expectedAction = {
      type: types.SELECT_ITEM,
      index: 1,
      item: { foo: 'bar' },
    };
    expect(actions.selectItem(1, { foo: 'bar' })).toEqual(expectedAction);
  });

  it('should create an action to select the previous item', () => {
    const expectedAction = {
      type: types.SELECT_PREVIOUS_ITEM,
    };
    expect(actions.selectPreviousItem()).toEqual(expectedAction);
  });

  it('should create an action to select the next item', () => {
    const expectedAction = {
      type: types.SELECT_NEXT_ITEM,
    };
    expect(actions.selectNextItem()).toEqual(expectedAction);
  });
});
