import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import { asyncPopulateLeaderboards } from '../states/leaderboards/thunk';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div>
      <h1 className="page-heading">Papan peringkat</h1>
      {leaderboards.length === 0 ? (
        <p className="empty-state">Belum ada data peringkat.</p>
      ) : (
        <ul className="leaderboard-list">
          {leaderboards.map((entry, index) => (
            <li className="leaderboard-row" key={entry.user.id}>
              <span className="leaderboard-row__rank">{index + 1}</span>
              <Avatar name={entry.user.name} image={entry.user.avatar} size={32} />
              <span className="leaderboard-row__name">{entry.user.name}</span>
              <span className="leaderboard-row__score">{entry.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LeaderboardsPage;
