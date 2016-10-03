import m from '../../../../resources/plugins/about';

describe('calculator', () => {
  it('should return something', () => {
    const results = m.execute('?');
    expect(results.items.length).toBeGreaterThan(0);
  });

  it('should return nothing', () => {
    const results = m.execute('');
    expect(results.items.length).not.toBeGreaterThan(0);
  });
});
