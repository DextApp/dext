import helpers from './helpers';

describe('debounce', () => {
  it('should debounce a function', async () => {
    jest.useFakeTimers();
    // create a mock function to debounce
    const mockFn = jest.fn();
    const debounced = helpers.debounce(mockFn, 100);
    // shouldn't be called
    expect(mockFn).not.toBeCalled();
    await debounced(1);
    // fast-forward timers
    jest.runAllTimers();
    // should be called
    expect(mockFn).toBeCalled();
  });
});

describe('hasOwnProp', () => {
  it('should check for the property', () => {
    const obj = {
      foo: 'bar',
    };
    expect(helpers.hasOwnProp(obj, 'foo')).toBeTruthy();
    expect(helpers.hasOwnProp(obj, 'bar')).toBeFalsy();
  });

  it('should check for a deeply nested property', () => {
    const obj = {
      foo: {
        bar: 'baz',
      },
      bar: {
        baz: 'qux',
      },
      a: {
        b: {
          c: {
            d: 'hello world',
          },
        },
      },
    };
    expect(helpers.hasOwnProp(obj, 'foo.bar')).toBeTruthy();
    expect(helpers.hasOwnProp(obj, 'bar.baz')).toBeTruthy();
    expect(helpers.hasOwnProp(obj, 'bar')).toBeTruthy();
    expect(helpers.hasOwnProp(obj, 'baz')).toBeFalsy();
    expect(helpers.hasOwnProp(obj, 'foo.bar.baz')).toBeFalsy();
    expect(helpers.hasOwnProp(obj, 'a.b.c.d')).toBeTruthy();
    expect(helpers.hasOwnProp(obj, 'b.c.d')).toBeFalsy();
  });
});

describe('getOwnProp', () => {
  it('should retrieve the property', () => {
    const obj = {
      foo: 'bar',
    };
    expect(helpers.getOwnProp(obj, 'foo')).toBe('bar');
    expect(helpers.getOwnProp(obj, 'bar')).toBeUndefined();
  });

  it('should retrieve a deeply nested property', () => {
    const obj = {
      foo: {
        bar: 'baz',
      },
      bar: {
        baz: 'qux',
      },
      a: {
        b: {
          c: {
            d: 'hello world',
          },
        },
      },
    };
    expect(helpers.getOwnProp(obj, 'foo.bar')).toBe('baz');
    expect(helpers.getOwnProp(obj, 'bar.baz')).toBe('qux');
    expect(helpers.getOwnProp(obj, 'bar')).toEqual({ baz: 'qux' });
    expect(helpers.getOwnProp(obj, 'baz')).toBeUndefined();
    expect(helpers.getOwnProp(obj, 'foo.bar.baz')).toBeUndefined();
    expect(helpers.getOwnProp(obj, 'a.b.c.d')).toBe('hello world');
    expect(helpers.getOwnProp(obj, 'b.c.d')).toBeUndefined();
  });
});
