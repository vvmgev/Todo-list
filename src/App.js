import { useState } from 'react';
import Table from "./components/Table/Table";
import Manager from "./components/Manager/Manager";
import "./app.css";

function App() {
  const [selectedUser, setSelectedUser] = useState();
  const close = () => setSelectedUser(null);

  return (
    <div className="app">
      <Table selectUser={setSelectedUser} selectedUser={selectedUser}/>
      {selectedUser && <Manager close={close} user={selectedUser} />}
    </div>
  );
}

export default App;
