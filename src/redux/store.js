import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";

// Create Redux store with userSlice reducer
export const store = configureStore({
  reducer: {
    user: userSlice, // Add userSlice reducer to the store
  },
});
