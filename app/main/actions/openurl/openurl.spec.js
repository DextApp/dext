import { shell } from 'electron';
import openurl from './openurl';

jest.mock('electron', () => ({
  shell: {
    openExternal: jest.fn(),
  },
}));

describe('app/main/actions/openurl', () => {
  it('should open the url in a new window', () => {
    openurl(null, 'https://google.com');
    expect(shell.openExternal).toHaveBeenCalled();
  });
});
