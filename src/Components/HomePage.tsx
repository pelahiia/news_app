import React from 'react';
import { useTranslation } from 'react-i18next';
import homePageIllustration from '../images/homePageIllustration.jpg';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home_page">
      <div className="home_page_information">
        <h1 className="home_page_information_title">
          {t('homeTitle')}
        </h1>
        <p className="home_page_information_text">
          {t('homeText')}
        </p>
      </div>
      <div className="home_page_image">
        <img
          src={homePageIllustration}
          alt="Home Page Illustration"
          className="home_page_illustration"
        />
      </div>
    </div>
  );
};
