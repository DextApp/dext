const { retrieveItemDetails } = require('../plugins');
const { IPC_ITEM_DETAILS_RESPONSE } = require('../../ipc');
// eslint-disable-next-line global-require, import/no-dynamic-require
const loadPluginFromPath = path => require(path);

/**
 * Retrieve item details and sends back the response.
 *
 * @param {Event} evt
 * @param {Object} item
 */
const requestItemDetails = (evt, item) => {
  const plugin = loadPluginFromPath(item.plugin.path);
  // @todo - cache content
  const content = retrieveItemDetails(item, plugin);
  Promise.resolve(content).then(html => {
    evt.sender.send(IPC_ITEM_DETAILS_RESPONSE, html);
  });
};

module.exports = requestItemDetails;
