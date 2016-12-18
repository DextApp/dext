import path from 'path';
import plugins from '../../../app/main/plugins';
import paths from '../../../utils/paths';

describe('core plugins', () => {
  it('should retrieve a list of core plugin paths', async () => {
    const list = await plugins.loadPluginsInPath({
      path: paths.CORE_PLUGIN_PATH,
      isCore: true,
    });
    expect(list.length).toBeGreaterThan(0);
    expect(list).toContainEqual(path.resolve(paths.CORE_PLUGIN_PATH, 'about'));
  });

  it('should be a core plugin', () => {
    const directory = path.resolve(paths.CORE_PLUGIN_PATH, 'core-plugin');
    expect(plugins.isCorePlugin(directory)).toBe(true);
  });

  it('should not be a core plugin', () => {
    const directory = path.resolve(paths.PLUGIN_PATH, 'user-plugin');
    expect(plugins.isCorePlugin(directory)).not.toBe(true);
  });

  it('should load all core plugins', async () => {
    // load core plugins
    const results = await plugins.loadPlugins([
      { path: paths.CORE_PLUGIN_PATH, isCore: true },
    ]);
    expect(results.length).toBeGreaterThan(0);
    expect(results.filter(p => p.name === 'about')).toBeTruthy();
  });
});

describe('theme plugins', () => {
  it('should be a theme plugin', () => {
    // TODO
  });

  it('should not be a theme plugin', () => {
    // TODO
  });
});

describe('plugin metadata', () => {
  it('should apply module properties', () => {
    // TODO
  });

  it('should apply additional meta data to a items', () => {
    const items = [
      {
        title: 'Foo',
        subtitle: 'Bar',
        icon: {
          path: './icon.png',
        },
      },
    ];
    const plugin = {
      path: '/path/to/plugin/',
      name: 'foobar',
      keyword: 'foo',
      action: 'openurl',
    };
    const connectedItems = plugins.connectItems(items, plugin);
    expect(connectedItems[0].icon.path).toEqual(path.resolve('/', 'path', 'to', 'plugin', 'icon.png'));
    expect(connectedItems[0].plugin.path).toEqual('/path/to/plugin/');
    expect(connectedItems[0].plugin.name).toEqual('foobar');
    expect(connectedItems[0].keyword).toEqual('foo');
    expect(connectedItems[0].action).toEqual('openurl');
  });
});

describe('plugin results', () => {
  it('should query for results for the given plugin', async () => {
    // eslint-disable-next-line global-require
    const mathjs = require('mathjs');

    mathjs.__setReturnValue(2);

    const plugin = {
      path: path.resolve(__dirname, '..', '..', '..', 'resources', 'plugins', 'calculator'),
      name: 'calculator',
      isCore: true,
      schema: 'dext',
      action: 'copy',
      keyword: '',
    };
    const items = await plugins.queryResults(plugin, ['1+1']);
    expect(items.length).toBeGreaterThan(0);
    expect(items).toContainEqual({
      title: '2',
      subtitle: '1+1',
      arg: '2',
      icon: {
        path: path.resolve(plugin.path, 'icon.png'),
      },
      plugin: {
        path: plugin.path,
        name: plugin.name,
      },
      action: 'copy',
    });
  });
});

describe('plugin helper', () => {
  it('should query for helpers for the given plugin (no helper)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems.length).toBe(0);
  });

  it('should query for helpers for the given plugin (Object)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: {
        title: 'Foo',
        subtitle: 'Bar',
      },
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[0].subtitle).toEqual('Bar');
  });

  it('should query for helpers for the given plugin (Function)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: () => ({
        title: 'Foo',
        subtitle: 'Bar',
      }),
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[0].subtitle).toEqual('Bar');
  });

  it('should query for helpers for the given plugin (Promise)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: () => new Promise(resolve => resolve({
        title: 'Foo',
        subtitle: 'Bar',
      })),
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[0].subtitle).toEqual('Bar');
  });

  it('should query for helpers for the given plugin containing multiple items (Object)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: [{
        title: 'Foo',
        subtitle: 'Bar',
      }, {
        title: 'Foo 2',
        subtitle: 'Bar 2',
      }],
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems.length).toBe(2);
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[1].title).toEqual('Foo 2');
  });

  it('should query for helpers for the given plugin containing multiple items (Function)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: () => ([{
        title: 'Foo',
        subtitle: 'Bar',
      }, {
        title: 'Foo 2',
        subtitle: 'Bar 2',
      }]),
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems.length).toBe(2);
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[1].title).toEqual('Foo 2');
  });

  it('should query for helpers for the given plugin containing multiple items (Promise)', async () => {
    const plugin = {
      name: 'foobar',
      keyword: 'foo',
      helper: () => new Promise(resolve => resolve([{
        title: 'Foo',
        subtitle: 'Bar',
      }, {
        title: 'Foo 2',
        subtitle: 'Bar 2',
      }])),
    };
    const helperItems = await plugins.queryHelper(plugin, 'foo');
    expect(helperItems.length).toBe(2);
    expect(helperItems[0].title).toEqual('Foo');
    expect(helperItems[1].title).toEqual('Foo 2');
  });
});

describe('plugin details pane', () => {
  it('should retrieve the item\'s detail pane content (String)', async () => {
    const plugin = {
      details: {
        render: 'Hello, world.',
      },
    };
    const item = {
      title: 'Foo',
      subtitle: 'Bar',
      plugin: {
        path: '/path/to/plugin/__jest__',
      },
    };
    const details = await plugins.retrieveItemDetails(item, plugin);
    expect(details).toEqual('Hello, world.');
  });

  it('should retrieve the item\'s detail pane content (Function)', async () => {
    const plugin = {
      details: {
        render: item => `Hello, ${item.title}.`,
      },
    };
    const item = {
      title: 'Foo',
      subtitle: 'Bar',
      plugin: {
        path: '/path/to/plugin/__jest__',
      },
    };
    const details = await plugins.retrieveItemDetails(item, plugin);
    expect(details).toEqual('Hello, Foo.');
  });

  it('should retrieve the item\'s detail pane content (Promise)', async () => {
    const plugin = {
      details: {
        render: item => new Promise(resolve => resolve(`Hello, ${item.title}.`)),
      },
    };
    const item = {
      title: 'Foo',
      subtitle: 'Bar',
      plugin: {
        path: '/path/to/plugin/__jest__',
      },
    };
    const details = await plugins.retrieveItemDetails(item, plugin);
    expect(details).toEqual('Hello, Foo.');
  });

  it('should retrieve the item\'s details pane content as markdown', async () => {
    const plugin = {
      details: {
        type: 'md',
        render: '# hello world',
      },
    };
    const item = {
      title: 'Foo',
      subtitle: 'Bar',
      plugin: {
        path: '/path/to/plugin/__jest__',
      },
    };
    const details = await plugins.retrieveItemDetails(item, plugin);
    expect(details).toEqual('<h1>hello world</h1>\n');
  });
});
