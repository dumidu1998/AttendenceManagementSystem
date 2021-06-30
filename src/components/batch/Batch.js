import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { Button, FormGroup, FormLabel, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles.css'
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

    const [batchName, setbatchName] = useState('');

    const handleOpenstudent = () => {
        setOpenstudent(true);
    };

    const handleClosestudent = () => {
        setOpenstudent(false);
    };

    const addbatch = (e) => {
        e.preventDefault();
        db.collection('batch').add({
            name: batchName
        })
        handleClosestudent();
        alert("New Batch Added")
        setbatchName('');
    }
    const [batches, setbatches] = useState([]);

    useEffect(() => {
        db.collection('batch').onSnapshot(snapshot => {
            setbatches(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })))
        });

    }, [])

    return (
        <div className="content">
            <h1>Batch List</h1>
            <Navbar />

            <Button className="adminbtn" variant="contained" color="primary" onClick={handleOpenstudent} style={{ marginLeft: '150px', display: 'block', marginTop: '30px' }}>
                Add new batch
            </Button>

            <List >
                {batches.map(batch => (
                    <ListItem className="listContent">
                        <ListItemText
                            primary={batch.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="start" aria-label="delete" onClick={event => db.collection('batch').doc(batch.id).delete()}>
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
                        <form onSubmit={addbatch} autocomplete="off" >
                            <h2 id="transition-modal-title">Add New Batch</h2>
                            <FormGroup>
                                <FormLabel>Batch Name</FormLabel>
                                <OutlinedInput type="text" autoFocus value={batchName} onChange={(e) => setbatchName(e.target.value)} required style={{ height: '30px', marginBottom: '10px' }} />

                                <Button variant="contained" type='submit' disbled color="primary"
                                    style={{ marginTop: '30px' }}>
                                    Add Batch
                                </Button>
                            </FormGroup>
                        </form>
                    </div>
                </Fade>
            </Modal>


        </div>
    )
}