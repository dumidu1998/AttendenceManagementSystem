import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import { DataGrid } from '@material-ui/data-grid';
import Deletebtn from '../tableButtons/Deletebtn';
import '../styles.css'
import { db } from '../../firebase';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const columns = [
    { field: 'stuid', headerName: 'Student Reg.No', width: 200 },
    { field: 'date', headerName: 'Date', width: 300 },
    { field: 'status', headerName: 'Status', width: 200 },
];

export default function Request() {

    const [rows, setrows] = useState([]);

    useEffect(() => {
        db.collection('requests').onSnapshot(snapshot => {
            setrows(snapshot.docs.map(doc => ({ id: doc.data().studentdocid, stuid: doc.data().id, date: doc.data().date.toDate(), status: doc.data().status })))
        });
    }, [])

    const viewmore = (params) => {
        window.open('show/' + params.row.id, '_blank').focus();  //show for student
    }

    const deleteall = async () => {
        if (window.confirm("Are you sure You want to delete?")) {
            db.collection('requests').onSnapshot(snapshot => {
                snapshot.docs.map(doci => db.collection('requests').doc(doci.id).delete())
            })
        }
    }

    return (
        <div className="content">
            <h1>Attendence Requests</h1>
            <IconButton aria-label="Print" style={{ float: 'right' }} onClick={deleteall}>
                <DeleteForeverIcon />
            </IconButton>
            <Navbar />
            <div style={{ height: 600, marginLeft: '110px', marginTop: '10px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} onRowClick={viewmore} />
            </div>
        </div>
    )
}
