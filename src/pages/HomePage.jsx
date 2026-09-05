import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import CategoryFilter from '../components/CategoryFilter';
import { asyncPopulateThreads } from '../states/threads/thunk';
import { setActiveCategory } from '../states/threads/reducer';

function HomePage() {
  const dispatch = useDispatch();
  const { items: threads, activeCategory } = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // The effect only *dispatches*; the actual fetch lives inside the thunk.
    dispatch(asyncPopulateThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const unique = new Set(
      threads.map((thread) => thread.category).filter(Boolean),
    );
    return ['Semua', ...unique];
  }, [threads]);

  const visibleThreads = useMemo(() => {
    if (activeCategory === 'Semua') return threads;
    return threads.filter((thread) => thread.category === activeCategory);
  }, [threads, activeCategory]);

  return (
    <div>
      <h1 className="page-heading">Thread terbaru</h1>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(category) => dispatch(setActiveCategory(category))}
      />
      <ThreadsList threads={visibleThreads} users={users} />
    </div>
  );
}

export default HomePage;
