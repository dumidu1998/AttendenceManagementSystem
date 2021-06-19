import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, CardContent, Typography, Card, Box, LinearProgress } from '@material-ui/core';
import '../styles.css';

function Attendence() {

    const [progress, setProgress] = React.useState(100);
    const submitfunction = (e) => {
        e.preventDefault();
        alert("aaa");
        setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress - 10));
        }, 800);
        if (progress === 0) {
            alert("d0ne");
        }
    }

    return (
        <div>
            <img src="https://www.felca.org/wp-content/uploads/Logo-edex-pdf.jpg" width="150" />
            <h1>Welcome to Edex Institute</h1>
            <div class="mainform">
                <form autoComplete="off" onSubmit={submitfunction}>
                    <h4>Enter your ID number</h4>
                    <TextField autoFocus id="outlined-basic" label="ID Number" variant="outlined" /><br /><br />
                    <Button type="submit" variant="outlined" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
            <div>
                <br />
                <Card className="cardclass" variant="outlined">
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
                            <img src="https://lh3.googleusercontent.com/proxy/1HwpcK-hCtfysHmgpDEwBjJ4ebHvGW-Qh3bUGDbfB70I0eLw265HAB8op-nYrwzm0kRgihjoLpv2KMUPAHHOWw_tusCbSQE" width="150" />
                        </Typography>
                    </CardContent>
                </Card>
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            </div>

        </div>
    )
}

export default Attendence
