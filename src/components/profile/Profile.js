import React from 'react'
import Navbar from '../layout/Navbar';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import '../styles.css'
import { Button, FormGroup, FormLabel, OutlinedInput } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    card: {
        marginLeft: '150px',
        marginRight: '50px',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
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
    details: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    cover: {
        width: 250,
        height: 280
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
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
            <Card className={classes.card}>
                <Box boxShadow={3}>
                    <CardMedia
                        className={classes.cover}
                        image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        title="Live from space album cover"
                    />
                </Box>
                <div className={classes.details}>
                    <Typography component="h5" variant="h5">
                        User Details
                    </Typography>
                    <h3>Name:  Dumidu Kasun</h3>
                    <h3>Name:  Dumidu Kasun</h3>
                    <h3>Name:  Dumidu Kasun</h3>
                    <h3>Name:  Dumidu Kasun</h3>
                </div>
            </Card>
            <Button className="adminbtn" variant="contained" color="primary" onClick={handleOpenstudent} style={{ marginRight: '150px', float: 'right', display: 'block', marginTop: '30px' }}>
                Reset Password
            </Button>


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
        </div >
    )
}
