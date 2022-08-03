const path = require('path');

module.exports = {
  process: function(file, fileName, config) {
    const resolvedAssetPath = path.relative(config.roots[0], fileName);
    return `module.exports = "${resolvedAssetPath}";`;
  },
};
