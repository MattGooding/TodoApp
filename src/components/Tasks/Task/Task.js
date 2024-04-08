import './Task.scss';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

function Task(props) {

  // Toggles the task status.
  const handleStatusClick = () => {
    const id = props.task.id;
    props.onStatusChange(id);
  }

  // Removes the task.
  const handleRemoveClick = () => {
    const id = props.task.id;
    props.onTaskRemove(id);
  }

  return (
    <div className='task-component'>
      <div className='content'>
        <h3>{props.task.description}</h3>
        <div className='id'>Id: {props.task.id}</div>
        <div className='status'>
          Status:
          {props.task.done
            ? <u>Completed</u>
            : <i>Open</i>
          }
        </div>
      </div>
      
      {/* Buttons */}
      <div className='control'>
        <button onClick={handleStatusClick} className='status'>
          {props.task.done
            ? <BsToggleOn />
            : <BsToggleOff />
          }
          Change Status
        </button>
        <button onClick={handleRemoveClick} className='remove'>
          <MdOutlineDeleteSweep />Remove Task
        </button>
      </div>
    </div>
  );
}

export default Task;
