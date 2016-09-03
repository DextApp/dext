import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import * as actionCreators from '../actions/creators';
import { ThemeSchema } from '../schema';
import {
  IPC_WINDOW_RESIZE,
  IPC_LOAD_THEME,
} from '../../../ipc';

const AppContainer = class extends Component {
  componentDidMount() {
    const { setTheme } = this.props;
    // focus the query input field when the window is shown
    ipcRenderer.on(IPC_LOAD_THEME, (evt, data) => {
      setTheme(data);
    });
  }

  componentDidUpdate() {
    const { theme } = this.props;
    if (theme && theme.window.width) {
      let width = theme.window.width;
      // cap the window width at 650
      if (theme.window.width > 650) {
        width = 650;
      }
      ipcRenderer.send(IPC_WINDOW_RESIZE, { width });
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <App theme={theme} />
    );
  }
};

AppContainer.defaultProps = {
  theme: {},
  setTheme: () => { },
};

AppContainer.propTypes = {
  theme: ThemeSchema,
  setTheme: PropTypes.func,
};

const mapStateToProps = state => ({
  theme: state.theme,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
