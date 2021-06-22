import React from 'react'
import Navbar from '../layout/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { Button, FormGroup, FormLabel, OutlinedInput } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

import '../styles.css'


const columns = [
    { field: 'id', headerName: 'Admin Id', width: 250 },
    { field: 'firstName', headerName: 'Name', width: 200 },
    { field: 'lastName', headerName: 'Batch', width: 200 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 190,
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: 'dumidu', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Admin() {
    const classes = useStyles();

    const [openstudent, setOpenstudent] = React.useState(false);


    const handleOpenstudent = () => {
        setOpenstudent(true);
    };

    const handleClosestudent = () => {
        setOpenstudent(false);
    };

    return (
        <div className="content">
            <h1>Profile Settings</h1>
            <Navbar />
            <Button className="adminbtn" variant="contained" color="primary" onClick={handleOpenstudent} style={{ marginLeft: '150px', display: 'block', marginTop: '30px' }}>
                Add Admin
            </Button>
            <div style={{ height: 600, marginLeft: '110px', marginTop: '10px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} />
            </div>
        </div>
    )
}
