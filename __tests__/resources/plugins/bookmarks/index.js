import m from '../../../../resources/plugins/bookmarks';

describe('retrieve bookmarks', () => {
  it('should return something', async () => {
    const data = await m.execute('GitHub');
    if (process.platform === 'darwin') {
      expect(data).toBeTruthy();
      expect(data.items instanceof Array).toBeTruthy();
    } else {
      expect(data).toEqual([]);
    }
  });
});
