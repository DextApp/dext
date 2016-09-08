import React, { Component, PropTypes } from 'react';
import { compose, pseudo, style } from 'glamor';
import ResultItemContainer from '../containers/ResultItemContainer';
import ResultDetailsContainer from '../containers/ResultDetailsContainer';
import { ResultItemSchema, ThemeSchema } from '../schema';

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
  }),
);

const shown = style({
  display: 'block',
});

const ResultList = class extends Component {
  render() {
    const props = this.props;
    // Retrieve an array of <ResultItemContainer /> containers
    const getResultItems = (results, selectedIndex, theme) => results.map((item, key) => <ResultItemContainer key={key} theme={theme} item={item} selected={selectedIndex === key} />);
    // get current item
    const currItem = props.results[props.selectedIndex];

    return (
      <div {...style({ position: 'relative', paddingTop: 15, paddingBottom: 15 })}>
        <ol {...compose(base, props.results.length && shown)} ref={c => { this.c = c; }}>
          {getResultItems(props.results, props.selectedIndex, props.theme)}
        </ol>
        {currItem && <ResultDetailsContainer item={currItem} />}
      </div>
    );
  }
};

ResultList.propTypes = {
  theme: ThemeSchema,
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
};

export default ResultList;
