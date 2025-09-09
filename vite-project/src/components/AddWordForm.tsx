import React, { useState } from 'react';

interface AddWordFormProps {
  handleAdd: (english: string, vietnamese: string) => void;
  existingWords: string[];
}

const AddWordForm: React.FC<AddWordFormProps> = ({ handleAdd, existingWords }) => {
  const [english, setEnglish] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!english.trim() || !vietnamese.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (existingWords.includes(english.trim().toLowerCase())) {
      setError('Từ tiếng Anh đã tồn tại');
      return;
    }
    handleAdd(english.trim(), vietnamese.trim());
    setEnglish('');
    setVietnamese('');
    setError('');
  };

  return (
    <>
  <form className="row g-2 align-items-center" onSubmit={e => { e.preventDefault(); handleSubmit(); }} style={{ margin: 0 }}>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Từ tiếng Anh"
            value={english}
            onChange={e => setEnglish(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Nghĩa tiếng Việt"
            value={vietnamese}
            onChange={e => setVietnamese(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success px-4" style={{ fontWeight: 600 }}>
            Thêm
          </button>
        </div>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
    </>
  );
};

export default AddWordForm;
