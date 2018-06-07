import { clipboard } from 'electron';
import copy from './copy';

jest.mock('electron', () => ({
  clipboard: {
    writeText: jest.fn(),
  },
}));

describe('app/main/actions/copy', () => {
  let message;
  let arg;
  beforeEach(() => {
    message = 'foo';
    arg = 'bar';
  });
  describe('with arg', () => {
    beforeEach(() => {
      copy(message, arg);
    });
    it('should call `writeText`', () => {
      expect(clipboard.writeText).toHaveBeenCalledTimes(1);
    });
    it('should call `writeText` with `bar`', () => {
      expect(clipboard.writeText).toHaveBeenCalledWith('bar');
    });
  });
  describe('without arg', () => {
    beforeEach(() => {
      arg = undefined;
      copy(message, arg);
    });
    it('should not call `writeText`', () => {
      expect(clipboard.writeText).not.toHaveBeenCalled();
    });
  });
  afterEach(() => {
    clipboard.writeText.mockClear();
  });
});
