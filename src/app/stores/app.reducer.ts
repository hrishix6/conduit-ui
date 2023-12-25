import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initAppDataAsync } from './app.async.actions';
import { RootState } from '@/store';
import { AppState, UserInfo } from '../types';

const initialState: AppState = {
  loading: true,
  error: false,
  errorMessage: '',
  isAuthenticated: false,
  userName: '',
  avatar_url: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      const { username, image } = action.payload;
      state.isAuthenticated = true;
      state.userName = username;
      state.avatar_url = image || '';
    },
    logout: (state) => {
      state.loading = false;
      state.error = false;
      state.errorMessage = '';
      state.isAuthenticated = false;
      state.userName = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAppDataAsync.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(initAppDataAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initAppDataAsync.pending, (state) => {
        state.loading = true;
      });
  },
});
export const appReducer = appSlice.reducer;
export const { logout, loginSuccess } = appSlice.actions;

export const selectAppLoading = (state: RootState) => state.app.loading;
export const selectAppError = (state: RootState) => state.app.error;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const selectUsername = (state: RootState) => state.app.userName;
export const selectAvatar = (state: RootState) => state.app.avatar_url;
