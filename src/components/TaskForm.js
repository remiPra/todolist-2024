import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Ajouter une nouvelle tâche"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;