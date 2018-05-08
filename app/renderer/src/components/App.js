import React from 'react';
import PropTypes from 'prop-types';
import { compose, style } from 'glamor';
import QueryFieldContainer from '../containers/query-field-container';
import ResultListContainer from '../containers/result-list-container';

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
        <ResultListContainer
          theme={props.theme}
          keys={props.keys}
          onResetKeys={props.onResetKeys}
          onSetActiveKey={props.onSetActiveKey}
          onClearActiveKey={props.onClearActiveKey}
        />
      </div>
    </div>
  );
};

App.defaultProps = {
  q: '',
  theme: {},
  keys: [],
};

App.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  onQueryReset: PropTypes.func.isRequired,
  onSetActiveKey: PropTypes.func.isRequired,
  onClearActiveKey: PropTypes.func.isRequired,
  onResetKeys: PropTypes.func.isRequired,
  q: PropTypes.string,
  theme: PropTypes.object,
  keys: PropTypes.arrayOf(PropTypes.string),
};

export default App;
