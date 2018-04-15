import m from './bookmarks';

jest.mock('browser-bookmarks');

describe('bookmarks', () => {
  // eslint-disable-next-line global-require
  require('browser-bookmarks').__setBookmarks([
    {
      title: 'GitHub',
      url: 'https://github.com/',
      favicon: '',
      folder: '',
    },
    {
      title: 'GitHub - Foo',
      url: 'https://github.com/DextApp/foo',
      favicon: '',
      folder: '',
    },
    {
      title: 'GitHub - Bar',
      url: 'https://github.com/DextApp/bar',
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
    const data = await m.query('GitHub', { size: 20 });
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].title).toBe('GitHub');
  });

  it('should return something with missing options', async () => {
    const data = await m.query('Github');
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].title).toBe('GitHub');
  });

  it('should retrieve no bookmarks', async () => {
    // eslint-disable-next-line global-require
    require('browser-bookmarks').__setBookmarks([]);

    const data = await m.query('abc');
    expect(data.items.length).not.toBeGreaterThan(0);
  });
});
