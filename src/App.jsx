import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import LoadingBar from './components/LoadingBar';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadAuthUser } from './states/authUser/thunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadAuthUser());
  }, [dispatch]);

  return (
    <>
      <LoadingBar />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
          <Route
            path="/threads/new"
            element={(
              <RequireAuth>
                <NewThreadPage />
              </RequireAuth>
            )}
          />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
