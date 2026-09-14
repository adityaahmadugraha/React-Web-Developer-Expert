import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { asyncSetAuthUser } from '../states/authUser/thunk';

function LoginPage() {
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data) => {
    setSubmitError('');
    const result = await dispatch(asyncSetAuthUser(data));
    if (result.success) {
      navigate('/');
    } else {
      add error
      setSubmitError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Masuk</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError && <p className="form-error">{submitError}</p>}
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email tidak valid' },
          })}
        />
        <FormField
          id="password"
          label="Kata sandi"
          type="password"
          placeholder="Minimal 6 karakter"
          error={errors.password?.message}
          {...register('password', {
            required: 'Kata sandi wajib diisi',
            minLength: { value: 6, message: 'Kata sandi minimal 6 karakter' },
          })}
        />
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          Masuk
        </button>
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
