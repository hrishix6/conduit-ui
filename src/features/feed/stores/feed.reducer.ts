import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { FeedState } from '../types';

const initialState: FeedState = {
  currentTab: 'global_feed',
  tagTab: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      const tab = action.payload;

      if (tab === 'global_feed') {
        state.currentTab = 'global_feed';
        state.tagTab = null;
      } else {
        state.currentTab = tab;
        state.tagTab = tab;
      }
    },
  },
});
export const feedReducer = feedSlice.reducer;
export const { setCurrentTab } = feedSlice.actions;

export const selectCurrentTab = (state: RootState) => state.feed.currentTab;
export const selectTagTab = (state: RootState) => state.feed.tagTab;
