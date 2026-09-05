import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { asyncSetAuthUser } from '../states/authUser/thunk';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Masuk</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="nama@email.com"
        />
        <Input
          id="password"
          label="Kata sandi"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Minimal 6 karakter"
        />
        <button type="submit" className="btn btn--primary">Masuk</button>
      </form>
      <p className="form-footer-note">
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
