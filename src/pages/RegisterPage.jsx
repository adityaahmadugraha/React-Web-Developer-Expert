import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { asyncRegisterUser } from '../states/authUser/thunk';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Daftar akun</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <Input id="name" label="Nama" value={name} onChange={setName} placeholder="Nama lengkap" />
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
        <button type="submit" className="btn btn--primary">Daftar</button>
      </form>
      <p className="form-footer-note">
        Sudah punya akun?
        {' '}
        <Link to="/login">Masuk di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
