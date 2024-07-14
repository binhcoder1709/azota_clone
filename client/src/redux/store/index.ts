import { configureStore } from "@reduxjs/toolkit";
import tokenSlice, { TokenState } from "../useSlice/tokenSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

export type RootState = {
  token: TokenState;
};

export type AppDispatch = typeof store.dispatch;

export default store;
