import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/">Kembali ke beranda</Link>
    </div>
  );
}

export default NotFoundPage;
