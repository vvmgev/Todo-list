import { Pending, Checkmark } from '../../assets/svg';
import './task.css';

const getStatus = complete => complete ? <><Checkmark/> Complete</> : <><Pending/>Pending</>

const Task = ({task, index, completeTask}) => {
    return (
            <div className="task">
                <div className="task__info">
                    <div className={`task__status ${task.complete ? 'task__status_complete' : 'task__status_pending'}`}>{getStatus(task.complete)}</div>
                    <div className="task__text">{task.text}</div>
                </div>
                <div onClick={()=> completeTask(task.complete, index)} className={`task__button ${task.complete && 'task__button_disable'}`}
                >Mark as done</div> 
            </div>
    )
}

export default Task;