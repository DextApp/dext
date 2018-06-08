import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, style } from 'glamor';
import { IPC_FETCH_ICON, IPC_RETRIEVE_ICON } from '../../../../ipc';

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

export default class IconWrapper extends Component {
  state = {
    icon: {
      type: 'text',
      letter: '',
      path: '',
    },
  };

  componentDidMount() {
    if (this.props.icon.type === 'fileicon') {
      ipcRenderer.send(IPC_FETCH_ICON, this.props.icon.path);
      ipcRenderer.on(IPC_RETRIEVE_ICON, this.fetchIcon);
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ icon: this.props.icon });
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_RETRIEVE_ICON, this.fetchIcon);
  }

  fetchIcon = (evt, iconPath) => {
    this.setState({
      icon: {
        type: 'file',
        path: iconPath,
      },
    });
  };

  render() {
    return <Icon icon={this.state.icon} />;
  }
}

IconWrapper.defaultProps = {
  icon: {
    type: 'text',
    path: '',
    letter: '',
    bgColor: '',
  },
};

IconWrapper.propTypes = {
  icon: PropTypes.shape({
    type: PropTypes.oneOf(['file', 'text', 'fileicon', '']),
    path: PropTypes.string,
    letter: PropTypes.string,
    bgColor: PropTypes.string,
  }),
};
