module.exports = {
  process: function(file, fileName, config) {
    return `module.exports = new Proxy({}, {
        get: function(target, key) {
          return key;
        },
      });`;
  }
};