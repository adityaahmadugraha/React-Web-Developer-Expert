import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/reducer';
import {
  receiveThreadDetail,
  addComment,
  applyThreadDetailVote,
  applyCommentVote,
} from './reducer';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(detailThread));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThreadDetail({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const userId = authUser.id;
    dispatch(applyThreadDetailVote({ userId, voteType }));

    try {
      if (voteType === 1) await api.upVoteThread(threadId);
      else if (voteType === -1) await api.downVoteThread(threadId);
      else await api.neutralizeVoteThread(threadId);
    } catch {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(detailThread));
    }
  };
}

function asyncToggleVoteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const userId = authUser.id;
    dispatch(applyCommentVote({ commentId, userId, voteType }));

    try {
      if (voteType === 1) await api.upVoteComment(threadId, commentId);
      else if (voteType === -1) await api.downVoteComment(threadId, commentId);
      else await api.neutralizeVoteComment(threadId, commentId);
    } catch {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(detailThread));
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
};
