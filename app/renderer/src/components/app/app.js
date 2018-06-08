import React from 'react';
import { compose, style } from 'glamor';
import { ipcRenderer } from 'electron';
import {
  IPC_WINDOW_RESIZE,
  IPC_WINDOW_COLLAPSE,
  IPC_WINDOW_EXPAND,
  IPC_LOAD_THEME,
  IPC_QUERY_COMMAND,
} from '../../../../ipc';
import QueryField from '../query-field';
import ResultList from '../result-list';

const outerBase = style({
  backgroundColor: '#f2f2f2',
  boxSizing: 'border-box',
  width: '100%',
  paddingLeft: 3,
  paddingRight: 3,
});

const base = style({
  backgroundColor: '#f2f2f2',
  color: '#333',
  borderRadius: 3,
  borderWidth: 0,
  boxSizing: 'border-box',
  fontFamily: 'Lucida Grande, Arial, sans-serif',
  fontWeight: 'lighter',
  width: '100%',
  overflow: 'hidden',
});

const getOuterStyles = theme =>
  theme && theme.window
    ? compose(
        outerBase,
        {
          backgroundColor: theme.window.backgroundColor,
        }
      )
    : outerBase;

const getInnerStyles = theme =>
  theme && theme.window
    ? compose(
        base,
        theme.window
      )
    : base;

export default class App extends React.PureComponent {
  static displayName = 'App';
  state = {
    query: '',
    results: [],
    theme: {},
    keys: [],
    details: '',
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
      ipcRenderer.send(IPC_WINDOW_RESIZE, {
        width:
          this.state.theme.window.width > 650
            ? 650
            : this.state.theme.window.width,
      });
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

  updateResults = results => {
    this.setState({ results });
  };

  resetResults = () => {
    this.setState({ results: [] });
  };

  updateQuery = nextQuery => {
    this.setState({ query: nextQuery });
    this.resetSelectedIndex();
    this.resetDetails();
    ipcRenderer.send(IPC_QUERY_COMMAND, { q: nextQuery });
    ipcRenderer.send(IPC_WINDOW_EXPAND);
  };

  resetQuery = () => {
    this.setState({ results: [] });
    ipcRenderer.send(IPC_WINDOW_COLLAPSE);
  };

  setActiveKey = key => {
    this.setState(prevState => ({
      keys: [...prevState.keys, key],
    }));
  };

  clearActiveKey = key => {
    this.setState(prevState => ({
      keys: prevState.keys.filter(keyToOmit => keyToOmit === key),
    }));
  };

  resetKeys = () => {
    this.setState({ keys: [] });
  };

  setSelectedIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  resetSelectedIndex = () => {
    this.setState({ selectedIndex: 0 });
  };

  render() {
    const outerStyles = getOuterStyles(this.state.theme);
    const innerStyles = getInnerStyles(this.state.theme);
    return (
      <div {...outerStyles}>
        <div {...innerStyles}>
          <QueryField
            query={this.state.query}
            theme={this.state.theme}
            onChange={this.updateQuery}
            onReset={this.resetQuery}
          />
          <ResultList
            details={this.state.details}
            keys={this.state.keys}
            onClearActiveKey={this.clearActiveKey}
            onLoadDetails={this.setDetails}
            onResetKeys={this.resetKeys}
            onResetResults={this.resetResults}
            onSelectItem={this.setSelectedIndex}
            onSetActiveKey={this.setActiveKey}
            onUpdateResults={this.updateResults}
            results={this.state.results}
            selectedIndex={this.state.selectedIndex}
            theme={this.state.theme}
          />
        </div>
      </div>
    );
  }
}
