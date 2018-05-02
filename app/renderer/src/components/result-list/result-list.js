/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, pseudo, style } from 'glamor';
import ResultItemContainer from '../../containers/result-item-container';
import ResultDetailsContainer from '../../containers/result-details-container';

const base = compose(
  style({
    boxSizing: 'border-box',
    display: 'none',
    height: '100%',
    maxHeight: 600,
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
  }),
  pseudo('::-webkit-scrollbar', {
    width: 3,
    marginRight: 3,
  }),
  pseudo('::-webkit-scrollbar-thumb', {
    backgroundColor: '#bbb',
  })
);

const shown = style({
  display: 'block',
});

const ResultList = class extends Component {
  render() {
    // Retrieve an array of <ResultItemContainer /> containers
    const getResultItems = (
      results,
      selectedIndex,
      theme,
      keys,
      copiedToClipboard
    ) =>
      results.map((item, key) => (
        <ResultItemContainer
          key={key}
          theme={theme}
          keys={keys}
          item={item}
          copiedToClipboard={copiedToClipboard}
          selected={selectedIndex === key}
        />
      ));

    const currItem = this.props.results[this.props.selectedIndex];

    return (
      <div
        {...style({ position: 'relative', paddingTop: 15, paddingBottom: 15 })}
      >
        <ol
          {...compose(base, this.props.results.length && shown)}
          ref={c => {
            this.c = c;
          }}
        >
          {getResultItems(
            this.props.results,
            this.props.selectedIndex,
            this.props.theme,
            this.props.keys,
            this.props.copiedToClipboard
          )}
        </ol>
        {currItem && (
          <ResultDetailsContainer
            details={this.props.details}
            theme={this.props.theme}
            onLoad={this.props.onLoadDetails}
          />
        )}
      </div>
    );
  }
};

ResultList.defaultProps = {
  copiedToClipboard: false,
  details: '',
  keys: [],
  results: [],
  selectedIndex: 0,
  theme: {},
  onLoadDetails: () => false,
};

ResultList.propTypes = {
  copiedToClipboard: PropTypes.bool,
  details: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  results: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  theme: PropTypes.object,
  onLoadDetails: PropTypes.func,
};

export default ResultList;
