/* global window */

import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultList from '../components/ResultList';
import { ResultItemSchema, ThemeSchema } from '../schema';
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
} from '../../../ipc';

const ResultListContainer = class extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const self = this;
    const { updateResults, resetResults, selectNextItem, selectPreviousItem } = this.props;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    ipcRenderer.on(IPC_WINDOW_SHOW, () => {
      this.props.resetKeys();
    });
    ipcRenderer.on(IPC_QUERY_RESULTS, (evt, newResults) => {
      // update the height
      if (newResults.length) {
        // TODO: compute the height + added padding
        const height = (newResults.length * 60) + 30;
        ipcRenderer.send(IPC_WINDOW_RESIZE, { height });
      }
      if (newResults.length) {
        updateResults(newResults);
      } else {
        resetResults();
      }
    });
    ipcRenderer.on(IPC_SELECT_PREVIOUS_ITEM, () => {
      if (self.props.selectedIndex > 0) {
        selectPreviousItem();
        self.scrollToItem(self.props.selectedIndex);
        self.retrieveDetails(self.props.selectedIndex);
      }
    });
    ipcRenderer.on(IPC_SELECT_NEXT_ITEM, () => {
      if (self.props.selectedIndex < self.props.results.length - 1) {
        selectNextItem();
        self.scrollToItem(self.props.selectedIndex);
        self.retrieveDetails(self.props.selectedIndex);
      }
    });
    ipcRenderer.on(IPC_COPY_CURRENT_ITEM_KEY, () => {
      self.copyItem();
    });
    ipcRenderer.on(IPC_EXECUTE_CURRENT_ITEM, () => {
      self.execute();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(e) {
    this.props.setActiveKey(e.key.toLowerCase());
  }

  handleKeyUp(e) {
    this.props.clearActiveKey(e.key.toLowerCase());
  }

  /**
   * Retrieves the extended details for the given item
   *
   * @param {Number} index - The index of the results
   */
  retrieveDetails(index) {
    const item = this.props.results[index];
    ipcRenderer.send(IPC_ITEM_DETAILS_REQUEST, item);
  }

  /**
   * Copies the selected item to the clipboard
   * and update the state for other component to listen to.
   */
  copyItem() {
    const { results, selectedIndex, copyToClipboard } = this.props;
    const item = results[selectedIndex];
    ipcRenderer.send(IPC_COPY_CURRENT_ITEM, item);
    copyToClipboard();
  }

  isAltMod() {
    return this.props.keys && this.props.keys.indexOf('alt') > -1;
  }

  isSuperMod() {
    return this.props.keys && this.props.keys.indexOf('meta') > -1;
  }

  /**
   * Executs the current item
   */
  execute() {
    const { results, selectedIndex } = this.props;
    const item = results[selectedIndex];
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, {
      action,
      item,
      isAltMod: this.isAltMod(),
      isSuperMod: this.isSuperMod(),
    });
  }

  /**
   * Scrolls the list to the given item
   *
   * @param {Number} index
   */
  scrollToItem(index) {
    const scrollY = (index >= 10)
      ? ((index - 10) * 60) + 60
      : 0;

    this.c.c.scrollTop = scrollY;
  }

  render() {
    const { theme, results, selectedIndex } = this.props;
    if (results.length) {
      return (
        <ResultList
          ref={(c) => { this.c = c; }}
          theme={theme}
          results={results}
          selectedIndex={selectedIndex}
        />
      );
    }
    return null;
  }
};

ResultListContainer.defaultProps = {
  theme: {},
  keys: [],
  results: [],
  selectedIndex: 0,
  selectItem: () => { },
  selectNextItem: () => { },
  selectPreviousItem: () => { },
  updateResults: () => { },
  resetResults: () => { },
  setActiveKey: () => {},
  clearActiveKey: () => {},
  resetKeys: () => {},
};

ResultListContainer.propTypes = {
  theme: ThemeSchema,
  keys: PropTypes.arrayOf(PropTypes.string),
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
  selectNextItem: PropTypes.func,
  selectPreviousItem: PropTypes.func,
  updateResults: PropTypes.func,
  resetResults: PropTypes.func,
  setActiveKey: PropTypes.func,
  clearActiveKey: PropTypes.func,
  resetKeys: PropTypes.func,
  copyToClipboard: PropTypes.func,
};

const mapStateToProps = state => ({
  results: state.results,
  selectedIndex: state.selectedIndex,
  keys: state.keys,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultListContainer);
