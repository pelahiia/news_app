import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Menu,
  Fade,
} from '@mui/material';
import { RootState } from '../redux.ts/store';
import logoIcon from '../images/icons-planet.png';
import {
  homePagePath,
  newsPagePath,
  profilePagePath,
  signInPagePath,
} from '../constans/paths';

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [language, setLanguage] = useState<string>('eng');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;

    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="header-navbar">
      <div className="header-navbar-content">
        <a href="/" className="header-navbar-icon">
          <img
            className="header-navbar-icon"
            src={logoIcon}
            alt="Main Logo Icon"
          />
        </a>
        <NavLink
          to={homePagePath}
          className={({ isActive }) => (isActive ? 'header-navbar-active' : 'header-navbar-inactive')}
        >
          {t('home')}
        </NavLink>
        <NavLink
          to={newsPagePath}
          className={({ isActive }) => (isActive ? 'header-navbar-active' : 'header-navbar-inactive')}
        >
          {t('news')}
        </NavLink>
      </div>
      <div className="header-navbar-lang">
        {isLoggedIn ? (
          <NavLink
            to={profilePagePath}
            className={({ isActive }) => (isActive ? 'header-navbar-active' : 'header-navbar-inactive')}
          >
            {t('profile')}
          </NavLink>
        ) : (
          <NavLink
            to={signInPagePath}
            className={({ isActive }) => (isActive ? 'header-navbar-active' : 'header-navbar-inactive')}
          >
            {t('authTitle')}
          </NavLink>
        )}
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-label">LNG</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            defaultValue="eng"
            label="LNG"
            onChange={handleChange}
          >
            <MenuItem value="ukr">UKR</MenuItem>
            <MenuItem value="eng">ENG</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="header-navbar-burger">
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickMenu}
          size="large"
        >
          Menu
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleCloseMenu}>
            <NavLink
              to={homePagePath}
              className="header-navbar-burger-link"
            >
              {t('home')}
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <NavLink
              to={newsPagePath}
              className="header-navbar-burger-link"
            >
              {t('news')}
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            {isLoggedIn ? (
              <NavLink
                to={profilePagePath}
                className="header-navbar-burger-link"
              >
                {t('profile')}
              </NavLink>
            ) : (
              <NavLink
                to={signInPagePath}
                className="header-navbar-burger-link"
              >
                {t('authTitle')}
              </NavLink>
            )}
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};
