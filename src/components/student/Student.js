import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { Button, FormGroup, FormLabel, IconButton, InputBase, OutlinedInput, Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import { db } from '../../firebase'
import '../styles.css'
import { Link } from 'react-router-dom';


const columns = [
    { field: 'stuid', headerName: 'Student Reg.No', width: 180 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'contact', headerName: 'Contact No.', width: 200 },
    { field: 'batch', headerName: 'Batch', width: 200 },
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
    searchcontainer: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: '50%',
        margin: 'auto'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
}));

export default function Student() {
    const classes = useStyles();
    const [openstudent, setOpenstudent] = React.useState(false);
    const [rows, setrows] = useState([]);

    useEffect(() => {
        db.collection('students').onSnapshot(snapshot => {
            setrows(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, stuid: doc.data().stuid, contact: doc.data().contact, batch: doc.data().batch })))
        });
    }, [])

    const handleOpenstudent = () => {
        setOpenstudent(true);
    };

    const handleClosestudent = () => {
        setOpenstudent(false);
    };
    const viewmore = (params) => {
        window.open('show/' + params.row.id, '_blank').focus();  //show for student
    }
    return (
        <div className="content">
            <h1>Students</h1>
            <Navbar />
            <Paper component="form" className={classes.searchcontainer}>
                <InputBase
                    className={classes.input}
                    placeholder="Search by Name, Registration No"
                    inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                    className={classes.iconButton}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <div style={{ height: 600, marginLeft: '110px', marginTop: '10px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={100} onRowClick={viewmore} />
            </div>
        </div>
    )
}
