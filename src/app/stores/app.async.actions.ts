import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { delay } from '@/utils';
export const initAppDataAsync = createAsyncThunk<void, void>(
  'app/initAppDataAsync',
  async (_, thunkAPI) => {
    await delay(800);
    const { getState } = thunkAPI;
    const rootstate = getState() as RootState;
    const { isAuthenticated } = rootstate.app;

    if (isAuthenticated) {
      return;
    }

    const token = localStorage.getItem("token");

    if(!token)
    {
      return;
    }

    // try {
    //   const result = await getUserInfo();
    //   if (result.success) {
    //     dispatch(loginSuccess(result.data));
    //   }
    // } catch (error) {
    //   localStorage.removeItem('token');
    //   console.log(error);
    // }
  }
);
