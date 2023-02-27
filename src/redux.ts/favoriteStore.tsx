import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../types/Article';

interface FavoriteState {
  favoriteArticles: Article[],
}

const initialState: FavoriteState = {
  favoriteArticles: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Article>) => {
      state.favoriteArticles.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favoriteArticles.findIndex(
        (article) => article.id === action.payload,
      );

      if (index !== -1) {
        state.favoriteArticles.splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
