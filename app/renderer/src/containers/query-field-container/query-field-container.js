import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QueryField from '../../components/query-field';
import { ThemeSchema } from '../../schema';
import { IPC_WINDOW_SHOW, IPC_WINDOW_HIDE } from '../../../../ipc';

const QueryFieldContainer = class extends Component {
  queryField = null;

  static displayName = 'QueryFieldContainer';

  componentDidMount() {
    ipcRenderer.on(IPC_WINDOW_SHOW, () => {
      this.focus();
    });
    ipcRenderer.on(IPC_WINDOW_HIDE, () => {
      if (this.props.onReset) this.props.onReset();
      this.blur();
    });
  }

  focus = () => {
    if (this.queryField) {
      this.queryField.focus();
    }
  };

  blur = () => {
    if (this.queryField) {
      this.queryField.blur();
    }
  };

  handleChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.value);
  };

  attachQueryField = queryField => {
    this.queryField = queryField;
  };

  render() {
    return (
      <QueryField
        attachInputRef={this.attachQueryField}
        value={this.props.q}
        onChange={this.handleChange}
        theme={this.props.theme}
      />
    );
  }
};

QueryFieldContainer.defaultProps = {
  q: '',
  theme: {},
};

QueryFieldContainer.propTypes = {
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  q: PropTypes.string,
  theme: ThemeSchema,
};

export default QueryFieldContainer;
