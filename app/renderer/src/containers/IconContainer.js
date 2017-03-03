import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import Icon from '../components/Icon';
import {
  IPC_FETCH_ICON,
  IPC_RETRIEVE_ICON,
} from '../../../ipc';

export default class IconContainer extends Component {
  state = {
    icon: {
      type: 'text',
      letter: '',
      path: '',
    },
  };

  fetchIcon = (evt, icon) => {
    this.setState({
      icon: {
        type: 'file',
        path: icon,
      },
    });
  }

  componentDidMount() {
    if (this.props.icon.type === 'fileicon') {
      ipcRenderer.send(IPC_FETCH_ICON, this.props.icon.path);
      ipcRenderer.on(IPC_RETRIEVE_ICON, this.fetchIcon);
    } else {
      this.setState({ icon: this.props.icon });
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_RETRIEVE_ICON, this.fetchIcon);
  }

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
