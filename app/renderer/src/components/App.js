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

const App = props => {
  const outerStyles = props.theme.window
    ? compose(outerBase, {
        backgroundColor: props.theme.window.backgroundColor,
      })
    : outerBase;

  const innerStyles = props.theme.window
    ? compose(base, props.theme.window)
    : base;

  return (
    <div {...outerStyles}>
      <div {...innerStyles}>
        <QueryFieldContainer
          q={props.q}
          theme={props.theme}
          onChange={props.onQueryChange}
          onReset={props.onQueryReset}
        />
        <ResultListContainer theme={props.theme} />
      </div>
    </div>
  );
};

App.defaultProps = {
  q: '',
  theme: {},
};

App.propTypes = {
  onQueryChange: PropTypes.func,
  onQueryReset: PropTypes.func,
  q: PropTypes.string,
  theme: ThemeSchema,
};

export default App;
