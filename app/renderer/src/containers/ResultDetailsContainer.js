import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/creators';
import ResultDetails from '../components/ResultDetails';
import { IPC_ITEM_DETAILS_RESPONSE } from '../../../ipc';

const ResultDetailsContainer = class extends Component {
  componentDidMount() {
    const { setDetails } = this.props;
    ipcRenderer.on(IPC_ITEM_DETAILS_RESPONSE, (evt, html) => {
      setDetails(html);
    });
  }

  render() {
    const { detailsPane, detailsPaneExpanded } = this.props;
    return <ResultDetails content={detailsPane} expanded={detailsPaneExpanded} />;
  }
};

ResultDetailsContainer.defaultProps = {
  item: {},
  detailsPane: '',
  detailsPaneExpanded: false,
  setDetails: () => {},
};

ResultDetailsContainer.propTypes = {
  detailsPane: PropTypes.string,
  detailsPaneExpanded: PropTypes.bool,
  setDetails: PropTypes.func,
};

const mapStateToProps = state => ({
  detailsPane: state.detailsPane,
  detailsPaneExpanded: state.detailsPaneExpanded,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultDetailsContainer);
