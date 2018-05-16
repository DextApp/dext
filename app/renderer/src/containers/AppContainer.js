import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import App from '../components/App';
import {
  IPC_WINDOW_RESIZE,
  IPC_WINDOW_COLLAPSE,
  IPC_WINDOW_EXPAND,
  IPC_LOAD_THEME,
  IPC_QUERY_COMMAND,
} from '../../../ipc';

export default class AppContainer extends Component {
  static displayName = 'AppContainer';

  state = {
    // the current query value
    query: '',
    // the current set of results
    results: [],
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
    this.setState({ theme }, () => {
      console.log(this.state.theme);
    });
  };

  setDetails = details => {
    this.setState({ details });
  };

  resetDetails = () => {
    this.setDetails('');
  };

  updateResults = results => {
    this.setState({ results });
  };

  resetResults = () => {
    this.setState({ results: [] });
  };

  updateQuery = nextQuery => {
    this.setState({ query: nextQuery });
    this.resetSelectedItem();
    this.resetDetails();
    ipcRenderer.send(IPC_QUERY_COMMAND, { q: nextQuery });
    ipcRenderer.send(IPC_WINDOW_EXPAND);
  };

  resetQuery = () => {
    this.setState({ results: [] });
    ipcRenderer.send(IPC_WINDOW_COLLAPSE);
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
        results={this.state.results}
        selectedIndex={this.state.selectedIndex}
        theme={this.state.theme}
        onClearActiveKey={this.clearActiveKey}
        onLoadDetails={this.setDetails}
        onQueryChange={this.updateQuery}
        onQueryReset={this.resetQuery}
        onResetKeys={this.resetKeys}
        onResetResults={this.resetResults}
        onSelectItem={this.setSelectedItem}
        onSetActiveKey={this.setActiveKey}
        onUpdateResults={this.updateResults}
      />
    );
  }
}
