import { combineReducers } from 'redux';
import copiedToClipboard from './copied-to-clipboard';
import detailsPane from './detailsPane';
import detailsPaneExpanded from './detailsPaneExpanded';
import keys from './keys';
import q from './q';
import results from './results';
import selectedIndex from './selectedIndex';
import theme from './theme';

export default combineReducers({
  copiedToClipboard,
  detailsPane,
  detailsPaneExpanded,
  keys,
  q,
  results,
  selectedIndex,
  theme,
});
