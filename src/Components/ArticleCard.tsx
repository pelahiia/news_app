import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux.ts/store';
import { addFavorite, removeFavorite } from '../redux.ts/favoriteStore';
import { Article } from '../types/Article';
import dateIcon from '../images/icons-calendar-24.png';
import readmoreIcon from '../images/icons-right-arrow.png';
import deleteIcon from '../images/icons-delete-trash-64.png';
import { newsPagePath } from '../constans/paths';

type Props = {
  article: Article,
  id: number,
  deleteArticleById?: (id: number) => void,
};

export const ArticleCard: React.FC<Props> = ({ article, id, deleteArticleById }) => {
  const {
    title,
    imageUrl,
    publishedAt,
    summary,
    url,
  } = article;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favoriteArticles = useSelector((state: RootState) => state.favorite.favoriteArticles);
  const { pathname } = useLocation();
  const isNewsPage = pathname === newsPagePath;

  const handleDeleteClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (deleteArticleById) {
      await deleteArticleById(id);
    }
  };

  const handleClickFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (favoriteArticles.some(favorite => favorite.id === article.id)) {
      dispatch(removeFavorite(article.id));
    } else {
      dispatch(addFavorite(article));
    }
  };

  return (
    <div className="article">
      <div className="article_image">
        <img
          src={imageUrl}
          alt="Article logo"
        />
      </div>

      <div className="article_content">
        <div className="article_date">
          <img
            className="article_date_logo"
            src={dateIcon}
            alt="Calendar icon"
          />
          <div className="article_date_left">
            {moment(publishedAt).format('MMM Do, YYYY')}
          </div>
        </div>
        <p className="title_content">
          {title}
        </p>

        <div className="summary">
          <p className="summary_text">
            {summary}
          </p>
        </div>

        <div className="bottom-links">
          <div className="read-more">
            <a
              className="read-more_link"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('readmore')}
            </a>
            <img
              className="read-more_icon"
              src={readmoreIcon}
              alt="Read more icon"
            />
          </div>
          <div className="favorite-item">
            <button
              type="button"
              className="favorite-item_button"
              onClick={handleClickFavorite}
            >
              <FavoriteBorderIcon
                className={classNames('favorite-item-button_icon', {
                  'favorite-item-button_icon-active': favoriteArticles.some(favorite => favorite.id === article.id),
                })}
              />
            </button>
          </div>
          {isNewsPage && (
            <div className="delete-item">
              <a
                href="/"
                className="delete-item_link"
                onClick={handleDeleteClick}
              >
                {t('delete')}
              </a>
              <img
                src={deleteIcon}
                alt="Delete Icon"
                className="delete-item_icon"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
