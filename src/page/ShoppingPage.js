import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Assurez-vous que votre configuration Firebase est correcte
import Navbar from '../components/NavBar';
import ShoppingList from '../components/ShoppingList'; // Nouveau composant pour la liste de courses
import ShoppingForm from '../components/ShoppingForm'; // Nouveau composant pour ajouter des articles

function ShoppingPage() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'shoppingItems'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setShoppingItems(itemList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const addShoppingItem = async (text) => {
    await addDoc(collection(db, 'shoppingItems'), {
      text,
      purchased: false,
      createdAt: new Date()
    });
  };

  const toggleShoppingItem = async (id) => {
    const itemRef = doc(db, 'shoppingItems', id);
    const item = shoppingItems.find(i => i.id === id);
    await updateDoc(itemRef, {
      purchased: !item.purchased
    });
  };

  const deleteShoppingItem = async (id) => {
    await deleteDoc(doc(db, 'shoppingItems', id));
  };

  const ShoppingComponent = () => (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Ma Liste de Courses</h1>
      <ShoppingForm onAddItem={addShoppingItem} />
      <ShoppingList items={shoppingItems} onToggleItem={toggleShoppingItem} onDeleteItem={deleteShoppingItem} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <ShoppingComponent />
      <Navbar />
    </div>
  );
}

export default ShoppingPage;