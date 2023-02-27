import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, setError } from '../redux.ts/errorStore';
import { RootState } from '../redux.ts/store';
import { getArticles } from '../api/articles';
import { ErrorType } from '../types/ErrorType';
import { Article } from '../types/Article';
import { ArticlesList } from './ArticlesList';
import { ErrorMessage } from './ErrorMessage';
import noResults from '../images/noResults.jpg';

export const NewsPage: React.FC = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState<string>('');
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error.error);

  const { t } = useTranslation();

  const loadArticles = async () => {
    setIsLoading(true);

    try {
      const loadedArticles = await getArticles();

      setAllArticles(loadedArticles);
      setVisibleArticles(loadedArticles);
    } catch {
      dispatch(setError(ErrorType.LOAD));
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const deleteArticleById = async (id: number) => {
    try {
      // This API doesn't support "delete" method. Generally, we could do it the following way:
      // await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`, {
      //   method: 'DELETE',
      // });
      setAllArticles(allArticles.filter((article) => article.id !== id));
      setVisibleArticles(visibleArticles.filter((article) => article.id !== id));
    } catch {
      dispatch(setError(ErrorType.DELETE));
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error]);

  useEffect(() => {
    const articlesToShow = allArticles.filter((article: Article) => {
      return (
        article.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || article.summary.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    });

    setVisibleArticles(articlesToShow);

    if (articlesToShow.length === 0) {
      dispatch(setError(ErrorType.FIND));
    } else {
      dispatch(clearError());
    }
  }, [query, allArticles, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchInputPlaceholder = t('newsSearch');

  return (
    <div className="news_page">
      <div className="news_page_filter">
        <h2 className="filter_title">
          {t('newsSearch')}
        </h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={searchInputPlaceholder}
          value={query}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton disableRipple>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            boxShadow: 0,
            borderRadius: 0,
            marginTop: 1,
            marginBottom: 5,
            padding: 0,
          }}
        />
      </div>
      <div className="news_result_text">
        {`${t('newsResult')}: ${visibleArticles.length}`}
      </div>

      {!isLoading ? (
        <ArticlesList
          articles={visibleArticles}
          deleteArticleById={deleteArticleById}
          query={query}
        />
      ) : (
        <CircularProgress />
      )}

      {visibleArticles.length === 0 && !isLoading && (
        <div className="no_result_page">
          <div className="no-result_page_information">
            <h1 className="no-result_page_information_title">
              {t('noResultsTitle')}
            </h1>
            <p className="no_result_page_information_text">
              {t('noResultsText')}
            </p>
          </div>
          <div className="no_result_page_image">
            <img
              src={noResults}
              alt="No Result Page Illustration"
              className="no_result_page_illustration"
            />
          </div>
        </div>
      )}

      {error && !isLoading && (
        <ErrorMessage
          error={error}
          closeError={() => dispatch(clearError())}
        />
      )}
    </div>
  );
};
