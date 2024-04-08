import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import './Form.scss';
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";

const convertStatusToBoolean = (status) => {
  return status === 'completed' ? true : false;
};


function Form({ onAddTask }) {
  const ref = collection(firestore, "tasks");

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (description === '') {
      setErrorMessage('Enter a description.');
    } else {
      try {
        // Convert status to boolean
        const doneStatus = convertStatusToBoolean(status);

        // Add the task to Firestore
        const docRef = await addDoc(ref, {
          description: description,
          done: doneStatus
        });
        // Get the ID of the added document
        const taskId = docRef.id;
        // Notify the parent component about the addition
        onAddTask(description, doneStatus, taskId);
        // Reset the form state
        setDescription('');
        setStatus('open');
        setErrorMessage('');
      } catch (error) {
        console.error("Error adding task: ", error);
        // Handle error, if any
      }
    }
  }

  return (
    <form className='form-component' onSubmit={handleFormSubmission}>
      <h2>Add a new task:</h2>

      <div className='content'>
        {/* Conditional render of the error message */}
        {errorMessage !== '' && (
          <div className='error-message'>{errorMessage}</div>
        )}

        {/* Description Field */}
        <label>
          <span>Description:</span>
          <input
            type='text'
            maxLength={150}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        {/* Status Field */}
        <label>
          <span>Status:</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value='open'>Open</option>
            <option value='completed'>Completed</option>
          </select>
        </label>

        {/* Submission Button */}
        <button>
          <IoMdAddCircle /> Add
        </button>
      </div>
    </form>
  );
}

export default Form;