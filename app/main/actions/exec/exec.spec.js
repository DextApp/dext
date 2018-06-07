import childProcess from 'child_process';
import path from 'path';
import exec from './exec';

jest.mock('child_process', () => ({
  fork: jest.fn(),
}));

describe('app/main/actions', () => {
  it('should fork an absolute script', () => {
    exec(
      {
        item: {
          plugin: {
            path: '/foo/bar',
          },
        },
      },
      {
        script: '/some/absolute/path/to/start.js',
        arg: null,
      }
    );
    expect(childProcess.fork).toHaveBeenCalledWith(
      path.resolve('/some/absolute/path/to/start.js'),
      null,
      {
        cwd: '/foo/bar',
      }
    );
  });

  it('should fork a relative URL', () => {
    exec(
      {
        item: {
          plugin: {
            path: './foo/bar',
          },
        },
      },
      {
        script: './start.js',
        arg: null,
      }
    );
    expect(childProcess.fork).toHaveBeenCalledWith(
      path.resolve('./foo/bar/start.js'),
      null,
      {
        cwd: './foo/bar',
      }
    );
  });
});
