import { combineReducers } from 'redux';
import detailsPane from './details-pane';
import detailsPaneExpanded from './details-pane-expanded';
import keys from './keys';
import results from './results';
import selectedIndex from './selected-index';

export default combineReducers({
  detailsPane,
  detailsPaneExpanded,
  keys,
  results,
  selectedIndex,
});
