/* global window */
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/creators';
import ResultList from '../../components/result-list';
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
      if (newResults.length) this.props.updateResults(newResults);
      else this.props.resetResults();
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
    this.c.c.scrollTop = scrollY;
  };

  render() {
    return this.props.results.length ? (
      <ResultList
        ref={c => {
          this.c = c;
        }}
        details={this.props.details}
        theme={this.props.theme}
        keys={this.props.keys}
        results={this.props.results}
        selectedIndex={this.props.selectedIndex}
        copiedToClipboard={this.state.copiedToClipboard}
        onLoadDetails={this.props.onLoadDetails}
      />
    ) : null;
  }
};

ResultListContainer.defaultProps = {
  details: '',
  keys: [],
  selectedIndex: 0,
  theme: {},

  // todo - still in redux
  results: [],
  updateResults: () => {},
  resetResults: () => {},
};

ResultListContainer.propTypes = {
  theme: PropTypes.object,
  details: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  onClearActiveKey: PropTypes.func.isRequired,
  onLoadDetails: PropTypes.func.isRequired,
  onResetKeys: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onSetActiveKey: PropTypes.func.isRequired,

  // todo - still in redux
  results: PropTypes.arrayOf(PropTypes.object),
  selectNextItem: PropTypes.func.isRequired,
  selectPreviousItem: PropTypes.func.isRequired,
  updateResults: PropTypes.func,
  resetResults: PropTypes.func,
};

const mapStateToProps = state => ({
  results: state.results,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  ResultListContainer
);
