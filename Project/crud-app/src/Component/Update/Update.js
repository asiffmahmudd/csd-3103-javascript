import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useOutletContext } from 'react-router-dom';
import { serverUrl } from '../../config';
import moment from 'moment'
import PopUp from './PopUp/PopUp';
import './Update.css'

// Name:Asif Mahmud
// ID: c0837117

const Update = () => {
    //getting the variable for stored user list from outlet context
    const [users, setUsers] = useOutletContext();

    // deleting data from the database using DELETE method
    const handleDelete = (id) => {
        fetch(serverUrl+"/users/"+id,{
            method : "DELETE"
        })
        .then(data => data.json())
        .then(res => {
            // changing the UI based on user list
            setUsers(users.filter(product => product._id !== id))
            alert(res.message)
        })
    }

    // variable for showing the pop up modal
    const [show, setShow] = useState(false);
    // variable for populating the pop up form on the modal
    const [selectedUser, setSelectedUser] = useState({})
    // method for closing the modal
    const handleClose = () => setShow(false);
    //method for showing the modal
    const handleShow = (id) => {
        //getting the user for populating the form with user data
        const user = users.filter(item => item._id === id)
        //changing state with selected user data
        setSelectedUser(user[0])
        //showing the modal
        setShow(true)
    }

    //method for updating user with new data
    const updateUser = (newUser, id) =>{
        //variable for new user list
        const newUsers = users.map(user => {
            // checking which user is being updated and setting the updated info
            if(user._id === id){
              return {...user, ...newUser}
            }
            // if it's not the selected user, returning the user
            return user
        })
        //changing the state with updated user info
        setUsers(newUsers)
        //closing the modal
        handleClose()
    }

    return (
        <div className='update bg-dark'>
            <div className="container">
                <div className='row d-flex justify-content-center'>
                    <Table striped bordered hover variant="dark" responsive size="lg" className='mt-4'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Birthday</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>City</th>
                                <th>Zip</th>
                                <th>Country</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => 
                                    <tr key={user._id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{moment(user.dateOfBirth).format('YYYY-MM-DD')}</td>
                                        <td>{user.address1}</td>
                                        <td>{user.address2}</td>
                                        <td>{user.city}</td>
                                        <td>{user.postalCode}</td>
                                        <td>{user.country}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userNotes}</td>
                                        <td>
                                            <button className='btn btn-primary mb-2' onClick={() =>handleShow(user._id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <PopUp show={show} handleClose={handleClose} user={selectedUser} updateUser={updateUser}/>
                </div>
            </div>
        </div>
    );
};

export default Update;