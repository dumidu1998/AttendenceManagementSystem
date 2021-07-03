import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { Button, FormGroup, FormLabel, OutlinedInput } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import '../styles.css'
import Deletebtn from '../tableButtons/Deletebtn';
import { db } from '../../firebase';


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

    const [fullname, setfullname] = useState('')
    const [email, setemail] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const handleOpenstudent = () => {
        setOpenstudent(true);
    };

    const handleClosestudent = () => {
        setOpenstudent(false);
    };

    const [admins, setadmins] = useState([]);

    useEffect(() => {
        db.collection('admins').onSnapshot(snapshot => {
            setadmins(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, username: doc.data().username, email: doc.data().email })))
        });

    }, [])


    function addnew(e) {
        e.preventDefault();
        db.collection('admins').add({
            name: fullname,
            email: email,
            password: password,
            username: username
        })
        handleClosestudent();
        alert("New Admin Added")
        // setbatchName('');
        setfullname('');
        setemail('');
        setpassword('');
        setusername('');
    }

    return (
        <div className="content">
            <h1>Admin List</h1>
            <Navbar />
            <Button className="adminbtn" variant="contained" color="primary" onClick={handleOpenstudent} style={{ marginLeft: '150px', display: 'block', marginTop: '30px' }}>
                Add Admin
            </Button>
            <List >
                <ListItem className="listContent">
                    <ListItemText
                        primary="Full Name"
                    />
                    <ListItemText
                        primary="Username"
                    />
                    <ListItemText
                        primary="email"
                    />
                    <ListItemSecondaryAction>
                    </ListItemSecondaryAction>
                </ListItem>
                {admins.map(batch => (
                    <ListItem className="listContent">
                        <ListItemText
                            primary={batch.name}
                        />
                        <ListItemText
                            primary={batch.username}
                        />
                        <ListItemText
                            primary={batch.email}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="delete" onClick={event => db.collection('admins').doc(batch.id).delete()}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

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
                        <form onSubmit={addnew} autocomplete="off" >
                            <h2 id="transition-modal-title">Add New Admin</h2>
                            <FormGroup>
                                <FormLabel>Full Name</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }}
                                    value={fullname} onChange={(e) => setfullname(e.target.value)} />
                                <FormLabel>Username</FormLabel>
                                <OutlinedInput type="text" required style={{ height: '30px', marginBottom: '10px' }}
                                    value={username} onChange={(e) => setusername(e.target.value)} />
                                <FormLabel>Email</FormLabel>
                                <OutlinedInput type="email" required style={{ height: '30px', marginBottom: '10px' }}
                                    value={email} onChange={(e) => setemail(e.target.value)} />
                                <FormLabel>Password</FormLabel>
                                <OutlinedInput type="text" autocomplete="off" required style={{ height: '30px', marginBottom: '10px' }}
                                    value={password} onChange={(e) => setpassword(e.target.value)} />
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
