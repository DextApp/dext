import PropTypes from 'prop-types';
import React from 'react';
import { ipcRenderer } from 'electron';
import { compose, style } from 'glamor';
import { IPC_WINDOW_SHOW, IPC_WINDOW_HIDE } from '../../../../ipc';

const base = style({
  paddingTop: 15,
  paddingRight: 15,
  paddingBottom: 14,
  paddingLeft: 15,
  boxSizing: 'border-box',
  borderBottomColor: '#bbb',
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
});

const search = style({
  backgroundColor: 'transparent',
  border: 0,
  boxSizing: 'border-box',
  fontSize: 50,
  marginBottom: 0,
  paddingBottom: 15,
  outline: 0,
  overflow: 'visible',
  width: '100%',
  height: 50,
});

class QueryField extends React.Component {
  static displayName = 'QueryField';
  static propTypes = {
    query: PropTypes.string,
    theme: PropTypes.object,
    onReset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    query: '',
    theme: {},
  };
  queryField = null;
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
    const baseStyle =
      this.props.theme && this.props.theme.searchBase
        ? compose(
            base,
            this.props.theme.searchBase
          )
        : base;

    const styles =
      this.props.theme && this.props.theme.search
        ? compose(
            search,
            this.props.theme.search
          )
        : search;

    return (
      <div {...baseStyle}>
        <input
          ref={this.attachQueryField}
          onChange={this.handleChange}
          value={this.props.query}
          {...styles}
        />
      </div>
    );
  }
}

export default QueryField;
