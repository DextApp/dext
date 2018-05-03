import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import * as actionCreators from '../actions/creators';
import {
  IPC_WINDOW_RESIZE,
  IPC_LOAD_THEME,
  IPC_QUERY_COMMAND,
} from '../../../ipc';

const AppContainer = class extends Component {
  static displayName = 'AppContainer';

  state = {
    // the current query value
    query: '',
    // the current theme
    theme: {},
    // currently pressed keys
    keys: [],
    // details pane content
    details: '',
    // currently selected index
    selectedIndex: 0,
  };

  componentDidMount() {
    ipcRenderer.on(IPC_LOAD_THEME, (evt, nextTheme) => {
      this.setTheme(nextTheme);
    });
  }

  componentDidUpdate() {
    if (
      this.state.theme &&
      this.state.theme.window &&
      this.state.theme.window.width
    ) {
      let width = this.state.theme.window.width;
      if (this.state.theme.window.width > 650) {
        width = 650;
      }
      ipcRenderer.send(IPC_WINDOW_RESIZE, { width });
    }
  }

  setTheme = theme => {
    this.setState({ theme });
  };

  setDetails = details => {
    this.setState({ details });
  };

  resetDetails = () => {
    this.setDetails('');
  };

  updateQuery = nextQuery => {
    this.setState({ query: nextQuery });
    this.resetSelectedItem();
    this.resetDetails();
    ipcRenderer.send(IPC_QUERY_COMMAND, { q: nextQuery });
  };

  resetQuery = () => {
    // @todo - just clean the results once results actions/reducers are removed
    if (this.props.resetResults) this.props.resetResults();
  };

  setActiveKey = key => {
    this.setState(prev => ({
      keys: [...prev.keys, key],
    }));
  };

  clearActiveKey = key => {
    this.setState(previousState => ({
      keys: [
        ...previousState.keys.slice(0, previousState.keys.indexOf(key)),
        ...previousState.keys.slice(previousState.keys.indexOf(key) + 1),
      ],
    }));
  };

  resetKeys = () => {
    this.setState({ keys: [] });
  };

  setSelectedItem = selectedIndex => {
    this.setState({ selectedIndex });
  };

  resetSelectedItem = () => {
    this.setState({ selectedIndex: 0 });
  };

  render() {
    return (
      <App
        details={this.state.details}
        keys={this.state.keys}
        q={this.state.query}
        selectedIndex={this.state.selectedIndex}
        theme={this.state.theme}
        onClearActiveKey={this.clearActiveKey}
        onLoadDetails={this.setDetails}
        onQueryChange={this.updateQuery}
        onQueryReset={this.resetQuery}
        onResetKeys={this.resetKeys}
        onSelectItem={this.setSelectedItem}
        onSetActiveKey={this.setActiveKey}
      />
    );
  }
};

AppContainer.defaultProps = {
  // redux-actions
  resetResults: () => {},
};

AppContainer.propTypes = {
  // redux-actions
  resetResults: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);
