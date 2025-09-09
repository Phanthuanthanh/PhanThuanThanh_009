import React from 'react';

interface ConfirmDeleteModalProps {
  show: boolean;
  word: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, word, handleClose, handleConfirm }) => {
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận xóa</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>Bạn có chắc chắn muốn xóa từ {word} không?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Hủy</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
