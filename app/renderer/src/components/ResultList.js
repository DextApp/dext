import React, { PropTypes } from 'react';
import { pseudo, style, compose } from 'glamor';
import ResultItemContainer from '../containers/ResultItemContainer';
import { ResultItemSchema, ThemeSchema } from '../schema';

const base = compose(
  style({
    boxSizing: 'border-box',
    display: 'none',
    height: '100%',
    maxHeight: 600,
    listStyleType: 'none',
    margin: 0,
    padding: 15,
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
  theme: ThemeSchema,
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
};

export default ResultList;
