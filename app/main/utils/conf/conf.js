const Conf = require('conf');
const { utils } = require('dext-core-utils');

const { DEXT_PATH } = utils.paths;

module.exports = class extends Conf {
  constructor(opts) {
    const defaultOpts = {
      defaults: {
        theme: '',
        // specify the accelerators for toggling the Dext Bar.
        // @link http://electron.atom.io/docs/api/accelerator/
        hotKey: 'alt+space',
        plugins: [],
      },
    };
    const o = Object.assign({}, opts, defaultOpts);
    o.cwd = DEXT_PATH;
    super(o);
  }
};
