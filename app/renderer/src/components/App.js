import React from 'react';
import { compose, style } from 'glamor';
import QueryFieldContainer from '../containers/QueryFieldContainer';
import ResultListContainer from '../containers/ResultListContainer';
import { ThemeSchema } from '../schema';

const base = style({
  backgroundColor: '#f2f2f2',
  color: '#333',
  borderRadius: 3,
  borderWidth: 0,
  boxSizing: 'border-box',
  fontFamily: 'Lucida Grande, Arial, sans-serif',
  fontWeight: 'lighter',
  padding: 0,
  width: '100%',
  overflow: 'hidden',
});

const App = ({ theme }) => {
  const styles = theme.window
    ? compose(base, theme.window)
    : base;

  return (
    <div {...styles}>
      <QueryFieldContainer theme={theme} />
      <ResultListContainer theme={theme} />
    </div>
  );
};

App.defaultProps = {
  theme: {},
};

App.propTypes = {
  theme: ThemeSchema,
};

export default App;
