import { describe, it, expect } from 'vitest';
import threadDetailReducer, {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  applyCommentVote,
} from './reducer';

describe('threadDetailReducer', () => {
  it('should return null as the initial state', () => {
    const nextState = threadDetailReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toBeNull();
  });

  it('should set the state to the received thread detail', () => {
    const detailThread = { id: 'thread-1', title: 'Judul', comments: [] };
    const nextState = threadDetailReducer(
      null,
      receiveThreadDetail(detailThread),
    );
    expect(nextState).toEqual(detailThread);
  });

  it('should reset the state to null when clearThreadDetail is dispatched', () => {
    const stateWithThread = { id: 'thread-1', title: 'Judul', comments: [] };
    const nextState = threadDetailReducer(stateWithThread, clearThreadDetail());
    expect(nextState).toBeNull();
  });

  it('should prepend a new comment to the comments list', () => {
    const stateWithThread = {
      id: 'thread-1',
      comments: [{ id: 'comment-1', content: 'Komentar lama' }],
    };
    const newComment = { id: 'comment-2', content: 'Komentar baru' };

    const nextState = threadDetailReducer(
      stateWithThread,
      addComment(newComment),
    );

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should only apply the vote to the matching comment, leaving others untouched', () => {
    const stateWithComments = {
      id: 'thread-1',
      comments: [
        { id: 'comment-1', upVotesBy: [], downVotesBy: [] },
        { id: 'comment-2', upVotesBy: [], downVotesBy: [] },
      ],
    };

    const nextState = threadDetailReducer(
      stateWithComments,
      applyCommentVote({
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 1,
      }),
    );

    expect(nextState.comments[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.comments[1].upVotesBy).toEqual([]);
  });

  it('should not throw when the state is still null', () => {
    const nextState = threadDetailReducer(
      null,
      applyCommentVote({
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 1,
      }),
    );
    expect(nextState).toBeNull();
  });

  it('should not throw when the commentId does not exist', () => {
    const stateWithComments = {
      id: 'thread-1',
      comments: [{ id: 'comment-1', upVotesBy: [], downVotesBy: [] }],
    };

    const nextState = threadDetailReducer(
      stateWithComments,
      applyCommentVote({
        commentId: 'comment-unknown',
        userId: 'user-1',
        voteType: 1,
      }),
    );

    expect(nextState.comments[0].upVotesBy).toEqual([]);
  });
});
