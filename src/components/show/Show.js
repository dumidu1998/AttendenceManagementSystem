import { IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import '../styles.css'
import { DataGrid } from '@material-ui/data-grid';
import ReactToPrint from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import { db } from '../../firebase';

const columns = [
    { field: 'idd', headerName: 'Student Reg. Id', width: 200 },
    { field: 'date', headerName: 'Date', width: 500 },
];


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


export default function Show() { //show for student
    const classes = useStyles();
    let { id } = useParams();
    const [details, setdetails] = useState({});
    const [rows, setrows] = useState([]);
    const [stid, setstid] = useState('')

    async function checkID() {
        const rfidsRef = db.collection('students').doc(id);
        const res = await rfidsRef.get();
        if (res.empty) {
            alert("User Not found!!");
            return false;
        }
        console.log(res.data().rfid);
        setdetails({
            rfid: res.data().rfid,
            regno: res.data().stuid,
            name: res.data().name,
            batch: res.data().batch,
            bday: res.data().dob.toDate().toDateString(),
            address: res.data().address,
            email: res.data().email,
            contact: res.data().contact,
        })
        setstid(res.data().stuid);
    }

    const getdata = async () => {
        db.collection('studentAttendence').where('id', '==', stid).onSnapshot(snapshot => {
            setrows(snapshot.docs.map(doc => ({ id: doc.id, idd: doc.data().id, date: doc.data().date.toDate() })))
        });
        console.log(stid);
    }
    setTimeout(function () {
        getdata();
    }, 300);

    useEffect(() => {
        checkID();
    }, []);


    return (
        <div>
            <h1>Student Full View</h1>
            <IconButton aria-label="Print" style={{ float: 'right' }} onClick={() => window.print()}>
                <PrintIcon />
            </IconButton>
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
                    <h5 className="myh5">RFID No.:  {details.rfid}</h5>
                    <h5 className="myh5">Reg No.: {details.regno}</h5>
                    <h5 className="myh5">Name:  {details.name}</h5>
                    <h5 className="myh5">Batch:  {details.batch}</h5>
                    <h5 className="myh5">Birth Day:  {details.bday}</h5>
                    <h5 className="myh5">Address:  {details.address}</h5>
                    <h5 className="myh5">Email:  {details.email}</h5>
                    <h5 className="myh5">Contact No.:  {details.contact}</h5>
                </div>
            </Card>
            <div style={{ height: '0px', marginLeft: '110px', marginTop: '10px' }}>
                <DataGrid autoHeight rows={rows} columns={columns} pageSize={100} />
            </div>
        </div >
    )
}
