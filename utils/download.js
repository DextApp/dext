const path = require('path');
const http = require('http');
const download = require('download');
const { PLUGIN_PATH } = require('../utils/paths');

const getPackageUrl = pkg => `http://registry.npmjs.org/${pkg}`;

/**
 * Downloads and extracts the package
 *
 * @param {String} pkg - The name of the npm package
 * @return {Promise} - The downloaded path
 */
const downloadPackage = pkg => new Promise(resolve => {
  let body = '';

  // retrieve the package details
  http.get(getPackageUrl(pkg), res => {
    res.on('data', chunk => {
      body += chunk;
    });
    res.on('end', () => {
      const j = JSON.parse(body);
      // get the latest version download URL
      // and download the the plugin directory
      const latestVersion = j['dist-tags'].latest;
      const downloadUrl = j.versions[latestVersion].dist.tarball;
      const outputDir = path.resolve(PLUGIN_PATH, pkg);
      const options = {
        extract: true,
        map: file => Object.assign({}, file, {
          path: file.path.replace(/^package/, ''),
        }),
      };
      download(downloadUrl, outputDir, options).then(() => resolve(outputDir));
    });
  });
});

module.exports = {
  getPackageUrl,
  downloadPackage,
};
