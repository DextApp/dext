import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import * as actionCreators from '../actions/creators';
import { ThemeSchema } from '../schema';
import {
  IPC_WINDOW_RESIZE,
  IPC_LOAD_THEME,
  IPC_QUERY_COMMAND,
} from '../../../ipc';

const AppContainer = class extends Component {
  static displayName = 'AppContainer';

  state = {
    // the current query value
    q: '',
  };

  componentDidMount() {
    const { setTheme } = this.props;
    // focus the query input field when the window is shown
    ipcRenderer.on(IPC_LOAD_THEME, (evt, data) => {
      setTheme(data);
    });
  }

  componentDidUpdate() {
    const { theme } = this.props;
    if (theme && theme.window && theme.window.width) {
      let width = theme.window.width;
      if (theme.window.width > 650) {
        width = 650;
      }
      ipcRenderer.send(IPC_WINDOW_RESIZE, { width });
    }
  }

  updateQuery = q => {
    this.setState({ q });
    ipcRenderer.send(IPC_QUERY_COMMAND, { q });
  };

  resetQuery = () => {
    // @todo - just clearn the results once results actions/reducers are removed
    this.props.resetResults && this.props.resetResults();
  };

  render() {
    const { theme } = this.props;
    const { q } = this.state;

    return (
      <App
        q={q}
        theme={theme}
        onQueryChange={this.updateQuery}
        onQueryReset={this.resetQuery}
      />
    );
  }
};

AppContainer.defaultProps = {
  theme: {},

  // redux-actions
  setTheme: () => {},
};

AppContainer.propTypes = {
  theme: ThemeSchema,

  // redux-actions
  setTheme: PropTypes.func,
};

const mapStateToProps = state => ({
  theme: state.theme,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
