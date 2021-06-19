import React from 'react';
import Navbar from '../layout/Navbar';
import CardContainer from '../maindashboard/CardContainer';

import '../styles.css'


export default function Dashboard() {
    return (
        <div className="content">
            <h2>Dashboard</h2>
            <Navbar />
            <CardContainer studentcount='100' staffcount='100' />

        </div>
    )
}
