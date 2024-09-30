import React from 'react';

const ShoppingList = ({ items, onToggleItem, onDeleteItem }) => (
  <ul className="divide-y divide-gray-200">
    {items.map(item => (
      <li key={item.id} className="flex justify-between items-center py-2">
        <span
          className={`flex-grow ${item.purchased ? 'line-through text-gray-500' : ''}`}
          onClick={() => onToggleItem(item.id)}
        >
          {item.text}
        </span>
        <button
          onClick={() => onDeleteItem(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Supprimer
        </button>
      </li>
    ))}
  </ul>
);

export default ShoppingList;