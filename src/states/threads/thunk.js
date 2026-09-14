import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/reducer';
import { receiveUsers } from '../users/reducer';
import { receiveThreads, addThread, applyThreadVote } from './reducer';

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);
      dispatch(receiveThreads(threads));
      dispatch(receiveUsers(users));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      const thread = await api.createThread({ title, body, category });
      dispatch(addThread({ ...thread, ownerId: authUser.id }));
      return { success: true, thread };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(applyThreadVote({ threadId, userId, voteType }));

    try {
      if (voteType === 1) await api.upVoteThread(threadId);
      else if (voteType === -1) await api.downVoteThread(threadId);
      else await api.neutralizeVoteThread(threadId);
    } catch {
      const threads = await api.getAllThreads();
      dispatch(receiveThreads(threads));
    }
  };
}

export { asyncPopulateThreads, asyncAddThread, asyncToggleVoteThread };
