import userReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
} from "./userSlice";

// Describe block for user reducer tests
describe("user reducer", () => {
  // Define initial state for testing
  const initialState = {
    currentUser: null,
    error: null,
    loading: false,
  };

  // Test case for handling initial state
  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  // Test case for handling loginStart action
  it("should handle loginStart", () => {
    const action = { type: loginStart.type }; // Create action object for loginStart
    const expectedState = { ...initialState, loading: true }; // Expected state after loginStart
    expect(userReducer(initialState, action)).toEqual(expectedState); // Check if reducer produces expected state
  });

  // Test case for handling loginSuccess action
  it("should handle loginSuccess", () => {
    const newUser = { name: "Test User" }; // New user data
    const action = { type: loginSuccess.type, payload: newUser }; // Action object for loginSuccess
    const expectedState = { ...initialState, currentUser: newUser }; // Expected state after loginSuccess
    expect(userReducer(initialState, action)).toEqual(expectedState); // Check if reducer produces expected state
  });

  // Test case for handling loginFailure action
  it("should handle loginFailure", () => {
    const error = "Error message"; // Error message
    const action = { type: loginFailure.type, payload: error }; // Action object for loginFailure
    const expectedState = { ...initialState, error: error }; // Expected state after loginFailure
    expect(userReducer(initialState, action)).toEqual(expectedState); // Check if reducer produces expected state
  });
});
