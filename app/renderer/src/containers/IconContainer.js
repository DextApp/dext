import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../components/icon';
import { IPC_FETCH_ICON, IPC_RETRIEVE_ICON } from '../../../ipc';

export default class IconContainer extends Component {
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

IconContainer.defaultProps = {
  icon: {
    type: 'text',
    path: '',
    letter: '',
    bgColor: '',
  },
};

IconContainer.propTypes = {
  icon: PropTypes.shape({
    type: PropTypes.oneOf(['file', 'text', 'fileicon', '']),
    path: PropTypes.string,
    letter: PropTypes.string,
    bgColor: PropTypes.string,
  }),
};
