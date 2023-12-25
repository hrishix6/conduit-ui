import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectCurrentTab,
  selectTagTab,
  setCurrentTab,
} from '../stores/feed.reducer';

export default function FeedTabs() {
  const dispatch = useAppDispatch();
  const currentFeedTab = useAppSelector(selectCurrentTab);
  const tagTab = useAppSelector(selectTagTab);

  return (
    <div className="flex gap-2 border-b">
      <div
        onClick={() => dispatch(setCurrentTab('global_feed'))}
        className={`${
          currentFeedTab === 'global_feed'
            ? 'text-primary font-semibold border-b-2 border-primary'
            : 'text-base text-muted-foreground'
        } hover:cursor-pointer p-2`}
      >
        #global feed
      </div>
      {tagTab ? (
        <div
          className={`${
            currentFeedTab === tagTab
              ? 'text-primary font-semibold border-b-2 border-primary'
              : 'text-base text-muted-foreground'
          } hover:cursor-pointer p-2`}
        >
          #{tagTab}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
