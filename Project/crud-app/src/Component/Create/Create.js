import React from 'react';
import { useOutletContext } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import './Create.css'

// Name:Asif Mahmud
// ID: c0837117

const Create = () => {
    //getting the variable for stored user list from outlet context
    const [users, setUsers] = useOutletContext();

    //updating the UI based on user list
    const addUser = (user) =>{
        //adding the user to the list and updating the state
        const newList = [...users, user]
        setUsers(newList)
    }
    return (
        <div className='create bg-dark'>
            <div className="container">
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <UserForm user={null} addUser={addUser}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;