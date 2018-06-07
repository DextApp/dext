import { shell } from 'electron';
import open from './open';

jest.mock('electron', () => ({
  shell: {
    openItem: jest.fn(),
  },
}));

describe('app/main/actions/open', () => {
  let message;
  let arg;
  beforeEach(() => {
    message = 'foo';
    arg = 'bar';
  });
  describe('with arg', () => {
    beforeEach(() => {
      open(message, arg);
    });
    it('should call `shell.openItem`', () => {
      expect(shell.openItem).toHaveBeenCalledTimes(1);
    });
    it('should call `shell.openItem` with `bar', () => {
      expect(shell.openItem).toHaveBeenCalledWith('bar');
    });
  });
  describe('without arg', () => {
    beforeEach(() => {
      arg = undefined;
      open(message, arg);
    });
    it('should not call `shell.openItem`', () => {
      expect(shell.openItem).not.toHaveBeenCalledTimes(1);
    });
  });
  afterEach(() => {
    shell.openItem.mockClear();
  });
});
