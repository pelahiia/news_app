import React from 'react';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './styles/main.scss';
import { useSelector } from 'react-redux';
import { NewsPage } from './Components/NewsPage';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { SignInPage } from './Components/SignInPage';
import { ProfilePage } from './Components/ProfilePage';
import { PageNotFound } from './Components/PageNotFound';
import { RootState } from './redux.ts/store';
import {
  homePagePath,
  newsPagePath,
  signInPagePath,
  profilePagePath,
} from './constans/paths';

export const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={homePagePath} element={<HomePage />} />
        <Route path={newsPagePath} element={<NewsPage />} />
        <Route path={signInPagePath} element={<SignInPage />} />
        <Route path={profilePagePath} element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
