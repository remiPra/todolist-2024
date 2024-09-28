import React from 'react';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center bg-white p-2 rounded shadow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="mr-2"
          />
          <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
          </span>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;