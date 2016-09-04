import path from 'path';
import paths from '../../utils/paths';

test('retrieves the path to the .dext file', () => {
  expect(path.basename(paths.DEXT_PATH)).toBe('.dext');
});

test('retrieves the path to the theme directory', () => {
  expect(path.basename(paths.THEME_PATH)).toBe('plugins');
});

test('retrieves the path to the core plugins directory', () => {
  expect(path.basename(paths.CORE_PLUGIN_PATH)).toBe('plugins');
  expect(paths.CORE_PLUGIN_PATH).not.toBe(paths.PLUGIN_PATH);
});

test('retrieves the path to the user plugins directory', () => {
  expect(path.basename(paths.PLUGIN_PATH)).toBe('plugins');
});
