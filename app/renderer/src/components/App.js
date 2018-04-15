import React from 'react';
import PropTypes from 'prop-types';
import { compose, style } from 'glamor';
import QueryFieldContainer from '../containers/query-field-container';
import ResultListContainer from '../containers/ResultListContainer';
import { ThemeSchema } from '../schema';

const outerBase = style({
  backgroundColor: '#f2f2f2',
  boxSizing: 'border-box',
  width: '100%',
  paddingLeft: 3,
  paddingRight: 3,
});

const base = style({
  backgroundColor: '#f2f2f2',
  color: '#333',
  borderRadius: 3,
  borderWidth: 0,
  boxSizing: 'border-box',
  fontFamily: 'Lucida Grande, Arial, sans-serif',
  fontWeight: 'lighter',
  width: '100%',
  overflow: 'hidden',
});

const App = ({ q, theme, onQueryChange, onQueryReset }) => {
  const outerStyles = theme.window
    ? compose(outerBase, { backgroundColor: theme.window.backgroundColor })
    : outerBase;

  const innerStyles = theme.window ? compose(base, theme.window) : base;

  return (
    <div {...outerStyles}>
      <div {...innerStyles}>
        <QueryFieldContainer
          q={q}
          theme={theme}
          onChange={onQueryChange}
          onReset={onQueryReset}
        />
        <ResultListContainer theme={theme} />
      </div>
    </div>
  );
};

App.defaultProps = {
  theme: {},
};

App.propTypes = {
  theme: ThemeSchema,
  onQueryChange: PropTypes.func,
  onQueryReset: PropTypes.func,
};

export default App;
