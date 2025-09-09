import React from 'react';

interface Vocabulary {
  english: string;
  vietnamese: string;
}

interface VocabularyTableProps {
  vocabularies: Vocabulary[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}
import { FaEdit, FaTrash} from 'react-icons/fa';

const VocabularyTable: React.FC<VocabularyTableProps> = ({ vocabularies, handleEdit, handleDelete }) => {
  return (
    <table className="table table-bordered mb-0">
      <thead>
        <tr>
          <th style={{ minWidth: 180 }}>Từ tiếng Anh</th>
          <th style={{ minWidth: 180 }}>Nghĩa tiếng Việt</th>
          <th style={{ minWidth: 120 }}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {vocabularies.map((vocab, idx) => (
          <tr key={idx}>
            <td>{vocab.english}</td>
            <td>{vocab.vietnamese}</td>
            <td>
              <button className="btn btn-primary me-2" onClick={() => handleEdit(idx)}>
                <FaEdit className="me-1" /> Sửa
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(idx)}>
                <FaTrash className="me-1" /> Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VocabularyTable;
