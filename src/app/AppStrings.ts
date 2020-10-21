const views = {
  Auth: {
    MainHeading: 'Auth',
  },
  Home: {
    Title: 'Home',
    MainHeading: 'Home',
  },
  NotFound: {
    Title: 'Not Found',
    MainHeading: '404 Not Found',
    Message: "Sorry we couldn't find that. Have you got the right address?",
  },
  ServerError: {
    Title: 'Server Error',
    MainHeading: 'Something went wrong.',
    Message:
      'An error has occurred, we’re working on the problem. Please try again later.',
  },
};

const partials = {};

export { views as Views, partials as Partials };
