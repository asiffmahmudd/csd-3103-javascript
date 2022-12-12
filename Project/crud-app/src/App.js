import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import { serverUrl } from './config';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(serverUrl+'/users',{
      method : "GET"
    })
    .then(data => data.json())
    .then(json => {
        setUsers(json.users)
    })
  }, [setUsers])

  return (
    <div className="App bg-dark">
      <Header/>
      <div id="users">
        <Outlet context={[users, setUsers]}/>
      </div>
    </div>
  );
}

export default App;
