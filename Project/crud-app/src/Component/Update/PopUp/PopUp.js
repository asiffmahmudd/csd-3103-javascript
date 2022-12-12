import React from 'react';
import Modal from 'react-bootstrap/Modal';
import UserForm from '../../UserForm/UserForm';

const PopUp = ({show, handleClose, updateUser, user}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm user={user} updateUser={updateUser}/>
            </Modal.Body>
        </Modal>
    );
};

export default PopUp;