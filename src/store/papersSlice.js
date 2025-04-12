
import { createSlice } from '@reduxjs/toolkit';

const papersSlice = createSlice({
  name: 'papers',
  initialState: {
    papers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPapers: (state, action) => {
      state.papers = action.payload;
    },
    addPaper: (state, action) => {
      state.papers.push(action.payload);
    },
  },
});

export const { setPapers, addPaper } = papersSlice.actions;
export default papersSlice.reducer;
