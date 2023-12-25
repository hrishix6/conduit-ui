import { selectAvatar, selectIsAuthenticated, selectUsername } from '@/app';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/hooks';
import { Loader, Trash, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Comment } from '../types';
import {
  AddArticleComment,
  deleteArticleComment,
  loadArticleComments,
} from '../api';
import { formatArticleCreatedDate } from '@/utils';

export default function ArticleCommentSection() {
  const { slug } = useParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [articleComments, setArticleComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>('');
  const avatar = useAppSelector(selectAvatar);
  const username = useAppSelector(selectUsername);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      getComments(slug);
    }
  }, [slug]);

  async function getComments(slug: string) {
    setCommentsLoading(true);
    try {
      const comments = await loadArticleComments(slug);
      if (comments) {
        setArticleComments(comments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCommentsLoading(false);
    }
  }

  async function addComment() {
    if (!comment) {
      return;
    }
    try {
      const createdComment = await AddArticleComment(slug!, comment);
      if (createdComment) {
        setArticleComments((prev) => [createdComment, ...prev]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setComment('');
    }
  }

  async function deleteComment(id: number) {
    try {
      const deleted = await deleteArticleComment(slug!, id);
      if (deleted) {
        setArticleComments((prev) => prev.filter((x) => x.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setComment('');
    }
  }

  return (
    <section className="flex flex-col gap-4 py-4 mb-10 px-2 xl:px-0">
      {isAuthenticated ? (
        <div className="flex flex-col gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment();
            }}
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <div className="flex items-center justify-between mt-2">
              {avatar ? (
                <Avatar className="h-5 w-5">
                  <AvatarImage src={avatar} alt={username} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
              <Button type="submit" variant={'default'}>
                Post comment
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="tex-base">
            <Link className="text-primary" to={`/login`}>
              Sign in
            </Link>
            <span className="mx-2">or</span>
            <Link className="text-primary" to={`/register`}>
              Sign up
            </Link>
            <span className="mx-2">to add comments on this article.</span>
          </p>
        </div>
      )}
      {commentsLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="text-primary h-5 w-5 animate-spin" />
        </div>
      ) : (
        articleComments.map((x) => (
          <div key={x.id}>
            <p className="p-2 border">{x.body}</p>
            <div className="bg-secondary flex p-2 items-center justify-between">
              <div className="flex items-center gap-2">
                {x.author.image ? (
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={x.author.image} alt={x.author.username} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-4 w-4" />
                )}
                <p className="text-sm text-primary">{x.author.username}</p>
                <span className="block">&#8226;</span>
                <p className="text-sm text-muted-foreground">
                  {formatArticleCreatedDate(x.createdAt)}
                </p>
              </div>
              {x.author.username === username ? (
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  onClick={() => deleteComment(x.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
