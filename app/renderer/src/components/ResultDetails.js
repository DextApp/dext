import React, { PropTypes } from 'react';
import { compose, pseudo, style } from 'glamor';

const ResultDetails = ({ content }) => {
  const styles = compose(
    // apply base style
    style({
      boxSizing: 'border-box',
      position: 'absolute',
      backgroundColor: '#f2f2f2',
      width: '65%',
      right: '-65%',
      top: 0,
      bottom: 0,
      padding: 15,
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderLeftColor: '#bbb',
      transitionDuration: '250ms',
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
    // apply expanded style if necessary
    content ? style({
      right: '0%',
    }) : {},
  );
  return (
    <div {...styles} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

ResultDetails.defaultProps = {
  content: '',
};

ResultDetails.propTypes = {
  content: PropTypes.string,
};

export default ResultDetails;
