import { useEffect, useState } from 'react';
import FireBaseService from '../../services/firebase';
import './table.css';


const Table = ({selectUser, selectedUser}) => {
    const [users, setUsers] = useState([]);
    const subscribe = () => {
        FireBaseService.onChange(setUsers)
    };

    useEffect(() => {
        // to keep reference of selected user
        users.forEach(user => {
            if(user.id === selectedUser?.id) {
                selectUser(user);
            }
        })
    // eslint-disable-next-line
    }, [users, selectedUser])

    useEffect(() => {
        (async function(){
            const users = await FireBaseService.getAllUsers();
            setUsers(users);
            subscribe()
        })()
    }, []);



    const calculateCompletionRate = (todos) => {
        const count = todos.length;
        let completeTask = 0;
        todos.forEach(task => task.complete && completeTask++);
        return ((completeTask / count) * 100).toFixed(0);
    }


    return (
            <div className="table">
                <div className="table-header">
                    <div>Name</div>
                    <div>Completion rate (%)</div>
                </div>
                <div className="table-body">
                    {
                        users.map(user => (
                            <div className={`table-body__row ${user === selectedUser && 'table-body__row_selected'}`}
                                key={user.id}
                                onClick={() => selectUser(user)}>
                                <div>{user.name}</div>
                                <div>{calculateCompletionRate(user.todos)} %</div>
                            </div>
                        ))

                    }
                </div>
            </div>
    )

}

export default Table;