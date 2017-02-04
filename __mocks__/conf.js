/**
 * The mock store data object
 */
let _store = '';

const Conf = class {
  get(key) {
    return _store[key];
  }

  set(key, value) {
    _store[key] = value;
  }

  clear() {
    _store = {};
  }
};

/**
 * Sets the mock data for the store
 *
 * @param {Object} data
 */
Conf.__setStoreData = (data) => {
  _store = data;
};

module.exports = Conf;
