import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({ comments, currentUserId, onVoteComment, canVote }) {
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
   
  comments: PropTypes.array.isRequired,
  currentUserId: PropTypes.string,
  onVoteComment: PropTypes.func.isRequired,
  canVote: PropTypes.bool,
};

CommentsList.defaultProps = {
  currentUserId: null,
  canVote: false,
};

export default CommentsList;
