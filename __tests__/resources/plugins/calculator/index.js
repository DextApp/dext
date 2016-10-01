import m from '../../../../resources/plugins/calculator';

jest.mock('mathjs');

describe('calculator', () => {
  it('should return 4', () => {
    // eslint-disable-next-line global-require
    require('mathjs').mockSetReturnValue('4');
    const results = m.execute('2 + 2');
    expect(results.items[0].title).toBe('4');
    expect(results.items[0].subtitle).toBe('2 + 2');
  });

  it('should throw an error', () => {
    // eslint-disable-next-line global-require
    require('mathjs').mockSetThrowError(true);
    const results = m.execute('abc');
    expect(results.items).toEqual([]);
  });
});
