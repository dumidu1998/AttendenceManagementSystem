import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, Typography, Card, Box, LinearProgress } from '@material-ui/core';
import '../styles.css';
import Navbar from '../layout/Navbar';

function Attendence() {

    const [progress, setProgress] = useState(100);
    const [Id, setId] = useState('');

    const submitfunction = (e) => {
        e.preventDefault();
        document.getElementById('mcard').style.display = "block";
        probar();
        //logic 
    }
    var i;
    const probar = () => {
        i = setInterval(() => {
            setProgress((prevProgress) => (prevProgress <= 10 ? 0 : prevProgress - 10));

        }, 200) //200
        if (progress == 0) {
            clearInterval(i);
        }
    }

    if (progress === 10) {
        window.location.reload();
    }

    return (
        <div>
            <img src="https://www.felca.org/wp-content/uploads/Logo-edex-pdf.jpg" width="130" />
            <h1>Welcome to Edex Institute</h1>
            <div class="">
                <form autoComplete="off" onSubmit={submitfunction}>
                    <h4>Enter your ID number</h4>
                    <TextField type="number" autoFocus id="outlined-basic" label="ID Number" required variant="outlined" value={Id}
                        onChange={(e) => setId(e.target.value)}
                    /><br /><br />
                    <Button type="submit" variant="outlined" color="primary">
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
                            <img src="https://lh3.googleusercontent.com/proxy/1HwpcK-hCtfysHmgpDEwBjJ4ebHvGW-Qh3bUGDbfB70I0eLw265HAB8op-nYrwzm0kRgihjoLpv2KMUPAHHOWw_tusCbSQE"
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

export default Attendence
