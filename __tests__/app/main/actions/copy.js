import copy from '../../../../app/main/actions/copy';

const { clipboard } = require('electron');

jest.mock('electron', () => ({
  clipboard: {
    writeText: jest.fn(),
  },
}));

describe('app/main/actions/copy', () => {
  it('should copy the text into the clipboard', () => {
    copy(null, 'foobar');
    expect(clipboard.writeText).toHaveBeenCalledWith('foobar');
  });
});
