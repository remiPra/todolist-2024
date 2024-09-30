import React, { useState } from 'react';

const ShoppingForm = ({ onAddItem }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter un article"
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
        Ajouter
      </button>
    </form>
  );
};

export default ShoppingForm;