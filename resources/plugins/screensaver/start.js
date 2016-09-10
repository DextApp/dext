const { exec, execFile } = require('child_process');

if (process.platform === 'darwin') {
  execFile('open', ['/System/Library/Frameworks/ScreenSaver.framework/Versions/A/Resources/ScreenSaverEngine.app']);
} else if (process.platform === 'win32') {
  execFile('nircmd.exe', ['screensaver']);
} else if (process.platform === 'linux') {
  exec('xdg-screensaver', ['activate']);
}
