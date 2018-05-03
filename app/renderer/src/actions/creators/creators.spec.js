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
});
