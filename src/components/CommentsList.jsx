import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({
  comments, currentUserId, onVoteComment, canVote,
}) {
  if (comments.length === 0) {
    return <p className="empty-state">Belum ada komentar. Jadilah yang pertama!</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          currentUserId={currentUserId}
          canVote={canVote}
          onVote={(voteType) => onVoteComment(comment.id, voteType)}
        />
      ))}
    </ul>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  currentUserId: PropTypes.string,
  onVoteComment: PropTypes.func.isRequired,
  canVote: PropTypes.bool,
};

CommentsList.defaultProps = {
  currentUserId: null,
  canVote: false,
};

export default CommentsList;
