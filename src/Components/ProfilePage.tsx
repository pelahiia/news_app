import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { logout } from '../redux.ts/authStore';
import { RootState } from '../redux.ts/store';
import { Article } from '../types/Article';
import { ArticleCard } from './ArticleCard';
import { signInPagePath } from '../constans/paths';
import favoriteIllustration from '../images/favoriteIllustration.jpg';

export const ProfilePage: React.FC = () => {
  const favoriteArticles = useSelector((state: RootState) => state.favorite.favoriteArticles);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    dispatch(logout());
    navigate(signInPagePath);
  };

  return (
    <div className="user_page">
      <div className="user_page_front">
        <p className="user_page_front_title">{t('favoriteTitle')}</p>
        <div className="user_page_front_logout">
          <LogoutIcon className="user_page_front_logout_icon" />
          <Button
            variant="text"
            onClick={handleLogout}
            color="error"
          >
            {t('logout')}
          </Button>
        </div>
      </div>
      {favoriteArticles.length > 0 ? (
        <div className="articles">
          {favoriteArticles.map((article: Article) => (
            <ArticleCard
              article={article}
              key={article.id}
              id={article.id}
            />
          ))}
        </div>
      ) : (
        <div className="favorites_not_found">
          <div className="favorites_not_found_info">
            <h2 className="favorites_not_found_info_title">
              {t('favoritesNotFoundTitle')}
            </h2>
            <p className="favorites_not_found_info_text">
              {t('favoritesNotFoundText')}
            </p>
          </div>
          <div className="favorites_not_found_image">
            <img
              src={favoriteIllustration}
              alt="Favourite Not Found Illustration"
              className="favorites_not_found_illustration"
            />
          </div>
        </div>
      )}
    </div>
  );
};
