import copy from '../../../../app/main/actions/copy';

jest.mock('electron', () => ({
  clipboard: {
    writeText: jest.fn(),
  },
}));

describe('app/main/actions/copy', () => {
  it('should copy the text into the clipboard', () => {
    const { clipboard } = require('electron');
    copy(null, 'foobar');
    expect(clipboard.writeText).toHaveBeenCalledWith('foobar');
  });
});
