import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addArticleToFavourites,
  loadingArticleDetail,
  removeArticleFromFavourites,
} from '../api';
import { Article, Author } from '../types';
import { Layout } from '@/layout';
import { Container } from '@/layout/container';
import { Heart, Loader, Plus, User } from 'lucide-react';
import JohnTrevoltaGif from '@/assets/giphy.gif';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatArticleCreatedDate } from '@/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ArticleCommentSection from './article.comment.section';
import { followAuthor, unfollowAuthor } from '@/features/profile';

export function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getArticleDetail(slug);
    }
  }, [slug]);

  async function getArticleDetail(slug: string) {
    try {
      const article = await loadingArticleDetail(slug);
      if (article) {
        setArticle(article);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleArticleFavourite() {
    try {
      const remove = article!.favorited;
      let updatedArticle: Article | null = null;

      if (remove) {
        updatedArticle = await removeArticleFromFavourites(slug!);
      } else {
        updatedArticle = await addArticleToFavourites(slug!);
      }

      if (updatedArticle) {
        setArticle(updatedArticle);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAuthorFollow() {
    try {
      const remove = article!.author?.following;
      let updatedAuthor: Author | null = null;

      const authorname = article?.author.username || '';

      if (remove) {
        updatedAuthor = await unfollowAuthor(authorname);
      } else {
        updatedAuthor = await followAuthor(authorname);
      }

      if (updatedAuthor) {
        setArticle((prev) => {
          const dcopy = structuredClone(prev!);
          dcopy.author = updatedAuthor!;
          return dcopy;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <Loader className="h-5 w-5 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {article ? (
        <div className="mb-10">
          <header className="bg-background">
            <Container>
              <section className="py-6 px-2 xl:px-0 flex flex-col gap-4 justify-center">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <section className="flex gap-1 items-center">
                    {article.author?.image ? (
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={article.author?.image}
                          alt={article.author?.username}
                        />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <div className="flex items-center">
                      <p className="text-primary text-lg font-semibold">
                        {article.author?.username}
                      </p>
                      <span className="mx-2">&#8226;</span>
                      <p className="text-sm text-muted-foreground">
                        {formatArticleCreatedDate(article.createdAt)}
                      </p>
                    </div>
                  </section>
                  <Button
                    variant={`${
                      article.author?.following ? 'default' : 'outline'
                    }`}
                    onClick={() => handleAuthorFollow()}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    <span>
                      {article.author?.following ? 'Unfollow ' : 'Follow '}
                      {article.author.username}
                    </span>
                  </Button>
                  <Button
                    variant={`${article.favorited ? 'default' : 'outline'}`}
                    onClick={() => handleArticleFavourite()}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    <span>
                      {article.favorited
                        ? 'Remove from favourites '
                        : 'Add to favourites '}
                      ({article.favoritesCount})
                    </span>
                  </Button>
                </div>
              </section>
              <hr />
            </Container>
          </header>
          <section>
            <Container>
              <section className="flex flex-col px-2 py-4 gap-3 xl:px-0">
                <p className="text-lg">{article.body}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {article.tagList.map((x, i) => (
                    <Badge key={i} className="hover:cursor-pointer">
                      {x}
                    </Badge>
                  ))}
                </div>
              </section>
              <hr />
              <ArticleCommentSection />
            </Container>
          </section>
        </div>
      ) : (
        <Container>
          <div className="flex justify-center">
            <img
              src={JohnTrevoltaGif}
              className="flex-1 h-auto"
              alt="it is empty"
            />
          </div>
        </Container>
      )}
    </Layout>
  );
}
