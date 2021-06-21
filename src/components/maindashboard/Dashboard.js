import React from 'react';
import Navbar from '../layout/Navbar';
import CardContainer from '../maindashboard/CardContainer';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, FormGroup, FormLabel, OutlinedInput } from '@material-ui/core';
import '../styles.css'

const columns = [
    { field: 'id', headerName: 'Reg. No', width: 250 },
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

export default function Dashboard() {
    const classes = useStyles();
    const [openstudent, setOpenstudent] = React.useState(false);
    const [openstaff, setOpenstaff] = React.useState(false);

    const handleOpenstaff = () => {
        setOpenstaff(true);
    };

    const handleClosestaff = () => {
        setOpenstaff(false);
    };
    const handleOpenstudent = () => {
        setOpenstudent(true);
    };

    const handleClosestudent = () => {
        setOpenstudent(false);
    };

    return (
        <div className="content">
            <h1>Dashboard</h1>
            <Navbar />
            <CardContainer studentcount='100' staffcount='100' />
            <Button variant="contained" color="primary" onClick={handleOpenstudent} style={{ marginRight: '150px', marginTop: '30px' }}>
                Add Student
            </Button>

            <Button variant="contained" color="primary" onClick={handleOpenstaff} style={{ marginTop: '30px' }}>
                Add Staff
            </Button>
            <br />
            <br />
            <h2>Today Attendence</h2>
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
                    timeout: 1500,
                }}
            >
                <Fade in={openstudent}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Add New Student</h2>
                        <p id="transition-modal-description">Place the RFID card on Reader</p>
                        <form onSubmit={() => alert('submitted')}>
                            <FormGroup>
                                <FormLabel>RFID No.</FormLabel>
                                <OutlinedInput autoFocus type="tel" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Registration Number</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                {/* <FormLabel>Batch</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} /> */}
                                <Button variant="contained" type='submit' disbled color="primary"
                                    style={{ marginTop: '30px' }}>
                                    Add Student
                                </Button>
                            </FormGroup>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openstaff}
                onClose={handleClosestaff}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >
                <Fade in={openstaff}>
                    <div className={classes.paper}>
                        <form onSubmit={() => alert('submitted')}>
                            <h2 id="transition-modal-title">Add New Staff Member</h2>
                            <p id="transition-modal-description">Place the RFID card on Reader</p>
                            <FormGroup>
                                <FormLabel>RFID No.</FormLabel>
                                <OutlinedInput autoFocus type="tel" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Registration Number</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} />
                                {/* <FormLabel>Batch</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }} /> */}
                                {/* <InputLabel htmlFor="age-native-simple">Batch</InputLabel>
                                <BatchSelect value={1} /> */}
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
