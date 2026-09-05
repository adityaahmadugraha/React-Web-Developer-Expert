import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import postedAt from '../utils/formatTime';

function ThreadItem({
  id, title, body, category, createdAt, totalComments, owner,
}) {
  return (
    <li>
      <Link to={`/threads/${id}`} className="thread-card">
        {category && <div className="thread-card__category">{category}</div>}
        <h2 className="thread-card__title">{title}</h2>
        <p className="thread-card__excerpt">{body}</p>
        <div className="thread-card__meta">
          <span className="thread-card__owner">
            <Avatar name={owner.name} image={owner.avatar} size={20} />
            {owner.name}
          </span>
          <span className="thread-card__dot" />
          <span>{postedAt(createdAt)}</span>
          <span className="thread-card__dot" />
          <span>
            {totalComments}
            {' '}
            komentar
          </span>
        </div>
      </Link>
    </li>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

ThreadItem.defaultProps = {
  category: '',
};

export default ThreadItem;
