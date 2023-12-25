import { useEffect, useState } from 'react';
import { Article } from '../types';
import { ArticleListItem } from './article.list.item';
import {
  addArticleToFavourites,
  loadArticals,
  loadFeed,
  removeArticleFromFavourites,
} from '../api';
import { Loader } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { selectCurrentTab } from '@/features/feed/stores/feed.reducer';
import FeedTabs from '@/features/feed/components/feed.tabs';
import JohnTrevoltaGif from '@/assets/giphy.gif';
import { selectIsAuthenticated } from '@/app';
const LIMIT = 20;

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentTab = useAppSelector(selectCurrentTab);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      if (currentTab == 'global_feed') {
        getFeed(offset, LIMIT);
      } else {
        getArticles(offset, LIMIT, currentTab);
      }
    } else {
      if (currentTab == 'global_feed') {
        getArticles(offset, LIMIT);
      } else {
        getArticles(offset, LIMIT, currentTab);
      }
    }
  }, [currentTab, offset, isAuthenticated]);

  async function getArticles(offset: number, limit: number, tag?: string) {
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

  async function handleArticleFavourite(article: Article) {
    try {
      const remove = article!.favorited;
      let updatedArticle: Article | null = null;
      const slug = article.slug;

      if (remove) {
        updatedArticle = await removeArticleFromFavourites(slug);
      } else {
        updatedArticle = await addArticleToFavourites(slug);
      }

      if (updatedArticle) {
        setArticles((prev) => {
          const dcopy = structuredClone(prev);
          const index = dcopy.findIndex((x) => x.slug === article.slug);
          if (index > -1) {
            dcopy[index] = updatedArticle!;
          }
          return dcopy;
        });
      }
    } catch (error) {
      console.log(error);
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
            <ArticleListItem
              handleFavourite={handleArticleFavourite}
              key={x.slug}
              data={x}
            />
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
