import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ResultDetails from '../../components/result-details';
import { IPC_ITEM_DETAILS_RESPONSE } from '../../../../ipc';
import { ThemeSchema } from '../../schema';

export default class ResultDetailsContainer extends Component {
  static displayName = 'ResultDetailsContainer';

  componentDidMount() {
    ipcRenderer.on(IPC_ITEM_DETAILS_RESPONSE, (evt, details) => {
      if (details) {
        this.props.onLoad(details);
      }
    });
  }

  render() {
    return this.props.details.length > 0 ? (
      <ResultDetails
        theme={this.props.theme}
        content={this.props.details}
        expanded={this.props.details.length > 0}
      />
    ) : (
      <span />
    );
  }
}

ResultDetailsContainer.defaultProps = {
  details: '',
  theme: {},
};

ResultDetailsContainer.propTypes = {
  details: PropTypes.string,
  theme: ThemeSchema,
  onLoad: PropTypes.func.isRequired,
};
