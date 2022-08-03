module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process: function(file, fileName, config) {
    return `module.exports = new Proxy({}, {
        get: function(target, key) {
          return key;
        },
      });`;
  },
};
