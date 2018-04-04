const plist = jest.genMockFromModule('plist');

let mockParsedObject = null;

/**
 * Sets the mocked parsed object
 *
 * @param {Object} data
 */
plist.__setParseObject = data => {
  mockParsedObject = data;
};

/**
 * Parses the string and return the object
 *
 * @param {String} dataStr - The plist contents
 * @return {Object} - The plist data
 */
// eslint-disable-next-line no-unused-vars
plist.parse = dataStr => mockParsedObject;

module.exports = plist;
