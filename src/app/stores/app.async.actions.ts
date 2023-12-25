import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { delay } from '@/utils';
import { getUserInfo } from '../api';
import { loginSuccess } from '..';
export const initAppDataAsync = createAsyncThunk<void, void>(
  'app/initAppDataAsync',
  async (_, thunkAPI) => {
    await delay(800);
    const { getState, dispatch } = thunkAPI;
    const rootstate = getState() as RootState;
    const { isAuthenticated } = rootstate.app;

    if (isAuthenticated) {
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    try {
      const result = await getUserInfo();
      if (result) {
        localStorage.setItem('token', result.token);
        dispatch(loginSuccess(result));
      }
    } catch (error) {
      localStorage.removeItem('token');
      console.log(error);
    }
  }
);
