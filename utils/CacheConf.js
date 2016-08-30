const path = require('path');
const Conf = require('conf');
const { DEXT_PATH } = require('./paths');

// implementation by sindresorhus - https://github.com/sindresorhus/alfy/blob/master/lib/cache-conf.js
module.exports = class extends Conf {
  constructor(opts) {
    const o = Object.assign({}, opts);
    o.cwd = path.resolve(DEXT_PATH, 'cache');
    super(o);
  }

  /**
   * @param {String} key
   * @return {Boolean}
   */
  get(key) {
    if (this.isExpired(key)) {
      super.delete(key);
      return null;
    }
    const item = super.get(key);
    return item && item.data;
  }

  /**
   * @param {String} key
   * @param {Any} val
   * @param {Object} opts
   */
  set(key, val, opts) {
    const o = opts || { maxAge: 900000 }; // 15 minute default cache
    super.set(key, {
      timestamp: o.maxAge && Date.now() + o.maxAge,
      data: val,
    });
  }

  /**
   * @param {String} key
   * @return {Boolean}
   */
  has(key) {
    if (!super.has(key)) {
      return false;
    }
    if (this.isExpired(key)) {
      super.delete(key);
      return false;
    }
    return true;
  }

  /**
   * @param {String} key
   * @return {Boolean}
   */
  isExpired(key) {
    const item = super.get(key);
    return item && item.timestamp && item.timestamp < Date.now();
  }
};
