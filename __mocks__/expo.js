



const positionMock = {
  latitude: 1,
  longitude: 1,
};

const googleMock = {
  type: 'success',
  user: { name: 'test', photoUrl: 'http://www.crossplatform,se/' },
  idToken: 'id',
};

const fbMock = {
  type: 'success',
  token: 'fbTokenMock',
  expires: '2999-01-01',
};

// Mock the expo library
module.exports =
  {
    PositionMock: positionMock,
    GoogleMock: googleMock,
    Location: {
      setApiKey: jest.fn(),
      getCurrentPositionAsync:
        options =>
          new Promise(
            resolve => resolve(options ? {
              coords: positionMock,
            } : null)
            , null,
          ),
      watchPositionAsync: (opt, callback) => {
        callback({
          coords: positionMock,
        });
      },
    },
    Constants: {
      platform: 'iOS',
      manifest: {
        extra: {
          google: {
            maps: 'AIzaSyARKWAxjv22kKCxPrGtg8TDu-BqsfUoags',
            webClientId: 'mock',
            androidStandaloneAppClientId: 'mock',
            androidClientId: 'mock',
            iosStandaloneAppClientId: 'mock',
            iosClientId: 'mock',
          },
        },
        facebookAppId: 'fbAppId',
      },
    },
    Permissions: {
      LOCATION: 'location',
      askAsync: type => new Promise(resolve =>
        resolve(type === 'location' ?
          { status: 'granted' }
          : null)),
    },
    Google: {
      logInAsync: opt =>
        new Promise(resolve =>
          resolve(opt ? googleMock : null)),
    },
    Facebook: {
      logInWithReadPermissionsAsync: (appId, opt) =>
        new Promise((resolve) => {
          resolve(appId && opt ? fbMock : null);
        }),
    },
  };
