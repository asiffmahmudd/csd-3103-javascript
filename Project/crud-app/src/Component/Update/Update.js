import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useOutletContext } from 'react-router-dom';
import { serverUrl } from '../../config';
import moment from 'moment'
import PopUp from './PopUp/PopUp';
import './Update.css'

const Update = () => {
    const [users, setUsers] = useOutletContext();

    const handleDelete = (id) => {
        fetch(serverUrl+"/users/"+id,{
            method : "DELETE"
        })
        .then(data => data.json())
        .then(res => {
            setUsers(users.filter(product => product._id !== id))
            alert(res.message)
        })
    }

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        const user = users.filter(item => item._id === id)
        setSelectedUser(user[0])
        setShow(true)
    }

    const updateUser = (newUser, id) =>{
        console.log(newUser)
        const newUsers = users.map(user => {
            if(user._id === id){
              return {...user, ...newUser}
            }
            return user
        })
        console.log(newUsers)
        setUsers(newUsers)
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