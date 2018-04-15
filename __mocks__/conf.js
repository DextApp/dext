// This mocks node_modules/conf

/* eslint-disable class-methods-use-this */

/**
 * The mock store data object
 */
let _store = {};

class Conf {
  has(key) {
    return key in _store;
  }

  get(key) {
    return _store[key];
  }

  set(key, value) {
    _store[key] = value;
  }

  clear() {
    _store = {};
  }

  get size() {
    return Object.keys(_store).length;
  }

  get store() {
    return _store;
  }
}

/**
 * Sets the mock data for the store
 *
 * @param {Object} data
 */
Conf.__setStoreData = data => {
  _store = data;
};

module.exports = Conf;
