import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import VoteButtons from '../components/VoteButtons';
import CommentsList from '../components/CommentsList';
import postedAt from '../utils/formatTime';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../states/threadDetail/thunk';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  if (!thread) {
    return <p className="empty-state">Memuat thread…</p>;
  }

  const canInteract = Boolean(authUser);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    const result = await dispatch(asyncAddComment({ threadId, content: commentText }));
    if (result.success) setCommentText('');
  };

  return (
    <div>
      {thread.category && <div className="thread-detail__category">{thread.category}</div>}
      <h1 className="thread-detail__title">{thread.title}</h1>
      <div className="thread-detail__meta">
        <Avatar name={thread.owner.name} image={thread.owner.avatar} size={28} />
        <span>{thread.owner.name}</span>
        <span>·</span>
        <span>{postedAt(thread.createdAt)}</span>
      </div>
      <p className="thread-detail__body">{thread.body}</p>
      <div className="thread-detail__actions">
        <VoteButtons
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          currentUserId={authUser?.id}
          disabled={!canInteract}
          onVote={(voteType) => dispatch(asyncToggleVoteThreadDetail({ threadId, voteType }))}
        />
      </div>

      <h2 className="comments-heading">
        {thread.comments.length}
        {' '}
        komentar
      </h2>

      {canInteract ? (
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Tulis komentarmu…"
          />
          <div className="comment-form__footer">
            <button type="submit" className="btn btn--primary" disabled={!commentText.trim()}>
              Kirim komentar
            </button>
          </div>
        </form>
      ) : (
        <p className="form-footer-note">
          <Link to="/login">Masuk</Link>
          {' '}
          untuk ikut berkomentar.
        </p>
      )}

      <CommentsList
        comments={thread.comments}
        currentUserId={authUser?.id}
        canVote={canInteract}
        onVoteComment={(commentId, voteType) => dispatch(
          asyncToggleVoteComment({ threadId, commentId, voteType }),
        )}
      />
    </div>
  );
}

export default ThreadDetailPage;
