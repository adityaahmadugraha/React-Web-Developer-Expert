import PropTypes from 'prop-types';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import postedAt from '../utils/formatTime';

function CommentItem({
  content, createdAt, owner, upVotesBy, downVotesBy, currentUserId, onVote, canVote,
}) {
  return (
    <li className="comment-item">
      <div className="comment-item__header">
        <Avatar name={owner.name} image={owner.avatar} size={24} />
        <span className="comment-item__owner">{owner.name}</span>
        <span className="comment-item__time">{postedAt(createdAt)}</span>
      </div>
      <p className="comment-item__content">{content}</p>
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        currentUserId={currentUserId}
        onVote={onVote}
        disabled={!canVote}
      />
    </li>
  );
}

CommentItem.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  canVote: PropTypes.bool,
};

CommentItem.defaultProps = {
  currentUserId: null,
  canVote: false,
};

export default CommentItem;
