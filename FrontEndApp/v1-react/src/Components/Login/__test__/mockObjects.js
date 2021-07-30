
////////////////////////////////////
const mockWinAssign = jest.fn();
const oldWindowLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: mockWinAssign,
      },
    },
  )
})
afterAll(() => {
  // restore location
  window.location = oldWindowLocation;
})
////////////////////////////////////
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
/////////////////////////////////////
