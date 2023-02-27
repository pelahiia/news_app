import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Marker } from 'react-mark.js';
import { Article } from '../types/Article';
import { ArticleCard } from './ArticleCard';

type Props = {
  articles: Article[],
  deleteArticleById: (id: number) => void,
  query: string,
};

export const ArticlesList: React.FC<Props> = ({ articles, deleteArticleById, query }) => {
  const [numOfArticles, setNumOfArticles] = useState<number>(12);

  const handleLoadMore = () => {
    setNumOfArticles(numOfArticles + numOfArticles);
  };

  const articlesToShow = articles.slice(0, numOfArticles);

  return (
    <>
      <Marker mark={query}>
        <div className="articles">
          {articlesToShow.map((article: Article) => (
            <ArticleCard
              article={article}
              key={article.id}
              deleteArticleById={deleteArticleById}
              id={article.id}
            />
          ))}
        </div>
      </Marker>
      {articlesToShow.length > 0 && (
        <div className="load-more_button">
          <Button
            variant="text"
            size="large"
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};
