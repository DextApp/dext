import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QueryField from '../../components/query-field';
import { ThemeSchema } from '../../schema';
import { IPC_WINDOW_SHOW, IPC_WINDOW_HIDE } from '../../../../ipc';

const QueryFieldContainer = class extends Component {
  static displayName = 'QueryFieldContainer';
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    // focus the query input field when the window is shown
    ipcRenderer.on(IPC_WINDOW_SHOW, () => {
      self.focus();
    });
    // resets the querty and blurs the input field when the window is hidden
    ipcRenderer.on(IPC_WINDOW_HIDE, () => {
      this.props.onReset && this.props.onReset();
      self.blur();
    });
  }

  focus() {
    if (this.queryField) {
      this.queryField.input.focus();
    }
  }

  blur() {
    if (this.queryField) {
      this.queryField.input.blur();
    }
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.onChange && this.props.onChange(value);
  }

  attach = c => {
    this.queryField = c;
  };

  render() {
    const { q, theme } = this.props;
    return (
      <QueryField
        ref={this.attach}
        value={q}
        onChange={this.handleChange}
        theme={theme}
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
