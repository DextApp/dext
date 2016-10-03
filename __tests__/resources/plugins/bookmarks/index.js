import m from '../../../../resources/plugins/bookmarks';

jest.mock('browser-bookmarks');

describe('bookmarks', () => {
  // eslint-disable-next-line global-require, no-underscore-dangle
  require('browser-bookmarks').__setBookmarks([
    {
      title: 'GitHub',
      url: 'https://github.com/',
      favicon: '',
      folder: '',
    },
    {
      title: 'GitHub - Foo',
      url: 'https://github.com/vutran/foo',
      favicon: '',
      folder: '',
    },
    {
      title: 'GitHub - Bar',
      url: 'https://github.com/vutran/bar',
      favicon: '',
      folder: '',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/',
      favicon: '',
      folder: '',
    },
  ]);

  it('should return something with options supplied', async () => {
    const data = await m.execute('GitHub', { size: 20 });
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].title).toBe('GitHub');
  });

  it('should return something with missing options', async () => {
    const data = await m.execute('Github');
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].title).toBe('GitHub');
  });

  it('should retrieve no bookmarks', async () => {
    // eslint-disable-next-line global-require, no-underscore-dangle
    require('browser-bookmarks').__setBookmarks([]);
    const data = await m.execute('abc');
    expect(data.items.length).not.toBeGreaterThan(0);
  });
});
