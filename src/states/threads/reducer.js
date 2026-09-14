import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    items: [],
    activeCategory: 'Semua',
  },
  reducers: {
    receiveThreads: (state, action) => {
      state.items = action.payload;
    },
    addThread: (state, action) => {
      state.items = [action.payload, ...state.items];
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    applyThreadVote: (state, action) => {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.items.find((item) => item.id === threadId);
      if (!thread) return;
      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      if (voteType === 1) thread.upVotesBy.push(userId);
      if (voteType === -1) thread.downVotesBy.push(userId);
    },
  },
});

export const { receiveThreads, addThread, setActiveCategory, applyThreadVote } =
  threadsSlice.actions;
export default threadsSlice.reducer;
