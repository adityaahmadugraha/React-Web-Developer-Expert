import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import { asyncUnsetAuthUser } from '../states/authUser/thunk';

function Navbar() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">Forum</Link>
        <div className="navbar__links">
          <Link to="/leaderboards" className="navbar__link">Leaderboard</Link>
          {authUser ? (
            <>
              <Link to="/threads/new" className="navbar__link">Buat thread</Link>
              <div className="navbar__user">
                <Avatar name={authUser.name} image={authUser.avatar} size={24} />
                <button type="button" className="btn btn--ghost" onClick={handleLogout}>
                  Keluar
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">Masuk</Link>
              <Link to="/register" className="btn btn--primary">Daftar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
