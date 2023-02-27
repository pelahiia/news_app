# 🚀 Space App 🚀

Space App is a web application that allows users to view and search for the latest space news from around the world, save their favorite articles, and view them in their profile page. It is available in two languages: English and Ukrainian.

[DEMO LINK](https://pelahiia.github.io/space_app/) 💫

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Home Page](#-home-page)
- [News](#-news)
- [Sign In Page](#-sign-in-page)
- [Profile Page](#-profile-page)
- [Page Not Found](#-page-not-found)
- [Error Alerts](#-error-alerts)

## 🛠️ Tech Stack

- JavaScript
- TypeScript
- React
- Redux (toolkit)
- React Router (v6)
- CSS (Sass)
- Material.ui (Menu, Button, Input, Icons, Loader, Message Alert)
- Libraries: i18next (for localization into English and Ukrainian), moment.js (for working with date), Mark.js (for highlighting the text search)

## 🏠 Home Page

Our welcoming page to the website!

## 📰 News

Page with the latest space news from around the world 🌎. Spaceflight News API (https://spaceflightnewsapi.net/) is used to display the latest news, which can be searched by keywords. The search text will be highlighted 🔍.

🔘 Pagination is available on this page and by clicking "Load more" you can see more news.

🔗 By clicking "Read more" you will be redirected to the original news website.

❤️ Clicking "Add to favourite" will save the news article to your Profile Page.

❌ User also can delete an article from the News Page.


## 👤 Sign In Page

Sign in to the app with the following login and password:

Login: admin

Password: 12345

🗝️ User authorization information is stored in localStorage.

♻️ If the correct data is entered, the user is redirected to the /profile page.

❌ If the user enters invalid username or password, an error alert will be displayed.


## 👩‍🦰 Profile Page

View your favourite articles and remove them from your saved list.

🔒 Unauthorized access will redirect you back to the Home Page.

🚪 Logout button available for user convenience.


## ❗ Page Not Found

If the user enters an invalid path, they will be redirected to the Page Not Found error page.

## 🚫 Error Alerts

If news articles cannot be loaded 📥

If no news is found by search keywords 🔍

If an article cannot be deleted ❌

If the user enters invalid username or password 🙅‍♀️


Thank you for checking out our Space App! 🚀🌌🌍
