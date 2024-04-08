import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import Footer from "./components/Footer/Footer";
import Add from "./components/Help/Add/Add";
import Help from "./components/Help/Help/Help";
import Remove from "./components/Help/Remove/Remove";
import Change from "./components/Help/Change/Change";
import { Routes, Route, Outlet } from "react-router-dom";
import { firestore } from "./firebase";
import { collection, onSnapshot, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Reference to the 'tasks' collection
    const tasksCollectionRef = collection(firestore, "tasks");

    // Subscribe to changes in the 'tasks' collection
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        // Extract data from each document
        const task = {
          id: doc.id,
          ...doc.data()
        };
        tasksData.push(task);
      });
      // Set the tasks in the state
      setTasks(tasksData);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Dependency array to ensure the effect runs only once

  // Function to change the status of a task in Firestore
  const handleStatusChange = async (id) => {
    const taskDocRef = doc(firestore, "tasks", id);
    const taskSnapshot = await getDoc(taskDocRef);
    if (taskSnapshot.exists()) {
      await updateDoc(taskDocRef, {
        done: !taskSnapshot.data().done // Toggle the done status
      });
    }
  };

  // Function to remove a task from Firestore
  const handleTaskRemove = async (id) => {
    const taskDocRef = doc(firestore, "tasks", id);
    await deleteDoc(taskDocRef);
  };

  // Function to clear all tasks from Firestore
  const handleClearTasks = async () => {
    const tasksCollectionRef = collection(firestore, "tasks");
    const snapshot = await getDocs(tasksCollectionRef);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };


  const handleAddTask = (description, status) => {
    // Add the task to Firestore
    const taskData = {
      description: description,
      done: status
    };

    firestore.collection("tasks").add(taskData)
      .then(() => {
        // Task added successfully
      })
      .catch((error) => {
        console.error("Error adding task: ", error);
      });
  }


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<main className="page">
          <Tasks
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onTaskRemove={handleTaskRemove}
            onClearTasks={handleClearTasks}
          />
        </main>} />
        <Route path="/add" element={<main className="page">
          <Form
            onAddTask={handleAddTask}
          />
        </main>} />
        <Route path="/help" element={<main className="page column">

          <Outlet /> {/* This will render nested routes */}
        </main>}>
          <Route path="" element={<main className="page">
            <Help />
          </main>} />
          <Route path="add" element={<main className="page">
            <Add />
          </main>} />
          <Route path="remove" element={<main className="page">
            <Remove />
          </main>} />
          <Route path="change" element={<main className="page">
            <Change />
          </main>} />
        </Route>

        <Route path="*" element={<main className="page not-found">
          <h2>Page Not Found</h2>
        </main>} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;
