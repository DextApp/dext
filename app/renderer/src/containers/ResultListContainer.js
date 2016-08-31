import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultList from '../components/ResultList';
import ResultItemSchema from '../schema/ResultItemSchema';
import {
  IPC_WINDOW_RESIZE,
  IPC_QUERY_RESULTS,
  IPC_SELECT_PREVIOUS_ITEM,
  IPC_SELECT_NEXT_ITEM,
  IPC_EXECUTE_CURRENT_ITEM,
  IPC_EXECUTE_ITEM,
} from '../../../ipc';

const ResultListContainer = class extends Component {
  componentDidMount() {
    const self = this;
    const { updateResults, resetResults, selectNextItem, selectPreviousItem } = this.props;
    // focus the query input field when the window is shown
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
      }
    });
    ipcRenderer.on(IPC_SELECT_NEXT_ITEM, () => {
      if (self.props.selectedIndex < self.props.results.length - 1) {
        selectNextItem();
      }
    });
    ipcRenderer.on(IPC_EXECUTE_CURRENT_ITEM, () => {
      self.execute();
    });
  }

  execute() {
    const { results, selectedIndex } = this.props;
    const item = results[selectedIndex];
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, { action, item });
  }

  render() {
    const { theme, results, selectedIndex } = this.props;
    return (
      <ResultList
        theme={theme}
        results={results}
        selectedIndex={selectedIndex}
      />
    );
  }
};

ResultListContainer.defaultProps = {
  theme: {},
  results: [],
  selectItem: () => { },
  selectNextItem: () => { },
  selectPreviousItem: () => { },
  updateResults: () => { },
  resetResults: () => { },
};

ResultListContainer.propTypes = {
  theme: PropTypes.object,
  results: PropTypes.arrayOf(ResultItemSchema),
  selectedIndex: PropTypes.number,
  selectItem: PropTypes.func,
  selectNextItem: PropTypes.func,
  selectPreviousItem: PropTypes.func,
  updateResults: PropTypes.func,
  resetResults: PropTypes.func,
};

const mapStateToProps = state => ({
  results: state.results,
  selectedIndex: state.selectedIndex,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultListContainer);
