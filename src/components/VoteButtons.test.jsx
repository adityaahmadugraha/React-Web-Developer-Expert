import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButtons from './VoteButtons';

describe('VoteButtons component', () => {
  it('should render the correct upvote and downvote counts', () => {
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        currentUserId="user-9"
        onVote={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: /▲ 2/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /▼ 1/ })).toBeInTheDocument();
  });

  it('should mark the upvote button as active when the current user already upvoted', () => {
    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        currentUserId="user-1"
        onVote={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: /▲/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call onVote(1) when clicking upvote from a neutral state', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();

    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        currentUserId="user-1"
        onVote={onVote}
      />,
    );

    await user.click(screen.getByRole('button', { name: /▲/ }));

    expect(onVote).toHaveBeenCalledWith(1);
  });

  it('should call onVote(0) when clicking upvote that is already active (un-voting)', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();

    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        currentUserId="user-1"
        onVote={onVote}
      />,
    );

    await user.click(screen.getByRole('button', { name: /▲/ }));

    expect(onVote).toHaveBeenCalledWith(0);
  });

  it('should not call onVote when the buttons are disabled', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();

    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        currentUserId="user-1"
        onVote={onVote}
        disabled
      />,
    );

    await user.click(screen.getByRole('button', { name: /▲/ }));

    expect(onVote).not.toHaveBeenCalled();
  });
});


  it('sengaja gagal untuk screenshot branch protection', () => {
    expect(1 + 1).toBe(3);
  });
});