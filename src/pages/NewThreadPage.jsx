import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { asyncAddThread } from '../states/threads/thunk';

function NewThreadPage() {
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { title: '', category: '', body: '' } });

  const onSubmit = async (data) => {
    setSubmitError('');
    const result = await dispatch(asyncAddThread(data));
    if (result.success) {
      navigate(`/threads/${result.thread.id}`);
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Buat thread baru</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError && <p className="form-error">{submitError}</p>}
        <FormField
          id="title"
          label="Judul"
          placeholder="Judul thread"
          error={errors.title?.message}
          {...register('title', { required: 'Judul wajib diisi' })}
        />
        <FormField
          id="category"
          label="Kategori (opsional)"
          placeholder="mis. Umum, Teknologi"
          {...register('category')}
        />
        <FormField
          id="body"
          label="Isi"
          placeholder="Tulis isi thread…"
          textarea
          error={errors.body?.message}
          {...register('body', { required: 'Isi thread wajib diisi' })}
        />
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          Publikasikan
        </button>
      </form>
    </div>
  );
}

export default NewThreadPage;
