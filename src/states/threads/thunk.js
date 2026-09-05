import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/reducer';
import { receiveUsers } from '../users/reducer';
import { receiveThreads, addThread, applyThreadVote } from './reducer';

// Threads and users are fetched together because the thread list only carries
// an ownerId; we need the users list to resolve it to a name + avatar.
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
      // The API doesn't echo the owner's identity on this response, so we
      // attach it from the currently logged-in user to keep the store consistent.
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

    // Optimistically apply first so the button reacts immediately.
    dispatch(applyThreadVote({ threadId, userId, voteType }));

    try {
      if (voteType === 1) await api.upVoteThread(threadId);
      else if (voteType === -1) await api.downVoteThread(threadId);
      else await api.neutralizeVoteThread(threadId);
    } catch {
      // Roll back by re-fetching the authoritative thread list.
      const threads = await api.getAllThreads();
      dispatch(receiveThreads(threads));
    }
  };
}

export { asyncPopulateThreads, asyncAddThread, asyncToggleVoteThread };
