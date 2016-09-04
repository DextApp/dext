import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../../../../../app/renderer/src/components/Icon';

test('renders a text icon component', () => {
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

test('renders a file icon component', () => {
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
