import open from '../../../../app/main/actions/open';

const { shell } = require('electron');

jest.mock('electron', () => ({
  shell: {
    openItem: jest.fn(),
  },
}));

describe('app/main/actions/open', () => {
  it("should open the application in the desktop' default manner", () => {
    open(null, '/Applications/Safari.app');
    expect(shell.openItem).toHaveBeenCalled();
  });
});
