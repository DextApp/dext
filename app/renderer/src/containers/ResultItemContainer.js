import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultItem from '../components/ResultItem';
import ResultItemSchema from '../schema/ResultItemSchema';
import {
  IPC_EXECUTE_ITEM,
} from '../../../ipc';

const ResultItemContainer = class extends Component {
  constructor() {
    super();
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    this.execute();
  }

  execute() {
    const { item } = this.props;
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, { action, item });
  }

  render() {
    const { theme, item, selected } = this.props;
    return (
      <ResultItem
        theme={theme}
        item={item}
        selected={selected}
        onDoubleClick={this.handleDoubleClick}
      />
    );
  }
};

ResultItemContainer.propTypes = {
  theme: PropTypes.object,
  // item prop should follow the Alfred workflow script filter JSON format
  // https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
  action: PropTypes.string,
  item: ResultItemSchema,
  selected: PropTypes.bool,
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(null, mapDispatchToProps)(ResultItemContainer);
