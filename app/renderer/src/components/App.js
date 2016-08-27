import React, { PropTypes } from 'react';
import { compose, style } from 'glamor';
import QueryFieldContainer from '../containers/QueryFieldContainer';
import ResultListContainer from '../containers/ResultListContainer';

const base = style({
  backgroundColor: '#ffffff',
  borderRadius: 0,
  borderWidth: 1,
  boxSizing: 'border-box',
  fontFamily: 'Helvetica, Arial, sans-serif',
  padding: 15,
  width: 650,
});

const App = ({ theme }) => {
  let styles = base;
  // apply theme styles
  if (theme.window) {
    styles = compose(base, theme.window);
  }
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
  theme: PropTypes.object,
};

export default App;
