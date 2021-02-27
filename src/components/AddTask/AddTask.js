import { Checkmark, Plus } from '../../assets/svg';
import './addTask.css';

const AddTask = ({value, addTask, onChange, open, openField}) => {
    return (
        <>
         {open && 
            <div className="add-task">
                <input value={value} onChange={onChange} className="add-task__input" />
                <div onClick={addTask} className="add-task__button"><Checkmark/></div>
            </div>
         }
         {!open && <div onClick={openField} className="add-task__button"><Plus/></div>}
        </>
    )
}

export default AddTask;