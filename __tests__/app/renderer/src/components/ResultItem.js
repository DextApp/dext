import React from 'react';
import renderer from 'react-test-renderer';
import ResultItem from '../../../../../app/renderer/src/components/ResultItem';

describe('renders a result item component', () => {
  let theme = {};

  beforeEach(() => {
    theme = {};
  });

  test('renders a result item component with a text icon', () => {
    const item = {
      title: 'Text Item',
      subtitle: 'Text Subtitle',
      icon: {
        type: 'text',
        letter: 'T',
      },
    };
    const component = renderer.create(
      <ResultItem theme={theme} item={item} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a result item component with a file icon', () => {
    const item = {
      title: 'File Title',
      subtitle: 'File Subtitle',
      icon: {
        type: 'file',
        path: './icon.png',
      },
    };
    const component = renderer.create(
      <ResultItem theme={theme} item={item} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a result item component in a selected state', () => {
    const item = {
      title: 'File Title',
      subtitle: 'File Subtitle',
      icon: {
        type: 'file',
        path: './icon.png',
      },
    };
    const component = renderer.create(
      <ResultItem theme={theme} item={item} selected />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
