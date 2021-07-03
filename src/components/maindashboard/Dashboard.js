import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import CardContainer from '../maindashboard/CardContainer';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import BatchSelect from './BatchSelect';
import { Button, FormGroup, FormLabel, OutlinedInput } from '@material-ui/core';
import '../styles.css'
import { db } from '../../firebase';

const columns = [
    { field: 'id', headerName: 'Reg. No', width: 250 },
    { field: 'firstName', headerName: 'Name', width: 200 },
    { field: 'lastName', headerName: 'Batch', width: 200 },
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

    const [srfid, setsrfid] = useState('');
    const [sid, setsid] = useState('');
    const [sname, setsname] = useState('');
    const [saddress, setsaddress] = useState('');
    const [semail, setsemail] = useState('');
    const [scontact, setscontact] = useState('');
    const [sdob, setsdob] = useState('');


    const [batch, setbatch] = useState('');
    const [frfid, setfrfid] = useState('');
    const [fid, setfid] = useState('');
    const [fname, setfname] = useState('');
    const [faddress, setfaddress] = useState('');
    const [femail, setfemail] = useState('');
    const [fcontact, setfcontact] = useState('');
    const [fdob, setfdob] = useState('');



    const addStudent = (event) => {
        event.preventDefault();
        db.collection('students').add({
            rfid: frfid,
            stuid: fid,
            name: fname,
            address: faddress,
            email: femail,
            contact: fcontact,
            dob: new Date(fdob),
            batch: batch
        })
        db.collection('rfids').add({
            rfid: frfid,
            type: 'student',
            id: fid
        })
        handleClosestudent();
        alert("Student added Sucessfully");
        setfrfid('')
        setfid('')
        setfname('')
        setfaddress('')
        setfemail('')
        setfcontact('')
        setfdob('')
        setbatch('')
    }

    const addStaff = (event) => {
        event.preventDefault();
        db.collection('staff').add({
            rfid: srfid,
            staffid: sid,
            name: sname,
            address: saddress,
            email: semail,
            contact: scontact,
            dob: new Date(sdob)
        })
        db.collection('rfids').add({
            rfid: srfid,
            type: 'staff',
            id: sid
        })
        handleClosestaff();
        alert("Staff added Sucessfully");
        setsrfid('')
        setsid('')
        setsname('')
        setsaddress('')
        setsemail('')
        setscontact('')
        setsdob('')
    }
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

    const [today, settoday] = useState([]);
    const [dataa, setdataa] = useState('');

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    useEffect(() => {
        db.collection('studentAttendence').where('date', '>=', startOfDay).onSnapshot(snapshot => {
            settoday(snapshot.docs.map(doc => ({ id: doc.id, stid: doc.data().id })));
        });
    }, [])

    useEffect(() => {
        today.forEach(async id => {
            const data = db.collection('students').where('stuid', '==', id.stid);
            const newdata = await data.get();
            setdataa(newdata.data());
        })
    }, [])
    //TODO get list 

    return (
        <div className="content">
            <h1>Dashboard</h1>
            <Navbar />
            <CardContainer studentcount='5' staffcount='2' />
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
                        <form
                            onSubmit={addStudent}
                        >
                            <FormGroup>
                                <FormLabel>RFID No.</FormLabel>
                                <OutlinedInput autoFocus type="tel" value={frfid} onChange={(e) => setfrfid(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Student Reg. No</FormLabel>
                                <OutlinedInput type="text" value={fid} onChange={(e) => setfid(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" value={fname} onChange={(e) => setfname(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Batch</FormLabel>
                                <BatchSelect setvalue={setbatch} />
                                <FormLabel>DOB</FormLabel>
                                <OutlinedInput type="date" value={fdob} onChange={(e) => setfdob(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Address</FormLabel>
                                <OutlinedInput type="text" value={faddress} onChange={(e) => setfaddress(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput type="text" value={femail} onChange={(e) => setfemail(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Contact No.</FormLabel>
                                <OutlinedInput type="text" value={fcontact} onChange={(e) => setfcontact(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />

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
                        <form
                            onSubmit={addStaff}
                        >
                            <h2 id="transition-modal-title">Add New Staff Member</h2>
                            <p id="transition-modal-description">Place the RFID card on Reader</p>
                            <FormGroup>
                                <FormLabel>RFID No.</FormLabel>
                                <OutlinedInput autoFocus type="tel" value={srfid} onChange={(e) => setsrfid(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Staff ID</FormLabel>
                                <OutlinedInput type="text" value={sid} onChange={(e) => setsid(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" value={sname} onChange={(e) => setsname(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>DOB</FormLabel>
                                <OutlinedInput type="date" value={sdob} onChange={(e) => setsdob(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Address</FormLabel>
                                <OutlinedInput type="text" value={saddress} onChange={(e) => setsaddress(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput type="text" value={semail} onChange={(e) => setsemail(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />
                                <FormLabel>Contact No.</FormLabel>
                                <OutlinedInput type="text" value={scontact} onChange={(e) => setscontact(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />

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
