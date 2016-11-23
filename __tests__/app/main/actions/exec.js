import path from 'path';
import { exec } from '../../../../app/main/actions';

jest.mock('child_process');

describe('app/main/actions', () => {
  // eslint-disable-next-line global-require
  const cp = require('child_process');

  it('should fork an absolute script', () => {
    exec({
      item: {
        plugin: {
          path: '/foo/bar',
        },
      },
    }, {
      script: '/some/absolute/path/to/start.js',
      arg: null,
    });
    expect(cp.fork).toHaveBeenCalledWith(
      path.resolve('/some/absolute/path/to/start.js'),
      null,
      {
        cwd: '/foo/bar',
      },
    );
  });

  it('should fork a relative URL', () => {
    exec({
      item: {
        plugin: {
          path: './foo/bar',
        },
      },
    }, {
      script: './start.js',
      arg: null,
    });
    expect(cp.fork).toHaveBeenCalledWith(
      path.resolve('./foo/bar/start.js'),
      null,
      {
        cwd: './foo/bar',
      },
    );
  });
});
