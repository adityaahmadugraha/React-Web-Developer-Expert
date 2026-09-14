import PropTypes from 'prop-types';

function VoteButtons({
  upVotesBy, downVotesBy, currentUserId, onVote, disabled,
}) {
  const hasUpVoted = upVotesBy.includes(currentUserId);
  const hasDownVoted = downVotesBy.includes(currentUserId);

  const handleUpVote = () => {
    onVote(hasUpVoted ? 0 : 1);
  };

  const handleDownVote = () => {
    onVote(hasDownVoted ? 0 : -1);
  };

  return (
    <div className="vote-group">
      <button
        type="button"
        className={`vote-btn vote-btn--up ${hasUpVoted ? 'vote-btn--active' : ''}`}
        onClick={handleUpVote}
        disabled={disabled}
        aria-pressed={hasUpVoted}
        title={disabled ? 'Masuk untuk memberi vote' : 'Upvote'}
      >
        ▲
        {' '}
        {upVotesBy.length}
      </button>
      <button
        type="button"
        className={`vote-btn vote-btn--down ${hasDownVoted ? 'vote-btn--active' : ''}`}
        onClick={handleDownVote}
        disabled={disabled}
        aria-pressed={hasDownVoted}
        title={disabled ? 'Masuk untuk memberi vote' : 'Downvote'}
      >
        ▼
        {' '}
        {downVotesBy.length}
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

VoteButtons.defaultProps = {
  currentUserId: null,
  disabled: false,
};

export default VoteButtons;

  it('screenshot CI error', () => {
    expect(1 + 1).toBe(3);
  });