import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Component/Header/Header';
import { serverUrl } from './config';

// Name:Asif Mahmud
// ID: c0837117

function App() {
  const [users, setUsers] = useState([]) //variable for storing user list data

  //using useeffect hook to fetch data from the database
  useEffect(() => {
    fetch(serverUrl+'/users',{
      method : "GET"
    })
    .then(data => data.json())
    .then(json => {
        setUsers(json.users)
    })
  }, [setUsers]) // this dependency determines changes in UI

  return (
    <div className="App bg-dark">
      <Header/>
      <div id="users">
        {/* body of the web app */}
        <Outlet context={[users, setUsers]}/> 
      </div>
    </div>
  );
}

export default App;
