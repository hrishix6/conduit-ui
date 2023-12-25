import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './features/theme';
import { appReducer } from './app';
import { feedReducer } from './features/feed/stores/feed.reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    themeStore: themeReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
