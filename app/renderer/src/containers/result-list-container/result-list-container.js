/* global window */
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/creators';
import ResultList from '../../components/result-list';
import { ResultItemSchema, ThemeSchema } from '../../schema';
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

const ResultListContainer = class extends Component {
  static displayName = 'ResultListContainer';

  state = {
    copiedToClipboard: false,
  };

  componentDidMount() {
    const {
      updateResults,
      resetResults,
      selectNextItem,
      selectPreviousItem,
    } = this.props;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    ipcRenderer.on(IPC_WINDOW_SHOW, () => {
      this.props.onResetKeys && this.props.onResetKeys();
    });
    ipcRenderer.on(IPC_QUERY_RESULTS, (evt, newResults) => {
      // update the height
      if (newResults.length) {
        // TODO: compute the height + added padding
        const height = newResults.length * 60 + 30;
        ipcRenderer.send(IPC_WINDOW_RESIZE, { height });
      }
      if (newResults.length) {
        updateResults(newResults);
      } else {
        resetResults();
      }
      this.setState({ copiedToClipboard: false });
    });
    ipcRenderer.on(IPC_SELECT_PREVIOUS_ITEM, () => {
      if (this.props.selectedIndex > 0) {
        selectPreviousItem();
        this.setState({ copiedToClipboard: false });
        this.scrollToItem(this.props.selectedIndex);
        this.retrieveDetails(this.props.selectedIndex);
      }
    });
    ipcRenderer.on(IPC_SELECT_NEXT_ITEM, () => {
      if (this.props.selectedIndex < this.props.results.length - 1) {
        selectNextItem();
        this.setState({ copiedToClipboard: false });
        this.scrollToItem(this.props.selectedIndex);
        this.retrieveDetails(this.props.selectedIndex);
      }
    });
    ipcRenderer.on(IPC_COPY_CURRENT_ITEM_KEY, () => {
      this.copyItem();
    });
    ipcRenderer.on(IPC_EXECUTE_CURRENT_ITEM, () => {
      this.execute();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = e => {
    this.props.onSetActiveKey && this.props.onSetActiveKey(e.key.toLowerCase());
  };

  handleKeyUp = e => {
    this.props.onClearActiveKey &&
      this.props.onClearActiveKey(e.key.toLowerCase());
  };

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
    const { results, selectedIndex } = this.props;
    const item = results[selectedIndex];
    ipcRenderer.send(IPC_COPY_CURRENT_ITEM, item);
    this.setState({ copiedToClipboard: true });
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
    const scrollY = index >= 10 ? (index - 10) * 60 + 60 : 0;

    this.c.c.scrollTop = scrollY;
  }

  render() {
    if (this.props.results.length) {
      return (
        <ResultList
          ref={c => {
            this.c = c;
          }}
          theme={this.props.theme}
          keys={this.props.keys}
          results={this.props.results}
          selectedIndex={this.props.selectedIndex}
          copiedToClipboard={this.props.copiedToClipboard}
        />
      );
    }
    return null;
  }
};

ResultListContainer.defaultProps = {
  theme: {},
  keys: [],

  // todo - still in redux
  results: [],
  selectedIndex: 0,
  selectItem: () => {},
  selectNextItem: () => {},
  selectPreviousItem: () => {},
  updateResults: () => {},
  resetResults: () => {},
};

ResultListContainer.propTypes = {
  theme: ThemeSchema,
  keys: PropTypes.arrayOf(PropTypes.string),
  onSetActiveKey: PropTypes.func,
  onClearActiveKey: PropTypes.func,
  onResetKeys: PropTypes.func,

  // todo - still in redux
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
  selectNextItem: PropTypes.func,
  selectPreviousItem: PropTypes.func,
  updateResults: PropTypes.func,
  resetResults: PropTypes.func,
};

const mapStateToProps = state => ({
  results: state.results,
  selectedIndex: state.selectedIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  ResultListContainer
);
