import { PropTypes } from 'react';

// This should follow the Alfred workflow script filter JSON format
// https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
export default PropTypes.shape({
  // The title to be displayed.
  title: PropTypes.string,

  // An optional subtitle to be displayed beneath the title.
  subtitle: PropTypes.string,

  // Additional parameters to be passed to the action.
  arg: PropTypes.string,

  icon: PropTypes.shape({
    // The URL path to the icon.
    path: PropTypes.string,
  }),
});
