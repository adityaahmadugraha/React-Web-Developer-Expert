import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { asyncRegisterUser } from '../states/authUser/thunk';

function RegisterPage() {
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', password: '' } });

  const onSubmit = async (data) => {
    setSubmitError('');
    const result = await dispatch(asyncRegisterUser(data));
    if (result.success) {
      navigate('/login');
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Daftar akun</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError && <p className="form-error">{submitError}</p>}
        <FormField
          id="name"
          label="Nama"
          placeholder="Nama lengkap"
          error={errors.name?.message}
          {...register('name', { required: 'Nama wajib diisi' })}
        />
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
          Daftar
        </button>
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
