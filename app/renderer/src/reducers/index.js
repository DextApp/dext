import { combineReducers } from 'redux';
import theme from './theme';
import q from './q';
import results from './results';
import selectedIndex from './selectedIndex';
import keys from './keys';
import detailsPane from './detailsPane';
import detailsPaneExpanded from './detailsPaneExpanded';

export default combineReducers({
  theme,
  q,
  results,
  selectedIndex,
  keys,
  detailsPane,
  detailsPaneExpanded,
});
