import path from 'path';
import plugins from '../../../app/main/plugins';
import paths from '../../../utils/paths';

test('should be a core plugin', () => {
  const directory = path.resolve(paths.CORE_PLUGIN_PATH, 'core-plugin');
  expect(plugins.isCorePlugin(directory)).toBe(true);
});

test('should not be a core plugin', () => {
  const directory = path.resolve(paths.PLUGIN_PATH, 'user-plugin');
  expect(plugins.isCorePlugin(directory)).not.toBe(true);
});

test('should be a theme plugin', () => {
  // TODO
});

test('should not be a theme plugin', () => {
  // TODO
});
