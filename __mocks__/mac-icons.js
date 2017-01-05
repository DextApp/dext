const macIcons = jest.genMockFromModule('mac-icons');

let iconValue = '';

/**
 * Sets the resolved icon value
 *
 * @param {String} val
 */
macIcons.__setResolvedIconValue = val => {
  iconValue = val;
};

/**
 * Retrieve the icon and resolves the stored value
 *
 * @return {Promise} - Resolves the iconValue
 */
macIcons.getIcon = () => Promise.resolve(iconValue);

module.exports = macIcons;
