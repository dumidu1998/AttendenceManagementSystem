import React from 'react'
import Attendence from '../attendenceCollection/Attendence'
import Navbar from '../layout/Navbar'
import '../styles.css'

export default function ManualAttendence() {
    return (
        <div className="content">
            <Navbar />
            <Attendence />
        </div>
    )
}
