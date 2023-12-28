import { Button } from '@/components/ui/button';
import { Article } from '../types';
import { Heart, User } from 'lucide-react';
import { formatArticleCreatedDate } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentTab } from '@/features/feed/stores/feed.reducer';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated } from '@/app';

interface Props {
  index: number;
  data: Article;
  handleFavourite: (article: Article, index: number) => void;
  disableTags?: boolean;
  performingFavourite: number;
}

export function ArticleListItem({
  data,
  handleFavourite,
  disableTags = false,
  performingFavourite,
  index,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    author,
    slug,
    createdAt,
    favorited,
    favoritesCount,
    title,
    description,
    tagList,
  } = data;

  const { username, image } = author;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <article className="flex flex-col gap-2 py-4   border-b">
      <header className="flex items-center justify-between">
        <section className="flex gap-2 items-center">
          {image ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src={image} alt={username} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
          <div className="flex items-center">
            <Link to={`/profile/${username}`}>
              <p className="text-primary text-lg font-semibold hover:underline">
                {username}
              </p>
            </Link>
            <span className="mx-2">&#8226;</span>
            <p className="text-sm text-muted-foreground">
              {formatArticleCreatedDate(createdAt)}
            </p>
          </div>
        </section>
        {isAuthenticated && ( <Button
          variant={`${favorited ? 'default' : 'outline'}`}
          size={'sm'}
          onClick={() => {
            handleFavourite(data, index);
          }}
          disabled={!!(performingFavourite && index === performingFavourite)}
        >
          <Heart className={`h-4 w-4 mr-2`} />
          <span>{favoritesCount}</span>
        </Button>)}
      </header>
      <Link to={`/article/${slug}`}>
        <section className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </section>
      </Link>
      <footer className="flex items-center justify-between">
        <Link to={`/article/${slug}`}>
          <p className="text-sm text-muted-foreground">Read more...</p>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          {tagList.map((x, i) =>
            disableTags ? (
              <Badge variant={'outline'}>{x}</Badge>
            ) : (
              <Badge
                key={i}
                className="hover:cursor-pointer"
                onClick={() => dispatch(setCurrentTab(x))}
              >
                {x}
              </Badge>
            )
          )}
        </div>
      </footer>
    </article>
  );
}
