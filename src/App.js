import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebase';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import VoiceInput from './components/VoiceInput';
import Navbar from './components/NavBar';

// Importez ou créez ces composants

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Accueil</h1>
      <p>Bienvenue sur votre application To-Do!</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profil</h1>
      <p>Voici votre page de profil.</p>
    </div>
  );
}


function Settings() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Réglages</h1>
      <p>Gérez vos paramètres ici.</p>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const addTask = async (text) => {
    await addDoc(collection(db, 'tasks'), {
      text,
      completed: false,
      createdAt: new Date()
    });
  };

  const toggleTask = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    const task = tasks.find(t => t.id === id);
    await updateDoc(taskRef, {
      completed: !task.completed
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const TodoComponent = () => (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Ma To-Do List PWA</h1>
      <VoiceInput onTaskAdded={addTask} />
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
    </div>
  );

  return (
    <Router>
      <div className="pb-16"> {/* Add padding to the bottom to account for the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;