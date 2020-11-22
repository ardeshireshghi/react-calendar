import '@testing-library/jest-dom/extend-expect';

// Mock google calendar API
global.gapi = {
  client: {
    calendar: {
      events: {
        list: jest.fn(() =>
          Promise.resolve({
            result: {
              items: []
            }
          })
        )
      }
    }
  }
};
