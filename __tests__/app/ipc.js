import ipc from '../../app/ipc';

test('retrieve all ipc constants', () => {
  expect(Object.keys(ipc).length).toBeGreaterThan(1);
});
