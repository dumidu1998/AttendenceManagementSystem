import React, { Component, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { db } from '../../firebase';
export default function SignIn() {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const submitfunction = async (e) => {
        e.preventDefault();
        const rfidsRef = db.collection('admins');
        const queryRef = rfidsRef.where('username', '==', username);
        const res = await queryRef.get();
        if (res.empty) {
            alert("Invalid Login details!!");
            return false;
        } else {
            const query2Ref = rfidsRef.where('password', '==', password);
            const res2 = await query2Ref.get();
            if (res2.empty) {
                alert("Invalid Login details!!");
                return false;
            }
            sessionStorage.setItem('username', username);
            window.location.href = "dashboard";
        }
    }

    return (
        <div class="">
            <form autoComplete="off" onSubmit={submitfunction} >
                <h2>Login </h2>
                <TextField autoFocus type="text" id="outlined-basic" label="Admin Username" required variant="outlined"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <br />
                <br />
                <br />
                <TextField autoFocus autoComplete="off" type="password" id="outlined-basic" label="Password" required variant="outlined"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <br /><br />
                <Button type="submit" variant="outlined" color="primary">
                    Login
                </Button>
            </form >
        </div >
    );
}
