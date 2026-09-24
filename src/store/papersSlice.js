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
      state.papers.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPapers, addPaper, setLoading, setError } = papersSlice.actions;
export default papersSlice.reducer;
