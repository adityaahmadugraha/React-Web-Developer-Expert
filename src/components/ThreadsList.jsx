import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, users }) {
  if (threads.length === 0) {
    return <p className="empty-state">Belum ada thread pada kategori ini.</p>;
  }

  return (
    <ul className="thread-list">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId) || {};
        return (
          <ThreadItem
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            createdAt={thread.createdAt}
            totalComments={thread.totalComments}
            owner={{ name: owner.name || 'Pengguna', avatar: owner.avatar }}
          />
        );
      })}
    </ul>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    totalComments: PropTypes.number,
    ownerId: PropTypes.string,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  })).isRequired,
};

export default ThreadsList;
