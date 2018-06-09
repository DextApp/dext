import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { compose, pseudo, style } from 'glamor';
import {
  IPC_WINDOW_SHOW,
  IPC_WINDOW_RESIZE,
  IPC_QUERY_RESULTS,
  IPC_SELECT_PREVIOUS_ITEM,
  IPC_SELECT_NEXT_ITEM,
  IPC_COPY_CURRENT_ITEM_KEY,
  IPC_COPY_CURRENT_ITEM,
  IPC_EXECUTE_CURRENT_ITEM,
  IPC_ITEM_DETAILS_REQUEST,
  IPC_EXECUTE_ITEM,
} from '../../../../ipc';
/* eslint-disable react/no-array-index-key */
import ResultItem from '../result-item';
import ResultDetails from '../result-details';

const base = compose(
  style({
    boxSizing: 'border-box',
    display: 'none',
    height: '100%',
    maxHeight: 600,
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
  }),
  pseudo('::-webkit-scrollbar', {
    width: 3,
    marginRight: 3,
  }),
  pseudo('::-webkit-scrollbar-thumb', {
    backgroundColor: '#bbb',
  })
);

const shown = style({
  display: 'block',
});

class ResultList extends Component {
  static displayName = 'ResultList';
  state = {
    copiedToClipboard: false,
  };
  static defaultProps = {
    details: '',
    keys: [],
    results: [],
    selectedIndex: 0,
    theme: {},
  };
  static propTypes = {
    theme: PropTypes.object,
    details: PropTypes.string,
    keys: PropTypes.arrayOf(PropTypes.string),
    results: PropTypes.arrayOf(PropTypes.object),
    selectedIndex: PropTypes.number,
    onClearActiveKey: PropTypes.func.isRequired,
    onLoadDetails: PropTypes.func.isRequired,
    onResetKeys: PropTypes.func.isRequired,
    onResetResults: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onSetActiveKey: PropTypes.func.isRequired,
    onUpdateResults: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    ipcRenderer.on(IPC_WINDOW_SHOW, () => {
      this.props.onResetKeys();
    });
    ipcRenderer.on(IPC_QUERY_RESULTS, (evt, newResults) => {
      // update the height
      if (newResults.length) {
        // TODO: compute the height + added padding
        const height = newResults.length * 60 + 30;
        ipcRenderer.send(IPC_WINDOW_RESIZE, { height });
      }
      if (newResults.length) this.props.onUpdateResults(newResults);
      else this.props.onResetResults();
      this.setState({ copiedToClipboard: false });
      this.retrieveDetails(this.props.selectedIndex);
    });
    ipcRenderer.on(IPC_SELECT_PREVIOUS_ITEM, () => {
      if (this.props.selectedIndex > 0) {
        this.props.onSelectItem(this.props.selectedIndex - 1);
        this.setState({ copiedToClipboard: false }, () => {
          this.scrollToItem(this.props.selectedIndex);
          this.retrieveDetails(this.props.selectedIndex);
        });
      }
    });
    ipcRenderer.on(IPC_SELECT_NEXT_ITEM, () => {
      if (this.props.selectedIndex < this.props.results.length - 1) {
        this.props.onSelectItem(this.props.selectedIndex + 1);
        this.setState({ copiedToClipboard: false }, () => {
          this.scrollToItem(this.props.selectedIndex);
          this.retrieveDetails(this.props.selectedIndex);
        });
      }
    });
    ipcRenderer.on(IPC_COPY_CURRENT_ITEM_KEY, () => {
      this.copyItem();
    });
    ipcRenderer.on(IPC_EXECUTE_CURRENT_ITEM, () => {
      this.execute();
    });
  }
  // @TODO: Move this into a separate component?
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
  handleKeyDown = e => {
    this.props.onSetActiveKey(e.key.toLowerCase());
  };
  handleKeyUp = e => {
    this.props.onClearActiveKey(e.key.toLowerCase());
  };
  retrieveDetails = index => {
    if (this.props.results[index]) {
      ipcRenderer.send(IPC_ITEM_DETAILS_REQUEST, this.props.results[index]);
    }
  };
  copyItem = () => {
    const item = this.props.results[this.props.selectedIndex];
    ipcRenderer.send(IPC_COPY_CURRENT_ITEM, item);
    this.setState({ copiedToClipboard: true });
  };
  isAltMod = () => this.props.keys && this.props.keys.indexOf('alt') > -1;
  isSuperMod = () => this.props.keys && this.props.keys.indexOf('meta') > -1;
  /**
   * Executs the current item
   */
  execute = () => {
    const item = this.props.results[this.props.selectedIndex];
    if (item) {
      ipcRenderer.send(IPC_EXECUTE_ITEM, {
        action: item.action,
        item,
        isAltMod: this.isAltMod(),
        isSuperMod: this.isSuperMod(),
      });
    }
  };
  /**
   * Given an index, we scroll the list to the item with matching index
   * @param {Number} index
   */
  scrollToItem = index => {
    const scrollY = index >= 10 ? (index - 10) * 60 + 60 : 0;
    // @TODO: figure out what this is.
    this.c.scrollTop = scrollY;
  };
  getResultItems = (results, selectedIndex, theme, keys, copiedToClipboard) =>
    results.map((item, key) => (
      <ResultItem
        key={key}
        theme={theme}
        keys={keys}
        item={item}
        copiedToClipboard={copiedToClipboard}
        selected={selectedIndex === key}
      />
    ));
  render() {
    const currItem = this.props.results[this.props.selectedIndex];
    return this.props.results.length ? (
      <div
        {...style({ position: 'relative', paddingTop: 15, paddingBottom: 15 })}
      >
        <ol
          {...compose(
            base,
            this.props.results.length && shown
          )}
          ref={c => {
            this.c = c;
          }}
        >
          {this.getResultItems(
            this.props.results,
            this.props.selectedIndex,
            this.props.theme,
            this.props.keys,
            this.state.copiedToClipboard
          )}
        </ol>
        {currItem && (
          <ResultDetails
            details={this.props.details}
            theme={this.props.theme}
            onLoad={this.props.onLoadDetails}
          />
        )}
      </div>
    ) : null;
  }
}

export default ResultList;
