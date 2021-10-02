import {
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "app/store";

// declaring the types for our state
export type AuthState = {
  loggedIn: boolean;
};

const initialState: AuthState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions. 
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    login: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. 
      // It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.loggedIn = true;
    },
    logout: state => {
      state.loggedIn = false;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  login,
  logout,
} = authSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectAuthStatus = (state: RootState) => state.auth.loggedIn;

// exporting the reducer here, as we need to add this to the store
export default authSlice.reducer;
