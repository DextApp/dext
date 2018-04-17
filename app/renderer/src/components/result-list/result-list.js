/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, pseudo, style } from 'glamor';
import ResultItemContainer from '../../containers/result-item-container';
import ResultDetailsContainer from '../../containers/ResultDetailsContainer';
import { ResultItemSchema, ThemeSchema } from '../../schema';

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
    const getResultItems = (results, selectedIndex, theme, copiedToClipboard) =>
      results.map((item, key) => (
        <ResultItemContainer
          key={key}
          theme={theme}
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
            this.props.copiedToClipboard
          )}
        </ol>
        {currItem && (
          <ResultDetailsContainer theme={this.props.theme} item={currItem} />
        )}
      </div>
    );
  }
};

ResultList.defaultProps = {
  theme: {},
  results: [],
  selectedIndex: 0,
  copiedToClipboard: false,
};

ResultList.propTypes = {
  theme: ThemeSchema,
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
  copiedToClipboard: PropTypes.bool,
};

export default ResultList;
