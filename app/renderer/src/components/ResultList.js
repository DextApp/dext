import React, { PropTypes } from 'react';
import { style, compose } from 'glamor';
import ResultItemContainer from '../containers/ResultItemContainer';
import ResultItemSchema from '../schema/ResultItemSchema';

const base = style({
  boxSizing: 'border-box',
  display: 'none',
  height: '100%',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
});

const shown = style({
  display: 'block',
});

const ResultList = props => {
  // Retrieve an array of <ResultItemContainer /> containers
  const getResultItems = (results, selectedIndex, theme) => results.map((item, key) => <ResultItemContainer key={key} theme={theme} item={item} selected={selectedIndex === key} />);

  return (
    <ol {...compose(base, props.results.length && shown)}>
      {getResultItems(props.results, props.selectedIndex, props.theme)}
    </ol>
  );
};

ResultList.propTypes = {
  theme: PropTypes.object,
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
};

export default ResultList;
