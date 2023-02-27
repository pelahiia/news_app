import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundIllustration from '../images/notFoundIllustration.jpg';

export const PageNotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not_found">
      <div className="not_found_information">
        <h1 className="not_found_information_title">
          {t('pageNotFoundTitle')}
        </h1>
        <p className="not_found_information_text">
          {t('pageNotFoundText')}
        </p>
      </div>
      <div className="not_found_image">
        <img
          src={notFoundIllustration}
          alt="Page Not Found"
          className="home_page_illustration"
        />
      </div>
    </div>
  );
};
