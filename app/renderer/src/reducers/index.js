import { combineReducers } from 'redux';
import results from './results';
import selectedIndex from './selected-index';

export default combineReducers({
  results,
  selectedIndex,
});
