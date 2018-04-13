const IS_URL = /(?:https?:\/\/)?(?:[w]{3}\.)?([\w\d-]+(?:\.[\w]+)+)(\/?.+)?$/;

/**
 * Returns the normalized URL (with protocol scheme)
 *
 * @param {String} url
 * @return {String}
 */
const normalize = url => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  return `https://${url}`;
};

module.exports = {
  action: 'openurl',
  query: query => {
    const items = [];
    const urls = IS_URL.exec(query);
    if (urls) {
      items.push({
        title: `Open ${query} in the browser.`,
        subtitle: 'Open in browser',
        arg: normalize(query),
        icon: {
          type: 'text',
          letter: urls[1].substr(0, 1).toUpperCase(),
        },
      });
    }
    return { items };
  },
};
