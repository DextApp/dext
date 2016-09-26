import React, { PropTypes } from 'react';
import { compose, style } from 'glamor';

const iconImg = style({
  maxWidth: 40,
  maxHeight: 40,
});

const iconImgText = compose(
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
  }),
);

const Icon = (props) => {
  switch (props.icon.type) {
    case 'text':
      return <span {...iconImgText} role="presentation">{props.icon.letter}</span>;
    case 'file':
      // no break
    default: // eslint-disable-line no-fallthrough
      return <img {...iconImg} src={props.icon.path} role="presentation" />;
  }
};

Icon.defaultProps = {
  icon: {
    type: '',
    path: '',
    letter: '',
  },
};

Icon.propTypes = {
  icon: PropTypes.shape({
    type: PropTypes.oneOf(['file', 'text', '']),
    path: PropTypes.string,
    letter: PropTypes.string,
  }),
};

export default Icon;
