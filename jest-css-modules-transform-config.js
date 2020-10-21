const fs = require('fs');
const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  sassConfig: {
    includePaths: [srcPath],
    importer: [
      (childResource, parentResource) => {
        const file = childResource.replace(/^~/, srcPath);

        return { file };
      },
    ],
  },
};
