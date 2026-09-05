import { useSelector } from 'react-redux';

function LoadingBar() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return <div className="loading-bar" role="status" aria-label="Memuat" />;
}

export default LoadingBar;
