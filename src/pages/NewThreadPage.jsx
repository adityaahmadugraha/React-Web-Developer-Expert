import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { asyncAddThread } from '../states/threads/thunk';

function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const result = await dispatch(asyncAddThread({ title, body, category }));
    if (result.success) {
      navigate(`/threads/${result.thread.id}`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="form-card">
      <h1 className="page-heading">Buat thread baru</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <Input id="title" label="Judul" value={title} onChange={setTitle} placeholder="Judul thread" />
        <Input
          id="category"
          label="Kategori (opsional)"
          value={category}
          onChange={setCategory}
          placeholder="mis. Umum, Teknologi"
        />
        <Input
          id="body"
          label="Isi"
          value={body}
          onChange={setBody}
          placeholder="Tulis isi thread…"
          textarea
        />
        <button type="submit" className="btn btn--primary" disabled={!title.trim() || !body.trim()}>
          Publikasikan
        </button>
      </form>
    </div>
  );
}

export default NewThreadPage;
