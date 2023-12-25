import { Button } from '@/components/ui/button';
import { Article } from '../types';
import { Heart, User } from 'lucide-react';
import { formatArticleCreatedDate } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch } from '@/hooks';
import { setCurrentTab } from '@/features/feed/stores/feed.reducer';

interface Props {
  data: Article;
}

export function ArticleListItem({ data }: Props) {
  const dispatch = useAppDispatch();

  const {
    author,
    createdAt,
    favorited,
    favoritesCount,
    title,
    description,
    tagList,
  } = data;

  const { username, image } = author;

  return (
    <>
      <article className="flex flex-col gap-2">
        <header className="flex items-center justify-between">
          <section className="flex gap-1 items-center">
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
              <p className="text-primary text-lg font-semibold">{username}</p>
              <span className="mx-2">&#8226;</span>
              <p className="text-sm text-muted-foreground">
                {formatArticleCreatedDate(createdAt)}
              </p>
            </div>
          </section>
          <Button variant={'outline'}>
            <Heart
              className={`h-5 w-5 mr-2 ${favorited ? 'text-primary' : ''}`}
            />
            <span>{favoritesCount}</span>
          </Button>
        </header>
        <section className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </section>
        <footer className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Read more...</p>
          <div className="flex items-center gap-2 flex-wrap">
            {tagList.map((x, i) => (
              <Badge
                key={i}
                className="hover:cursor-pointer"
                onClick={() => dispatch(setCurrentTab(x))}
              >
                {x}
              </Badge>
            ))}
          </div>
        </footer>
      </article>
      <hr />
    </>
  );
}
