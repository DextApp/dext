import Conf from './conf';

describe('conf', () => {
  const conf = new Conf();

  it('should have nothing set', () => {
    expect(conf.size).toBe(0);
  });

  it('should set `foo` to `bar`', () => {
    conf.set('foo', 'bar');
    expect(conf.has('foo')).toBe(true);
    expect(conf.get('foo')).toBe('bar');
    expect(conf.store).toEqual({ foo: 'bar' });
    expect(conf.size).toBe(1);
  });

  it('shold clear the store', () => {
    conf.clear();
    expect(conf.has('foo')).toBe(false);
    expect(conf.size).toBe(0);
  });
});
