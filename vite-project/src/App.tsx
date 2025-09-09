import React, { useState, useEffect } from 'react';
import AddWordForm from './components/AddWordForm';
import VocabularyTable from './components/VocabularyTable';
import EditWordModal from './components/EditWordModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { FaBook, FaPlusCircle, FaList } from 'react-icons/fa';

interface Vocabulary {
  english: string;
  vietnamese: string;
}

const LOCAL_KEY = 'vocabularies';
const DEFAULT_VOCABS: Vocabulary[] = [
  { english: 'Apple', vietnamese: 'Quả táo' },
  { english: 'Book', vietnamese: 'Sách' },
  { english: 'Computer', vietnamese: 'Máy tính' },
  { english: 'Hello', vietnamese: 'Xin chào' },
];

const App: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(() => {
    const data = localStorage.getItem(LOCAL_KEY);
    return data ? JSON.parse(data) : DEFAULT_VOCABS;
  });

  const pagedVocabularies = vocabularies;

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(vocabularies));
  }, [vocabularies]);

  const handleAdd = (english: string, vietnamese: string) => {
    setVocabularies([
      ...vocabularies,
      { english, vietnamese }
    ]);
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setShowEdit(true);
  };
  const handleUpdate = (english: string, vietnamese: string) => {
    if (editIdx === null) return;
    setVocabularies(vocabularies.map((v, i) => i === editIdx ? { english, vietnamese } : v));
    setShowEdit(false);
    setEditIdx(null);
  };

  const handleDelete = (idx: number) => {
    setDeleteIdx(idx);
    setShowDelete(true);
  };
  const confirmDelete = () => {
    if (deleteIdx === null) return;
    setVocabularies(vocabularies.filter((_, i) => i !== deleteIdx));
    setShowDelete(false);
    setDeleteIdx(null);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ background: '#388e3c', color: 'white', padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
      <FaBook style={{ fontSize: 32 }} />
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 32 }}>Quản Lý Từ Vựng</h2>
      </div>
      <div className="container py-4">
        <div className="card mb-4">
          <div className="card-header bg-white d-flex align-items-center" style={{ fontWeight: 600, fontSize: 20, color: '#388e3c' }}>
        <FaPlusCircle className="me-2" /> Thêm từ mới
          </div>
          <div className="card-body pt-3 pb-3">
            <AddWordForm
              handleAdd={handleAdd}
              existingWords={vocabularies.map(v => v.english.toLowerCase())}
            />
          </div>
        </div>

        <div style={{ background: 'white', border: 'none', borderRadius: 8, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div className="d-flex align-items-center" style={{ fontWeight: 600, fontSize: 20, color: '#388e3c', padding: '16px 24px 0 24px' }}>
            <FaList className="me-2" /> Danh sách từ vựng
          </div>
          <div style={{ padding: 24, paddingTop: 8 }}>
            <VocabularyTable
              vocabularies={pagedVocabularies}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {editIdx !== null && (
        <EditWordModal
          show={showEdit}
          english={vocabularies[editIdx].english}
          vietnamese={vocabularies[editIdx].vietnamese}
          handleClose={() => setShowEdit(false)}
          handleSave={handleUpdate}
          existingWords={vocabularies.map((v, i) => i !== editIdx ? v.english.toLowerCase() : '')}
        />
      )}
      
      {deleteIdx !== null && (
        <ConfirmDeleteModal
          show={showDelete}
          word={vocabularies[deleteIdx]?.english || ''}
          handleClose={() => setShowDelete(false)}
          handleConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default App;