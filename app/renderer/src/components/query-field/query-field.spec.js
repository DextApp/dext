import React from 'react';
import renderer from 'react-test-renderer';
import QueryField from './query-field';

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
  },
}));

const createTestProps = custom => ({
  onReset: jest.fn(),
  onChange: jest.fn(),
  ...custom,
});

describe('<QueryField /> component', () => {
  let props;

  beforeEach(() => {
    props = createTestProps();
  });

  it('should render a query field component with no value', () => {
    const component = renderer.create(<QueryField {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a query field component with some value', () => {
    const component = renderer.create(<QueryField {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
