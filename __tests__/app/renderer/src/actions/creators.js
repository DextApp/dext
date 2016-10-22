import * as types from '../../../../../app/renderer/src/actions/types';
import * as actions from '../../../../../app/renderer/src/actions/creators';

describe('action creators', () => {
  it('should create an action to reset the query', () => {
    const expectedAction = {
      type: types.RESET_QUERY,
    };
    expect(actions.resetQuery()).toEqual(expectedAction);
  });

  it('should create an action to update the query', () => {
    const expectedAction = {
      type: types.UPDATE_QUERY,
      q: 'foo',
    };
    expect(actions.updateQuery('foo')).toEqual(expectedAction);
  });

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

  it('should create an action to set the theme', () => {
    const expectedAction = {
      type: types.SET_THEME,
      theme: 'foo-theme',
    };
    expect(actions.setTheme('foo-theme')).toEqual(expectedAction);
  });

  it('should create an action to set the details', () => {
    const expectedAction = {
      type: types.SET_DETAILS,
      value: 'foobar',
    };
    expect(actions.setDetails('foobar')).toEqual(expectedAction);
  });

  it('should create an action to reset the details', () => {
    const expectedAction = {
      type: types.RESET_DETAILS,
    };
    expect(actions.resetDetails()).toEqual(expectedAction);
  });

  it('should create an action to close the details', () => {
    const expectedAction = {
      type: types.CLOSE_DETAILS,
    };
    expect(actions.closeDetails()).toEqual(expectedAction);
  });

  it('should create an action to open the details', () => {
    const expectedAction = {
      type: types.OPEN_DETAILS,
    };
    expect(actions.openDetails()).toEqual(expectedAction);
  });

  it('should create an action to set the active key', () => {
    const expectedAction = {
      type: types.SET_ACTIVE_KEY,
      key: 'alt',
    };
    expect(actions.setActiveKey('alt')).toEqual(expectedAction);
  });

  it('should create an action to clear the active key', () => {
    const expectedAction = {
      type: types.CLEAR_ACTIVE_KEY,
      key: 'alt',
    };
    expect(actions.clearActiveKey('alt')).toEqual(expectedAction);
  });

  it('should create an action to reset all keys', () => {
    const expectedAction = {
      type: types.RESET_KEYS,
    };
    expect(actions.resetKeys()).toEqual(expectedAction);
  });
});
