import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import authReducer from './redux.ts/authStore';
import errorReducer from './redux.ts/errorStore';
import favoriteReducer from './redux.ts/favoriteStore';
import './index.scss';
import i18n from './i18n';
import { App } from './App';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    favorite: favoriteReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
