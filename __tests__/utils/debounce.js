import helpers from '../../utils/helpers';

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
