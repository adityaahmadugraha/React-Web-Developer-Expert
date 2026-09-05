import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/reducer';
import { setAuthUser, unsetAuthUser } from './reducer';

// Called once on app start: checks for an existing token and restores the session.
function asyncPreloadAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = api.getAccessToken();
      if (token) {
        const user = await api.getOwnProfile();
        dispatch(setAuthUser(user));
      }
    } catch {
      // Invalid/expired token: clear it silently and treat as logged out.
      api.removeAccessToken();
      dispatch(unsetAuthUser());
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const user = await api.getOwnProfile();
      dispatch(setAuthUser(user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    api.removeAccessToken();
    dispatch(unsetAuthUser());
    dispatch(hideLoading());
  };
}

export {
  asyncPreloadAuthUser,
  asyncSetAuthUser,
  asyncRegisterUser,
  asyncUnsetAuthUser,
};
