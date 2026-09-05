import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (_state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      if (!state) return;
      state.comments = [action.payload, ...state.comments];
    },
    applyThreadDetailVote: (state, action) => {
      const { userId, voteType } = action.payload;
      if (!state) return;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      if (voteType === 1) state.upVotesBy.push(userId);
      if (voteType === -1) state.downVotesBy.push(userId);
    },
    applyCommentVote: (state, action) => {
      const { commentId, userId, voteType } = action.payload;
      if (!state) return;
      const comment = state.comments.find((item) => item.id === commentId);
      if (!comment) return;
      comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
      comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      if (voteType === 1) comment.upVotesBy.push(userId);
      if (voteType === -1) comment.downVotesBy.push(userId);
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  applyThreadDetailVote,
  applyCommentVote,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
