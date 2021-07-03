import React, { useState } from 'react'
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
import { db } from '../../firebase';

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

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [fullname, setfullname] = useState('');
    const [cpwd, setcpwd] = useState('');
    const [newpwd, setnewpwd] = useState('');
    const [cnewpwd, setcnewpwd] = useState('');
    const [docid, setdocid] = useState('');
    const [mypwd, setmypwd] = useState('');

    const handleClosestudent = () => {
        setOpenstudent(false);
    };

    async function getdetails() {
        const username = sessionStorage.getItem("username");
        const rfidsRef = db.collection('admins');
        const queryRef = rfidsRef.where('username', '==', username);
        const res = await queryRef.get();
        console.log(res);
        if (res.empty) {
            window.location.href = "login";
            return false;
        } else {
            res.forEach(doc => {
                setdocid(doc.id);
                setemail(doc.data().email);
                setfullname(doc.data().name);
                setusername(doc.data().username);
                setmypwd(doc.data().password);
            })
        }
    }

    function changepwd(e) {
        e.preventDefault();
        if (cpwd != mypwd || newpwd != cnewpwd) {
            alert("Password Not matching!!");
            return false;
        }
        db.collection('admins').doc(docid).set({
            password: cnewpwd
        }, { merge: true });
        alert("password Updated Sucessfully!");
        handleClosestudent();
        setcpwd('');
        setnewpwd('');
        setcnewpwd('');
    }

    getdetails();

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
                    <h3>Username:  {username}</h3>
                    <h3>Full Name:  {fullname}</h3>
                    <h3>Email:  {email}</h3>
                </div>
            </Card>
            <Button className="adminbtn" variant="contained" color="primary" onClick={() => { sessionStorage.clear(); window.location.href = "login"; }} style={{ marginRight: '150px', float: 'right', display: 'block', marginTop: '30px' }}>
                Log out
            </Button>
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
                        <form onSubmit={changepwd} autocomplete="off" >
                            <h2 id="transition-modal-title">Reset Password</h2>
                            <FormGroup>
                                <FormLabel>Current Password</FormLabel>
                                <OutlinedInput type="password" required value={cpwd} style={{ height: '30px', marginBottom: '10px' }}
                                    onChange={(e) => setcpwd(e.target.value)} />
                                <FormLabel>New Password</FormLabel>
                                <OutlinedInput type="password" value={newpwd} required style={{ height: '30px', marginBottom: '10px' }}
                                    onChange={(e) => setnewpwd(e.target.value)} />
                                <FormLabel>Confirm New Password</FormLabel>
                                <OutlinedInput type="password" value={cnewpwd} required style={{ height: '30px', marginBottom: '10px' }}
                                    onChange={(e) => setcnewpwd(e.target.value)} />
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
