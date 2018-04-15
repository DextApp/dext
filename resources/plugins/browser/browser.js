const IS_URL = /(?:https?:\/\/)?(?:[w]{3}\.)?([\w\d-]+(?:\.[\w]+)+)(\/?.+)?$/;

/**
 * Returns the normalized URL (with protocol scheme)
 *
 * @param {String} url
 * @return {String}
 */
const normalize = url => (/^https?:\/\//.test(url) ? url : `https://${url}`);

module.exports = {
  action: 'openurl',
  query: query => {
    const urlMatches = IS_URL.exec(query);
    return {
      items: urlMatches
        ? [
            {
              title: `Open ${query} in the browser.`,
              subtitle: 'Open in browser',
              arg: normalize(query),
              icon: {
                type: 'text',
                letter: urlMatches[1].substr(0, 1).toUpperCase(),
              },
            },
          ]
        : [],
    };
  },
};
