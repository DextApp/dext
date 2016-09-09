import { combineReducers } from 'redux';
import theme from './theme';
import q from './q';
import results from './results';
import selectedIndex from './selectedIndex';
import detailsPane from './detailsPane';
import detailsPaneExpanded from './detailsPaneExpanded';

export default combineReducers({
  theme,
  q,
  results,
  detailsPane,
  detailsPaneExpanded,
  selectedIndex,
});
