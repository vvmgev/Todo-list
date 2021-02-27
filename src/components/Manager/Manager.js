import { useState } from 'react';
import Task  from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import FireBaseService from '../../services/firebase';
import { Close } from '../../assets/svg';
import "./manager.css";

const Manager = ({close, user = {}}) => {
    const { id: userId, todos, name } = user;
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const openField = () => setOpen(!open);
    const onChange = e => setInput(e.target.value);
    const addTask = () => {
        FireBaseService.addTask(userId, input, todos);
        setInput('');
    }
    const completeTask = (complete, index) => {
        if(complete) return;
        FireBaseService.updateStatus(userId, !complete, todos, index);
    }
    todos.sort((a, b) => (a.complete < b.complete) ? 1 : -1);


    return (
        <div className="manager">
            <div className="manager-header">
                <div>
                    <AddTask openField={openField} open={open} addTask={addTask} onChange={onChange} value={input}/>
                </div>
                <div className="manager__close" onClick={close}><Close/></div>
            </div>
            <div className="manager__title">To-do list for {name}</div>
            {todos.map((task, index) => <Task task={task} index={index} completeTask={completeTask} />)}
        </div>
    )
}


export default Manager