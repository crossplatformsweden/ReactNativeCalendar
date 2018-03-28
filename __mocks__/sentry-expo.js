const SentryMock = {
  install: () => {},
  config: () => {
    return {
      install: () => {},
    };
  },
  captureException: () => {},
};

module.exports = SentryMock;
