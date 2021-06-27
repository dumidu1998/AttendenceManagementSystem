import React from 'react'
import Navbar from '../layout/Navbar'
import { DataGrid } from '@material-ui/data-grid';
import Deletebtn from '../tableButtons/Deletebtn';

import '../styles.css'



const columns = [
    { field: 'id', headerName: 'Admin Username', width: 250 },
    { field: 'firstName', headerName: 'Admin Email', width: 200 },
    { field: 'lastName', headerName: 'Full Name', width: 200 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 190,
    // },
    {
        field: 'age',
        headerName: 'Action',
        width: 190,
        renderCell: Deletebtn,
        disbleClickEventBubbling: true
    }
];

const rows = [
    { id: 1, lastName: 'aaaa', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: 'dumidu', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
export default function Request() {
    return (
        <div className="content">
            <h1>Attendence Requests</h1>
            <Navbar />
            <div style={{ height: 600, marginLeft: '110px', marginTop: '10px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} />
            </div>
        </div>
    )
}
