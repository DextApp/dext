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

  it('should create an action to reset the details pane content', () => {
    const expectedAction = {
      type: types.RESET_DETAILS
    };
    expect(actions.resetDetails()).toEqual(expectedAction);
  });

  it('should create an action to close the details pane', () => {
    const expectedAction = {
      type: types.CLOSE_DETAILS
    };
    expect(actions.closeDetails()).toEqual(expectedAction);
  });

  it('should create an action to open the details pane', () => {
    const expectedAction = {
      type: types.OPEN_DETAILS
    };
    expect(actions.openDetails()).toEqual(expectedAction);
  })
});
