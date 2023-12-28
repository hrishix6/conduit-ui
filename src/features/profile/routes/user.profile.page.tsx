import { Layout } from '@/layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { followAuthor, getUserProfile, unfollowAuthor } from '../api';
import { Profile } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, User } from 'lucide-react';
import { UserProfileArticles } from '../components/user.articles.list';
import { useAppSelector } from '@/hooks';
import { selectIsAuthenticated, selectUsername } from '@/app';
import { Container } from '@/layout/container';
import { Button } from '@/components/ui/button';
import { Author } from '@/features/article';

export function UserProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const currentUser = useAppSelector(selectUsername);
  const [performingFollow, setPerformingFollow] = useState(false);
  const isNotCurrentUser = currentUser !== profile?.username;
  const followingProfile = profile?.following;

  useEffect(() => {
    if (username) {
      loadUserProfile(username);
    }
  }, [username]);

  async function loadUserProfile(username: string) {
    setLoadingProfile(true);
    try {
      const profile = await getUserProfile(username);
      if (profile) {
        setProfile(profile);
        setLoadingProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAuthorFollow() {
    try {
      setPerformingFollow(true);
      const remove = profile?.following;
      let updatedAuthor: Author | null = null;

      const authorname = profile?.username || '';

      if (remove) {
        updatedAuthor = await unfollowAuthor(authorname);
      } else {
        updatedAuthor = await followAuthor(authorname);
      }

      if (updatedAuthor) {
        setProfile(updatedAuthor);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setPerformingFollow(false);
    }
  }

  return (
    <Layout>
      <header className="py-2 px-2 xl:px-0 border-b border-t bg-secondary">
      <Container>
        <div className='flex flex-col justify-center items-center'>
        {profile?.image ? (
          <Avatar className="h-32 w-32">
            <AvatarImage src={profile?.image} alt={profile?.username} />
            <AvatarFallback>
              <User className="h-32 w-32" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <User className="h-32 w-32" />
        )}
        <h3 className="text-3xl font-bold">{profile?.username}</h3>
        </div>
        <div className='self-stretch flex items-center justify-end mt-2'>
            {isNotCurrentUser && isAuthenticated && (<Button variant={`${followingProfile? "default" : "ghost" }`} onClick={handleAuthorFollow}
            disabled={performingFollow}>  
                <Plus className='h-4 w-4 mr-2' />
                <span>{followingProfile? "Unfollow" : "Follow"} {profile?.username}</span>
            </Button>)} 
        </div>
      </Container>
      </header>
      {loadingProfile ? (
        <></>
      ) : profile ? (
        <UserProfileArticles profile={profile} />
      ) : (
        <></>
      )}
    </Layout>
  );
}
