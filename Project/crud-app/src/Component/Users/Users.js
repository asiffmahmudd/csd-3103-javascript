import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './Users.css'
import { useOutletContext } from 'react-router-dom';

const Users = () => {
    const [users] = useOutletContext();
    const [rowData, setRowData] = useState(users); 
    const [columnDefs] = useState([
        {field: 'firstName', filter: true},
        {field: 'lastName', filter: true},
        {field: 'dateOfBirth'},
        {field: 'address1'},
        {field: 'address2'},
        {field: 'city'},
        {field: 'postalCode'},
        {field: 'country'},
        {field: 'phoneNumber'},
        {field: 'email'},
        {field: 'userNotes'}
        
      ]);
    
    useEffect(() => {
        setRowData(users)
    }, [users])

    return (
        <div className='users bg-dark' style={{minHeight:"100vh"}}>
            <div className='container'>
                <div className='row'>
                    {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                    <div className="ag-theme-alpine-dark col-md-12" style={{width: "100%", minHeight:"88vh"}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;