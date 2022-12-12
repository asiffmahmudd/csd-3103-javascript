import React from 'react';
import { useOutletContext } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import './Create.css'

const Create = () => {
    const [users, setUsers] = useOutletContext();

    const addUser = (user) =>{
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