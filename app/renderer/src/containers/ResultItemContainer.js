import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultItem from '../components/ResultItem';
import { ThemeSchema, ResultItemSchema } from '../schema';
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

  isAltMod() {
    return this.props.selected && this.props.keys && this.props.keys.indexOf('alt') > -1;
  }

  isSuperMod() {
    return this.props.selected && this.props.keys && this.props.keys.indexOf('meta') > -1;
  }

  execute() {
    const { item } = this.props;
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, {
      action,
      item,
      isAltMod: this.isAltMod(),
      isSuperMod: this.isSuperMod(),
    });
  }

  render() {
    const { theme, item, selected } = this.props;
    return (
      <ResultItem
        theme={theme}
        item={item}
        selected={selected}
        onDoubleClick={this.handleDoubleClick}
        isAltMod={this.isAltMod()}
        isSuperMod={this.isSuperMod()}
      />
    );
  }
};

ResultItemContainer.defaultProps = {
  theme: {},
};

ResultItemContainer.propTypes = {
  theme: ThemeSchema,
  // item prop should follow the Alfred workflow script filter JSON format
  // https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
  item: ResultItemSchema,
  selected: PropTypes.bool,
  keys: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  keys: state.keys,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultItemContainer);
