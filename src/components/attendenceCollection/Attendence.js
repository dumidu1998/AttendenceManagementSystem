import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, Typography, Card, Box, LinearProgress, Toolbar, Grid } from '@material-ui/core';
import '../styles.css';
import axios from 'axios';
import { db } from '../../firebase';
import SidenavHeader from 'rsuite/lib/Sidenav/SidenavHeader';

export default function Attendence() {

    const [progress, setProgress] = useState(100);
    const [Id, setId] = useState('');
    const [btndisabled, setbtndisabled] = useState(false);
    const [name, setname] = useState('');
    var type = "";
    const [d, setD] = useState(new Date().valueOf())
    const [msg, setmsg] = useState('')
    const [warn, setwarn] = useState('')
    useEffect(() => {
        const timeout = setTimeout(() => {
            setD(new Date().valueOf());
        }, 500);

        return () => clearTimeout(timeout);
    }, [d]);

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(function (response) {
                console.log(response.data.Sucess);
                if (response.data.Sucess == 'false') {
                    setmsg('Mask not Detected! Please wear a Mask!')
                    setwarn('red');
                    document.getElementById("outlined-basic").blur();
                } else {
                    setmsg('Mask Detected! Place your ID on the Reader!')
                    setwarn('green');
                    document.getElementById("outlined-basic").focus();
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [d]);

    function markStudent(sid) {
        db.collection('studentAttendence').add({
            id: SidenavHeader,
            date: new Date()
        })
        console.log("done")
    }

    function MarkStaff(sid) {
        db.collection('staffAttendence').add({
            id: sid,
            date: new Date()
        })
        console.log("done")

    }

    async function checkID() {
        const rfidsRef = db.collection('rfids');
        const queryRef = rfidsRef.where('rfid', '==', Id);
        const res = await queryRef.get();
        console.log(res);
        res.forEach(doc => {
            type = doc.data().type;
            type == "student" ? (markStudent(doc.data().id)) : (MarkStaff(doc.data().id));
        })
        // type == "student" ? (markStudent()) : (MarkStaff());
    }

    const submitfunction = (e) => {
        e.preventDefault();
        document.getElementById('mcard').style.display = "block";
        checkID();
        probar();

    }

    var i;
    const probar = () => {
        i = setInterval(() => {
            setProgress((prevProgress) => (prevProgress <= 10 ? 0 : prevProgress - 10));
        }, 250) //200
        if (progress == 0) {
            clearInterval(i);
        }
    }

    if (progress === 10) {
        window.location.reload();
    }

    if (btndisabled == true) {  //disable according to detection
        setbtndisabled(false);
    }



    return (
        <div>
            <Grid container spacing={14}>
                <Grid item xs={1}>
                    <div>
                        <Button raised color="accent" onClick={() => (window.location.href = "dashboard")}>
                            Login
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <img src="https://www.felca.org/wp-content/uploads/Logo-edex-pdf.jpg" width="130" />
            <h1 id="hh">Welcome to Edex Institute</h1>
            <div class="">
                <div className={warn}>{msg}</div>
                <form autoComplete="off" onSubmit={submitfunction}>
                    <h4>Enter your ID number</h4>
                    <TextField type="number" id="outlined-basic" label="ID Number" required variant="outlined" value={Id}
                        onChange={(e) => setId(e.target.value)} />
                    <br /><br />
                    <Button disabled={btndisabled} type="submit" variant="outlined" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
            <div >
                <br />
                <Card className="cardclass" variant="outlined" id="mcard">
                    <CardContent>
                        <Typography className="" variant="h4">
                            Dumidu Kasun Bandara Rajakaruna
                        </Typography>
                        <Typography variant="h5" component="h2">
                            2018/IS/064
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Attendence Marked
                        </Typography>
                        <Typography variant="h6" component="h2">
                            <img src="https://www.jing.fm/clipimg/full/24-242581_checkmark-svg-clipart-green-tick-png.png"
                                width="100" />
                        </Typography>
                        <Button type="submit" variant="outlined" color="primary">
                            Request Attendence Report
                        </Button>
                    </CardContent>
                </Card>
                <Box width="100%" mr={1} className="pbar">
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            </div>

        </div >
    )
}