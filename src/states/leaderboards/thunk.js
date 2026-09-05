import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/reducer';
import { receiveLeaderboards } from './reducer';

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateLeaderboards };
