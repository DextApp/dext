import m from '../../../../resources/plugins/bookmarks';

describe('retrieve bookmarks', () => {
  it('should return something with options supplied', async () => {
    const data = await m.execute('GitHub', { size: 20 });
    if (process.platform === 'darwin') {
      expect(data).toBeTruthy();
      expect(data.items instanceof Array).toBeTruthy();
    } else {
      expect(data).toEqual([]);
    }
  });

  it('should return something with missing options', async () => {
    const data = await m.execute('Github')
    if (process.platform === 'darwin') {
      expect(data).toBeTruthy();
      expect(data.items instanceof Array).toBeTruthy();
    } else {
      expect(data).toEqual([]);
    }
  })
});
