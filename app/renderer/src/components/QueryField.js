import React, { Component, PropTypes } from 'react';
import { compose, style } from 'glamor';

const base = style({
  padding: 15,
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

const QueryField = class extends Component {
  render() {
    const { theme, onChange, value } = this.props;
    // apply theme styles
    const styles = theme.search ? compose(search, theme.search) : search;
    return (
      <div {...base}>
        <input
          ref={c => { this.input = c && c; }}
          onChange={onChange}
          value={value}
          {...styles}
        />
      </div>
    );
  }
};

QueryField.propTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.object,
  value: PropTypes.string,
};

export default QueryField;
