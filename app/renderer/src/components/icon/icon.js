import PropTypes from 'prop-types';
import React from 'react';
import { compose, style } from 'glamor';

const iconImg = style({
  maxWidth: 40,
  maxHeight: 40,
});

const iconImgTextBase = compose(
  iconImg,
  style({
    display: 'block',
    backgroundColor: '#888',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    width: 40,
    height: 40,
    lineHeight: '40px',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
  })
);

const Icon = props => {
  const iconTextStyle = props.icon.bgColor
    ? compose(
        iconImgTextBase,
        props.icon.bgColor &&
          style({
            backgroundColor: props.icon.bgColor,
          })
      )
    : iconImgTextBase;

  switch (props.icon.type) {
    case 'text':
      return (
        <span {...iconTextStyle} role="presentation">
          {props.icon.letter}
        </span>
      );
    default:
      // eslint-disable-line no-fallthrough
      return (
        <img {...iconImg} src={props.icon.path} role="presentation" alt="" />
      );
  }
};

Icon.defaultProps = {
  icon: {
    type: '',
    path: '',
    letter: '',
    bgColor: '',
  },
};

Icon.propTypes = {
  icon: PropTypes.shape({
    type: PropTypes.oneOf(['file', 'text', '']),
    path: PropTypes.string,
    letter: PropTypes.string,
    bgColor: PropTypes.string,
  }),
};

export default Icon;
