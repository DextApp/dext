import React from 'react';
import PropTypes from 'prop-types';
import { compose, style } from 'glamor';
import QueryFieldContainer from '../../containers/query-field-container';
import ResultListContainer from '../../containers/result-list-container';

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

export default function App(props) {
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
          details={props.details}
          keys={props.keys}
          results={props.results}
          selectedIndex={props.selectedIndex}
          theme={props.theme}
          onClearActiveKey={props.onClearActiveKey}
          onLoadDetails={props.onLoadDetails}
          onResetKeys={props.onResetKeys}
          onResetResults={props.onResetResults}
          onSelectItem={props.onSelectItem}
          onSetActiveKey={props.onSetActiveKey}
          onUpdateResults={props.onUpdateResults}
        />
      </div>
    </div>
  );
}

App.defaultProps = {
  details: '',
  keys: [],
  q: '',
  results: [],
  selectedIndex: 0,
  theme: {},
};

App.propTypes = {
  details: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  q: PropTypes.string,
  theme: PropTypes.object,
  results: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  onClearActiveKey: PropTypes.func.isRequired,
  onLoadDetails: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onQueryReset: PropTypes.func.isRequired,
  onResetKeys: PropTypes.func.isRequired,
  onResetResults: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onSetActiveKey: PropTypes.func.isRequired,
  onUpdateResults: PropTypes.func.isRequired,
};
