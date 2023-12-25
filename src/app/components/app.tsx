import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectAppError,
  selectAppLoading,
  selectErrorMessage,
} from '../stores/app.reducer';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppError } from './app.error';
import { AppLoader } from './app.loader';
import { initAppDataAsync } from '../stores/app.async.actions';
import { LoginPage } from '@/features/auth';
import HomePage from '@/routes/home.page';
import { SignUpPage } from '@/features/auth/routes/sign.up.page';
import EditorPage from '@/features/editor/routes/editor.page';
import { ArticleDetail } from '@/features/article';
import { UserProfilePage } from '@/features/profile';

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
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/article" />
      <Route path="/article/:slug" element={<ArticleDetail />} />
      <Route path="/profile/:username" element={<UserProfilePage />} />
    </Routes>
  );
}
