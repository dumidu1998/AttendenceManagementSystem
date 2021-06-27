import { makeStyles } from '@material-ui/core';
import React from 'react'
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import '../styles.css'

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


export default function ShowStaff() {
    const classes = useStyles();
    let { id } = useParams();
    return (
        <div>
            helloooo{id}
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
                    <h5 className="myh5">RFID No.:  Dumidu Kasun</h5>
                    <h5 className="myh5">Reg No.:  Dumidu Kasun</h5>
                    <h5 className="myh5">Name:  Dumidu Kasun</h5>
                    <h5 className="myh5">Batch:  Dumidu Kasun</h5>
                    <h5 className="myh5">Birth Day:  Dumidu Kasun</h5>
                    <h5 className="myh5">Address:  Dumidu Kasun</h5>
                    <h5 className="myh5">Email:  Dumidu Kasun</h5>
                    <h5 className="myh5">Contact No.:  Dumidu Kasun</h5>
                </div>
            </Card>
        </div>
    )
}
