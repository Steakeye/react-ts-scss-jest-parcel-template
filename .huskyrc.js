module.exports = {
  hooks: {
    'pre-commit': 'npm run lint:fix-ts',
    'pre-push': 'npm test',
  },
};
