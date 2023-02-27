import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { clearError } from '../redux.ts/errorStore';
import { loginSuccess, loginFailure } from '../redux.ts/authStore';
import { RootState } from '../redux.ts/store';
import signInIllustration from '../images/signInIllustration.jpg';
import { ErrorType } from '../types/ErrorType';
import { ErrorMessage } from './ErrorMessage';
import { profilePagePath } from '../constans/paths';

interface LoginData {
  username: string;
  password: string;
}

export const SignInPage: React.FC = () => {
  const { t } = useTranslation();
  const error = useSelector((state: RootState) => {
    return state.auth.error;
  });
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = loginData;

    if (username === 'admin' && password === '12345') {
      localStorage.setItem('isLoggedIn', 'true');
      dispatch(loginSuccess());
      navigate(profilePagePath);
    } else {
      dispatch(loginFailure(ErrorType.LOGIN));
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(loginFailure(null)), 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn) {
      dispatch(loginSuccess());
    }
  }, [dispatch]);

  return (
    <div className="profile_page">
      <div className="profile_page_auth">
        <div className="auth_title">
          {t('authTitle')}
        </div>
        <form onSubmit={handleLogin}>
          <div className="auth_input">
            <div>
              <label
                htmlFor="username"
                className="auth_label"
              >
                {t('username')}
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="auth_input">
            <div>
              <label
                htmlFor="password"
                className="auth_label"
              >
                {t('password')}
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <Button
            style={{ borderColor: 'black' }}
            variant="outlined"
            size="large"
            type="submit"
          >
            <Typography variant="button" style={{ color: 'black' }}>
              {t('authTitle')}
            </Typography>
          </Button>
        </form>
        {error && (
          <ErrorMessage
            error={error}
            closeError={() => dispatch(clearError())}
          />
        )}
      </div>
      <div className="profile_page_image">
        <img
          src={signInIllustration}
          alt="Rocket Illustration"
          className="profile_page_illustration"
        />
      </div>
    </div>
  );
};
