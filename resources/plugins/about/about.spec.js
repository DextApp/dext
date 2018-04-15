import m from './about';

describe('calculator', () => {
  it('should return something', () => {
    const results = m.query('?');
    expect(results.items.length).toBeGreaterThan(0);
  });

  it('should return nothing', () => {
    const results = m.query('');
    expect(results.items.length).not.toBeGreaterThan(0);
  });
});
