import React, { useState } from 'react';

interface EditWordModalProps {
  show: boolean;
  english: string;
  vietnamese: string;
  handleClose: () => void;
  handleSave: (english: string, vietnamese: string) => void;
  existingWords: string[];
}

const EditWordModal: React.FC<EditWordModalProps> = ({ show, english: initialEnglish, vietnamese: initialVietnamese, handleClose, handleSave, existingWords }) => {
  const [english, setEnglish] = useState(initialEnglish);
  const [vietnamese, setVietnamese] = useState(initialVietnamese);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setEnglish(initialEnglish);
    setVietnamese(initialVietnamese);
    setError('');
  }, [show, initialEnglish, initialVietnamese]);

  const handleModalSave = () => {
    if (!english.trim() || !vietnamese.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (existingWords.includes(english.trim().toLowerCase()) && english.trim().toLowerCase() !== initialEnglish.toLowerCase()) {
      setError('Từ tiếng Anh đã tồn tại');
      return;
    }
  handleSave(english.trim(), vietnamese.trim());
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sửa từ vựng</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              value={english}
              onChange={e => setEnglish(e.target.value)}
              placeholder="Từ tiếng Anh"
            />
            <input
              type="text"
              className="form-control"
              value={vietnamese}
              onChange={e => setVietnamese(e.target.value)}
              placeholder="Nghĩa tiếng Việt"
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Hủy</button>
            <button type="button" className="btn btn-primary" onClick={handleModalSave}>Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWordModal;
