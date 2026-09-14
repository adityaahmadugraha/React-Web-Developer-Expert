import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser } from './thunk';
import { setAuthUser } from './reducer';
import { showLoading, hideLoading } from '../loading/reducer';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, setAuthUser, and hideLoading on successful login', async () => {
    const fakeUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    api.login.mockResolvedValue('fake-token');
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'secret',
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'secret',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ success: true });
  });

  it('should not dispatch setAuthUser and should return a failure result when login fails', async () => {
    api.login.mockRejectedValue(new Error('email or password is wrong'));

    const dispatch = vi.fn();
    const result = await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'wrong',
    })(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'authUser/setAuthUser' }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({
      success: false,
      message: 'email or password is wrong',
    });
  });
});
