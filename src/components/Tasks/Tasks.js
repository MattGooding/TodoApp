import Task from './Task/Task';
import './Tasks.scss';
import { MdDelete } from "react-icons/md";

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
  return (
    <div className='tasks-component'>
      <h2>These are the tasks:</h2>

      {/* Renders each task. */}
      {tasks.map(
        (task, index) => (
          <Task
            key={index}
            task={task}
            onStatusChange={onStatusChange}
            onTaskRemove={onTaskRemove}
          />
        )
      )}

      {/* Remove Button */}
      <button className='clear-tasks' onClick={onClearTasks}>
        <MdDelete />Clear Tasks
      </button>
    </div>
  );
}

export default Tasks;
