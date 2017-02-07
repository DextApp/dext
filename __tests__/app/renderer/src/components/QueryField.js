import React from 'react';
import renderer from 'react-test-renderer';
import QueryField from '../../../../../app/renderer/src/components/QueryField';

describe('<QueryField /> component', () => {
  let theme = {};

  beforeEach(() => {
    theme = {};
  });

  it('should render a query field component with no value', () => {
    const component = renderer.create(
      <QueryField theme={theme} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a query field component with some value', () => {
    const component = renderer.create(
      <QueryField theme={theme} value={'TEST'} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
