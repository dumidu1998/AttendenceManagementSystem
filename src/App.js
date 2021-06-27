import './App.css';
import React, { Component } from 'react';
import Attendence from './components/attendenceCollection/Attendence';
import Dashboard from './components/maindashboard/Dashboard';
import Admin from './components/admins/Admin';
import Student from './components/student/Student';
import Staff from './components/staff/Staff';
import Batch from './components/batch/Batch';
import Profile from './components/profile/Profile';
import Request from './components/attendenceRequests/Request';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ManualAttendence from './components/manualAttendence/ManualAttendence';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Attendence} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/manualmarking' component={ManualAttendence} />
          <Route exact path='/Requests' component={Request} />
          <Route exact path='/adminhome' component={Admin} />
          <Route exact path='/studenthome' component={Student} />
          <Route exact path='/staffhome' component={Staff} />
          <Route exact path='/batchhome' component={Batch} />
          <Route exact path='/settings' component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
