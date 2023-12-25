import { useEffect, useState } from 'react';
import { Article } from '../types';
import { ArticleListItem } from './article.list.item';
import { loadArticals, loadFeed } from '../api';
import { Loader } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { selectCurrentTab } from '@/features/feed/stores/feed.reducer';
import FeedTabs from '@/features/feed/components/feed.tabs';
import JohnTrevoltaGif from '@/assets/giphy.gif';
const LIMIT = 20;

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentTab = useAppSelector(selectCurrentTab);

  useEffect(() => {
    if (currentTab == 'global_feed') {
      getFeed(offset, LIMIT);
    } else {
      getArticles(offset, LIMIT, currentTab);
    }
  }, [currentTab, offset]);

  async function getArticles(offset: number, limit: number, tag: string) {
    setLoading(true);
    try {
      const articles = await loadArticals(offset, limit, tag);
      if (articles) {
        setArticles(articles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getFeed(offset: number, limit: number) {
    setLoading(true);
    try {
      const articles = await loadFeed(offset, limit);
      if (articles) {
        setArticles(articles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-4">
        <FeedTabs />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="h-6 w-6 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-4">
      <FeedTabs />
      {articles.length > 0 ? (
        articles.map((x) => (
          <>
            <ArticleListItem key={x.slug} data={x} />
          </>
        ))
      ) : (
        <div className="flex justify-center">
          <img
            src={JohnTrevoltaGif}
            className="flex-1 h-auto"
            alt="it is empty"
          />
        </div>
      )}
    </section>
  );
}
