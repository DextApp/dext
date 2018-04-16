import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, style } from 'glamor';
import { ThemeSchema } from '../../schema';

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

const QueryField = class extends Component {
  render() {
    const { theme, onChange, value } = this.props;

    const baseStyle =
      theme && theme.searchBase ? compose(base, theme.searchBase) : base;

    const styles =
      theme && theme.search ? compose(search, theme.search) : search;

    return (
      <div {...baseStyle}>
        <input
          ref={this.props.attachInputRef}
          onChange={onChange}
          value={value}
          {...styles}
        />
      </div>
    );
  }
};

QueryField.defaultProps = {
  attachInputRef: () => {},
  onChange: () => {},
  theme: {},
  value: '',
};

QueryField.propTypes = {
  attachInputRef: PropTypes.func,
  onChange: PropTypes.func,
  theme: ThemeSchema,
  value: PropTypes.string,
};

export default QueryField;
