import { useEffect, useState } from 'react';
import { Article } from '../types';
import { ArticleListItem } from './article.list.item';
import {
  addArticleToFavourites,
  loadArticals,
  loadFeed,
  removeArticleFromFavourites,
} from '../api';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useAppSelector } from '@/hooks';
import { selectCurrentTab } from '@/features/feed/stores/feed.reducer';
import FeedTabs from '@/features/feed/components/feed.tabs';
import { selectIsAuthenticated } from '@/app';
import { Empty } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
const LIMIT = 20;

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const currentTab = useAppSelector(selectCurrentTab);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [performingFav, setPerformingFav] = useState(0);

  useEffect(() => {
    const offset = (page - 1) * LIMIT;

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
  }, [currentTab, page, isAuthenticated]);

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

  async function handleArticleFavourite(article: Article, index: number) {
    try {
      setPerformingFav(index);
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
    } finally {
      setPerformingFav(0);
    }
  }

  let component;

  if (loading) {
    component = (
      <div className="flex-1 flex items-center justify-center mt-4">
        <Loader className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  } else {
    if (articles.length > 0) {
      component = articles.map((x, i) => (
        <ArticleListItem
          index={i}
          handleFavourite={handleArticleFavourite}
          key={x.slug}
          data={x}
          performingFavourite={performingFav}
        />
      ));
    } else {
      component = (
        <div className="w-2/3 mx-auto mt-4">
          <Empty />
        </div>
      );
    }
  }

  return (
    <section className="flex-1 flex flex-col">
      <header className="flex flex-col gap-2">
        <div className="flex gap-3 justify-end items-center">
          <Button
            variant={'outline'}
            size={'sm'}
            disabled={page == 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <p className="text-base">{page}</p>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <FeedTabs />
      </header>
      {component}
    </section>
  );
}
