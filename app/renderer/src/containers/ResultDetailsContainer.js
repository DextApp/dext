import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultDetails from '../components/ResultDetails';
import { IPC_ITEM_DETAILS_RESPONSE } from '../../../ipc';
import { ThemeSchema } from '../schema';

const ResultDetailsContainer = class extends Component {
  componentDidMount() {
    const { setDetails } = this.props;
    ipcRenderer.on(IPC_ITEM_DETAILS_RESPONSE, (evt, html) => {
      if (html) {
        setDetails(html);
      }
    });
  }

  render() {
    const { theme, detailsPane, detailsPaneExpanded } = this.props;
    return detailsPane
      ? <ResultDetails
          theme={theme}
          content={detailsPane}
          expanded={detailsPaneExpanded}
        />
      : <span></span>;
  }
};

ResultDetailsContainer.defaultProps = {
  item: {},
  detailsPane: '',
  detailsPaneExpanded: false,
  setDetails: () => {},
  theme: {},
};

ResultDetailsContainer.propTypes = {
  detailsPane: PropTypes.string,
  detailsPaneExpanded: PropTypes.bool,
  setDetails: PropTypes.func,
  theme: ThemeSchema,
};

const mapStateToProps = state => ({
  detailsPane: state.detailsPane,
  detailsPaneExpanded: state.detailsPaneExpanded,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultDetailsContainer);
