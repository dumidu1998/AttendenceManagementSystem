import React from 'react'
import Navbar from '../layout/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { Button, FormGroup, FormLabel, IconButton, InputBase, OutlinedInput, Paper } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";


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
                <DataGrid rows={rows} columns={columns} pageSize={10} />
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openstudent}
                onClose={handleClosestudent}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >
                <Fade in={openstudent}>
                    <div className={classes.paper}>
                        <form onSubmit={() => alert('submitted')} autocomplete="off" >
                            <h2 id="transition-modal-title">Add New Admin</h2>
                            <FormGroup>
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Username</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Password</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <Button variant="contained" type='submit' disbled color="primary"
                                    style={{ marginTop: '30px' }}>
                                    Add Student
                                </Button>
                            </FormGroup>
                        </form>
                    </div>
                </Fade>
            </Modal>


        </div>
    )
}
