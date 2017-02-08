import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../../../../../app/renderer/src/components/Icon';

describe('<Icon /> component', () => {
  it('should render a text icon component', () => {
    const icon = {
      type: 'text',
      letter: 'T',
    };
    const component = renderer.create(
      <Icon icon={icon} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a file icon component', () => {
    const icon = {
      type: 'file',
      letter: './icon.png',
    };
    const component = renderer.create(
      <Icon icon={icon} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
