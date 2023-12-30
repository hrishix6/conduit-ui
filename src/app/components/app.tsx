import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectAppError,
  selectAppLoading,
  selectErrorMessage,
} from '../stores/app.reducer';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { AppError } from './app.error';
import { AppLoader } from './app.loader';
import { initAppDataAsync } from '../stores/app.async.actions';
import { LoginPage } from '@/features/auth';
import HomePage from '@/routes/home.page';
import { SignUpPage } from '@/features/auth/routes/sign.up.page';
import EditorPage from '@/features/editor/routes/editor.page';
import { ArticleDetail } from '@/features/article';
import { UserProfilePage } from '@/features/profile';
import { Layout } from '@/layout';
import UserSettingsPage from '@/features/profile/routes/user.settings.page';
import { ErrorPage } from '@/routes/error.page';
import NotFoundPage from '@/routes/not.found.page';
import { getUserInfo } from '../api';
import { getUserProfile } from '@/features/profile/api';
import { ProtectedRoute } from '@/routes/protected.route';

const mainRouter = createBrowserRouter([
  {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "login",
          element: <LoginPage /> 
        },
        {
          path: "register",
          element: <SignUpPage />
        },
        {
          path: "article/:slug",
          element: <ArticleDetail />
        },
        {
          path: "editor",
          element: <EditorPage />
        },
        {
          path: "profile/:username",
          element: <UserProfilePage />,
          loader: async ({params})=> {
              const {username} = params;

              const profile = await getUserProfile(username || "");

              if(!profile)
              {
                throw new Error("No data");
              }

              return {data: profile};
          },
          children: [
            {
              path: "favourite",
              element: <UserProfilePage />
            }
          ]
        },
        {
          path: "settings",
          element: (<ProtectedRoute><UserSettingsPage /></ProtectedRoute>) ,
          loader: async () => {
              const userInfo = await getUserInfo();

              if(!userInfo)
              {
                throw new Error("No data");
              }
              return {data: userInfo};
          }
        }
      ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);


export function App() {
  const dispatch = useAppDispatch();
  const apploading = useAppSelector(selectAppLoading);
  const appError = useAppSelector(selectAppError);
  const appErrorMessage = useAppSelector(selectErrorMessage);

  useEffect(() => {
    dispatch(initAppDataAsync());
  }, []);

  if (apploading) {
    return <AppLoader />;
  }

  if (appError) {
    return <AppError message={appErrorMessage} />;
  }

  return (
    <RouterProvider router={mainRouter} />
  );
}
