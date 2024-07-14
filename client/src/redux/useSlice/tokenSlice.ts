import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: TokenState = {
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('accessToken', action.payload.accessToken);
      Cookies.set('refreshToken', action.payload.refreshToken);
    },
    removeTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      Cookies.set('accessToken', action.payload);
    },
  },
});

export const { setTokens, removeTokens, refreshAccessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
