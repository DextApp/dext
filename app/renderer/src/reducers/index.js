import { combineReducers } from 'redux';
import theme from './theme';
import q from './q';
import results from './results';
import selectedIndex from './selectedIndex';

export default combineReducers({
  theme,
  q,
  results,
  selectedIndex,
});
