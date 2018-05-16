import PropTypes from 'prop-types';
import React from 'react';
import { compose, pseudo, style } from 'glamor';

const ResultDetails = ({ theme, content, expanded }) => {
  const base = compose(
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
    expanded
      ? style({
          right: '0%',
        })
      : {}
  );

  // apply theme styles
  const styles =
    theme && theme.resultDetails ? compose(base, theme.resultDetails) : base;

  return (
    // eslint-disable-next-line react/no-danger
    <div {...styles} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

ResultDetails.defaultProps = {
  content: '',
  expanded: false,
  theme: {},
};

ResultDetails.propTypes = {
  content: PropTypes.string,
  expanded: PropTypes.bool,
  theme: PropTypes.object,
};

export default ResultDetails;
