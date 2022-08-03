module.exports = {
  hooks: {
    'pre-commit': 'npm run lint:ts-fix',
    'pre-push': 'npm test',
  },
};
