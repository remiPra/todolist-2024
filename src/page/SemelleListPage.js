import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/NavBar';

function SemelleListPage() {
  const [semelles, setSemelles] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'semelles'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSemelles(itemList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const addShoppingItem = async (text) => {
    await addDoc(collection(db, 'semelles'), {
      text,
      purchased: false,
      createdAt: new Date()
    });
  };

  const toggleShoppingItem = async (id) => {
    const itemRef = doc(db, 'semelles', id);
    const item = semelles.find(i => i.id === id);
    await updateDoc(itemRef, {
      purchased: !item.purchased
    });
  };

  const deleteShoppingItem = async (id) => {
    await deleteDoc(doc(db, 'semelles', id));
  };

  const editShoppingItem = async (id, newText) => {
    const itemRef = doc(db, 'semelles', id);
    await updateDoc(itemRef, {
      text: newText
    });
    setEditingItem(null);
  };

  const startEditing = (item) => {
    setEditingItem(item);
  };

  const SemelleForm = ({ onAddItem, editingItem, onEditItem }) => {
    const [text, setText] = useState('');
  
    useEffect(() => {
      if (editingItem) {
        setText(editingItem.text);
      } else {
        setText('');
      }
    }, [editingItem]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (text.trim()) {
        if (editingItem) {
          onEditItem(editingItem.id, text);
        } else {
          onAddItem(text);
        }
        setText('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editingItem ? "Modifier la semelle" : "Ajouter une nouvelle semelle"}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
          {editingItem ? "Modifier" : "Ajouter"}
        </button>
      </form>
    );
  };

  const SemelleList = ({ items, onToggleItem, onDeleteItem, onEditItem }) => (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <span className={item.purchased ? 'line-through' : ''}>{item.text}</span>
          <div>
            <button onClick={() => onToggleItem(item.id)} className="mr-2 text-blue-500">
              {item.purchased ? 'Annuler' : 'Acheter'}
            </button>
            <button onClick={() => onEditItem(item)} className="mr-2 text-yellow-500">
              Modifier
            </button>
            <button onClick={() => onDeleteItem(item.id)} className="text-red-500">
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Ma Liste des semelles</h1>
        <SemelleForm
          onAddItem={addShoppingItem}
          editingItem={editingItem}
          onEditItem={editShoppingItem}
        />
        <SemelleList
          items={semelles}
          onToggleItem={toggleShoppingItem}
          onDeleteItem={deleteShoppingItem}
          onEditItem={startEditing}
        />
      </div>
      <Navbar />
    </div>
  );
}

export default SemelleListPage;