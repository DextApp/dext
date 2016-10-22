import ipc from '../../app/ipc';

describe('ipc', () => {
  it('should retrieve all ipc constants', () => {
    expect(Object.keys(ipc).length).toBeGreaterThan(1);
  });
});
