const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  sassConfig: {
    includePaths: [srcPath],
    importer: [
      childResource => {
        const file = childResource.replace(/^~/, srcPath);

        return { file };
      },
    ],
  },
};
