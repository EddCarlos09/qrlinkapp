import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaEdit, FaTimes } from 'react-icons/fa';

const FolderCard = ({ id, name, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newName.trim() && newName !== name) {
      onEdit({ id, folderName: newName });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setNewName(name);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-4 border rounded shadow hover:shadow-md transition group">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Eliminar"
      >
        <FaTimes />
      </button>

      <Link to={`/folder/${id}`} className="text-yellow-500 hover:opacity-80">
        <FaFolder className="text-6xl mb-2" />
      </Link>

      <div className="flex items-center space-x-2">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="border-b border-gray-400 focus:outline-none px-1 text-center"
          />
        ) : (
          <>
            <span className="font-medium truncate max-w-[120px]">{name}</span>
            <button
              onClick={handleEditClick}
              className="text-blue-500 hover:text-blue-700"
              title="Editar nombre"
            >
              <FaEdit />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FolderCard;
