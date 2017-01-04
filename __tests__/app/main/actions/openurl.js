import openurl from '../../../../app/main/actions/openurl';

jest.mock('electron', () => ({
  shell: {
    openExternal: jest.fn(),
  },
}));

describe('app/main/actions/openurl', () => {
  it('should open the url in a new window', () => {
    const { shell } = require('electron');
    openurl(null, 'https://google.com');
    expect(shell.openExternal).toHaveBeenCalled();
  });
});
