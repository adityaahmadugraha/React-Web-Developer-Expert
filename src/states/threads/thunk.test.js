import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncToggleVoteThread } from './thunk';
import { applyThreadVote, receiveThreads } from './reducer';

vi.mock('../../utils/api', () => ({
  default: {
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
    getAllThreads: vi.fn(),
  },
}));

const getState = () => ({ authUser: { id: 'user-1' } });

describe('asyncToggleVoteThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should optimistically dispatch applyThreadVote before the API call resolves', async () => {
    api.upVoteThread.mockResolvedValue({ id: 'vote-1' });
    const dispatch = vi.fn();

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(
      applyThreadVote({ threadId: 'thread-1', userId: 'user-1', voteType: 1 }),
    );
  });

  it('should call downVoteThread when voteType is -1', async () => {
    api.downVoteThread.mockResolvedValue({ id: 'vote-1' });
    const dispatch = vi.fn();

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: -1 })(
      dispatch,
      getState,
    );

    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    expect(api.upVoteThread).not.toHaveBeenCalled();
  });

  it('should call neutralizeVoteThread when voteType is 0', async () => {
    api.neutralizeVoteThread.mockResolvedValue({ id: 'vote-1' });
    const dispatch = vi.fn();

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 0 })(
      dispatch,
      getState,
    );

    expect(api.neutralizeVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should NOT roll back when the API call succeeds', async () => {
    api.upVoteThread.mockResolvedValue({ id: 'vote-1' });
    const dispatch = vi.fn();

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    expect(api.getAllThreads).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'threads/receiveThreads' }),
    );
  });

  it('should roll back by re-fetching and dispatching receiveThreads when the API call fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Network error'));
    const freshThreads = [{ id: 'thread-1', upVotesBy: [], downVotesBy: [] }];
    api.getAllThreads.mockResolvedValue(freshThreads);
    const dispatch = vi.fn();

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(freshThreads));
  });
});
