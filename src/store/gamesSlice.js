
import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    currentGame: null,
    score: 0,
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    updateScore: (state, action) => {
      state.score += action.payload;
    },
  },
});

export const { setGames, setCurrentGame, updateScore } = gamesSlice.actions;
export default gamesSlice.reducer;
