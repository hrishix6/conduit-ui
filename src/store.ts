import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './features/theme';
import { appReducer } from './app';

export const store = configureStore({
  reducer: {
    app: appReducer,
    themeStore: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
