import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form";
import { serverUrl } from '../../config';

// Name:Asif Mahmud
// ID: c0837117

const UserForm = ({user, addUser, updateUser}) => {
    // using react form hook for handling form data
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // handling submit
    const onSubmit = (data) =>{
        // checking if it's for update or creating user. if there's a selected/valid user it's for update, otherwise create
        if(!user){
            handleCreate(data)
        }
        else{
            handleUpdate(data)
        }
    }

    // calling the post API for creating a user
    const handleCreate = (data) =>{
        fetch(serverUrl+"/users",{
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(res => {
            //resetting the form
            reset()
            // method for adding the user and change the UI and state
            addUser(data)
            // alert for the user
            alert(res.message)
        })
    }

    const handleUpdate = (data) =>{
        // calling the api for updating user with the selected id
        fetch(serverUrl+"/users/"+user._id,{
            method : "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(res => {
            if(res.modifiedCount > 0){
                //resetting the form
                reset()
                updateUser(data, user._id)
            }
            //message for the user
            alert(res.message)
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First name" defaultValue={user?user.firstName:""} {...register("firstName")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last name" defaultValue={user?user.lastName:""} {...register("lastName")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" placeholder="yyyy-mm-dd" defaultValue={user?user.dateOfBirth:""} {...register("dateOfBirth")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="address1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control type="text" placeholder="Address 1" defaultValue={user?user.address1:""} {...register("address1")} required/>
            </Form.Group>
            
            <Form.Group className="form-group mb-3" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control type="text" placeholder="Address 2" defaultValue={user?user.address2:""} {...register("address2")}/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" defaultValue={user?user.city:""} {...register("city")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Postal Code" defaultValue={user?user.postalCode:""} {...register("postalCode")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country" defaultValue={user?user.country:""} {...register("country")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Phone Number" defaultValue={user?user.phoneNumber:""} {...register("phoneNumber", {minLength:10, maxLength:10})} required/>
                {errors.phoneNumber && <p role="alert" style={{color:"red"}}>{errors.phoneNumber.message}Please enter a valid 10 digit phone number</p>}
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" defaultValue={user?user.email:""} {...register("email")} required/>
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="Notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Notes" defaultValue={user?user.userNotes:""} {...register("userNotes")}/>
            </Form.Group>

            <Form.Group className="mb-5">
                <Button variant="primary" className='mt-3' type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};

export default UserForm;