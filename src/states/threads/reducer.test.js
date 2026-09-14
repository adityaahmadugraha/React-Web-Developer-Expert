import { describe, it, expect } from 'vitest';
import threadsReducer, {
  receiveThreads,
  addThread,
  setActiveCategory,
  applyThreadVote,
} from './reducer';

describe('threadsReducer', () => {
  const initialState = { items: [], activeCategory: 'Semua' };

  it('should return the initial state when given an unknown action', () => {
    const nextState = threadsReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual(initialState);
  });

  it('should set items when receiveThreads is dispatched', () => {
    const threads = [{ id: 'thread-1', title: 'Halo' }];
    const nextState = threadsReducer(initialState, receiveThreads(threads));
    expect(nextState.items).toEqual(threads);
  });

  it('should prepend a new thread when addThread is dispatched', () => {
    const stateWithOneThread = {
      items: [{ id: 'thread-1', title: 'Thread lama' }],
      activeCategory: 'Semua',
    };
    const newThread = { id: 'thread-2', title: 'Thread baru' };

    const nextState = threadsReducer(stateWithOneThread, addThread(newThread));

    expect(nextState.items).toHaveLength(2);
    expect(nextState.items[0]).toEqual(newThread);
    expect(nextState.items[1].id).toBe('thread-1');
  });

  it('should update activeCategory when setActiveCategory is dispatched', () => {
    const nextState = threadsReducer(
      initialState,
      setActiveCategory('Teknologi'),
    );
    expect(nextState.activeCategory).toBe('Teknologi');
  });

  it('should add the user to upVotesBy on a fresh upvote', () => {
    const stateWithThread = {
      items: [{ id: 'thread-1', upVotesBy: [], downVotesBy: [] }],
      activeCategory: 'Semua',
    };

    const nextState = threadsReducer(
      stateWithThread,
      applyThreadVote({ threadId: 'thread-1', userId: 'user-1', voteType: 1 }),
    );

    expect(nextState.items[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.items[0].downVotesBy).toEqual([]);
  });

  it('should move the vote from upVotesBy to downVotesBy when the user switches vote', () => {
    const stateWithUpvote = {
      items: [{ id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] }],
      activeCategory: 'Semua',
    };

    const nextState = threadsReducer(
      stateWithUpvote,
      applyThreadVote({ threadId: 'thread-1', userId: 'user-1', voteType: -1 }),
    );

    expect(nextState.items[0].upVotesBy).toEqual([]);
    expect(nextState.items[0].downVotesBy).toEqual(['user-1']);
  });

  it('should remove the vote from both lists when voteType is neutral (0)', () => {
    const stateWithUpvote = {
      items: [{ id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] }],
      activeCategory: 'Semua',
    };

    const nextState = threadsReducer(
      stateWithUpvote,
      applyThreadVote({ threadId: 'thread-1', userId: 'user-1', voteType: 0 }),
    );

    expect(nextState.items[0].upVotesBy).toEqual([]);
    expect(nextState.items[0].downVotesBy).toEqual([]);
  });

  it('should do nothing when the threadId does not exist in state', () => {
    const nextState = threadsReducer(
      initialState,
      applyThreadVote({
        threadId: 'thread-unknown',
        userId: 'user-1',
        voteType: 1,
      }),
    );

    expect(nextState).toEqual(initialState);
  });
});
