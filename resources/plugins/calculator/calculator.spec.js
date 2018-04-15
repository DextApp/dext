import m from './calculator';

jest.mock('mathjs');

describe('calculator', () => {
  it('should return 4', () => {
    // eslint-disable-next-line global-require
    require('mathjs').__setReturnValue('4');

    const results = m.query('2 + 2');
    expect(results.items[0].title).toBe('4');
    expect(results.items[0].subtitle).toBe('2 + 2');
  });

  it('should throw an error', () => {
    // eslint-disable-next-line global-require
    require('mathjs').__setThrowError(true);

    const results = m.query('abc');
    expect(results.items).toEqual([]);
  });
});
