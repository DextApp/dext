import React from 'react';
import renderer from 'react-test-renderer';
import { ResultItem } from './result-item';

describe('<ResultItem /> component', () => {
  let theme = {};

  beforeEach(() => {
    theme = {};
  });

  it('should render a result item component with a text icon', () => {
    const item = {
      title: 'Text Item',
      subtitle: 'Text Subtitle',
      icon: {
        type: 'text',
        letter: 'T',
      },
    };
    const component = renderer.create(<ResultItem theme={theme} item={item} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a result item component with a file icon', () => {
    const item = {
      title: 'File Title',
      subtitle: 'File Subtitle',
      icon: {
        type: 'file',
        path: './icon.png',
      },
    };
    const component = renderer.create(<ResultItem theme={theme} item={item} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a result item component in a selected state', () => {
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
