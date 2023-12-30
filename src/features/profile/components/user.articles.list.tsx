import { useEffect, useState } from 'react';
import { Profile } from '../types';
import { Container } from '@/layout/container';
import { Button } from '@/components/ui/button';
import {
  Article,
  ArticleListItem,
  addArticleToFavourites,
  loadArticlesForUser,
  removeArticleFromFavourites,
} from '@/features/article';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { Empty } from '@/components/ui/empty';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { selectUsername } from '@/app';

interface Props {
  profile: Profile;
}

const LIMIT = 20;

export function UserProfileArticles({ profile }: Props) {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('my_articles');
  const currentUser = useAppSelector(selectUsername);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const { pathname } = useLocation();
  const [performingFav, setPerformingFav] = useState(0);

  useEffect(() => {
    const offset = (page - 1) * LIMIT;
    if (pathname.endsWith('favourite')) {
      setCurrentTab('favourite_articles');
      getArticles(offset, 'favorited');
    } else {
      setCurrentTab('my_articles');
      getArticles(offset, 'author');
    }
  }, [pathname, page]);

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
        if (currentTab === 'favourite_articles' && currentUser === profile.username) {
          setArticles((prev) =>
            prev.filter((x) => x.slug !== updatedArticle!.slug)
          );
        } else {
          setArticles((prev) => {
            const dcopy = structuredClone(prev);
            const index = dcopy.findIndex((x) => x.slug === article.slug);
            if (index > -1) {
              dcopy[index] = updatedArticle!;
            }
            return dcopy;
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPerformingFav(0);
    }
  }

  async function getArticles(offset: number, kind: 'author' | 'favorited') {
    setLoading(true);
    try {
      const articles = await loadArticlesForUser(
        offset,
        LIMIT,
        profile?.username || '',
        kind
      );
      if (articles) {
        setArticles(articles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          disableTags={true}
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
    <section className="mt-4 px-2 xl:px-0">
      <Container>
        <section className="flex flex-col gap-2">
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
          <div className="flex gap-2 border-b">
            <div
              className={`${
                currentTab === 'my_articles'
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-muted-foreground'
              } hover:cursor-pointer text-lg p-2`}
              onClick={() => navigate(`/profile/${profile?.username}`)}
            >
              My Articles
            </div>
            <div
              className={`${
                currentTab === 'favourite_articles'
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-muted-foreground'
              } hover:cursor-pointer text-lg p-2`}
              onClick={() =>
                navigate(`/profile/${profile?.username}/favourite`)
              }
            >
              Favourited Articles
            </div>
          </div>
        </section>
        {component}
      </Container>
    </section>
  );
}
