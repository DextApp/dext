import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QueryField from '../components/QueryField';
import * as actionCreators from '../actions/creators';
import { ThemeSchema } from '../schema';
import { IPC_WINDOW_SHOW, IPC_WINDOW_HIDE } from '../../../ipc';

const QueryFieldContainer = class extends Component {
  static displayName = 'QueryFieldContainer';
  constructor() {
    super();
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
      const { resetQuery } = this.props;
      resetQuery();
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
    const { updateQuery } = this.props;
    updateQuery(e.target.value);
  }

  render() {
    const { theme, q } = this.props;
    return (
      <QueryField
        ref={c => {
          this.queryField = c;
        }}
        value={q}
        onChange={this.handleChange}
        theme={theme}
      />
    );
  }
};

QueryFieldContainer.defaultProps = {
  theme: {},
  q: '',
  updateQuery: () => {},
  resetQuery: () => {},
};

QueryFieldContainer.propTypes = {
  theme: ThemeSchema,
  q: PropTypes.string,
  updateQuery: PropTypes.func,
  resetQuery: PropTypes.func,
};

const mapStateToProps = state => ({
  q: state.q,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  QueryFieldContainer
);
