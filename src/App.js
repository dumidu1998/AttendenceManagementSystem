import './App.css';
import React, { Component } from 'react';
import Attendence from './components/attendenceCollection/Attendence';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
function App() {
  return (
    // <div className="App">
    //   {/* <Attendence /> */}
    // </div>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Navbar />
          {/* <Dashboard /> */}
          <Route exact path='/dashboard' component={Dashboard} />
          {/* <Route exact path='/' component={SignIn} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/vehicles' component={VehicleList} />
          <Route exact path='/utilities' component={UtilityList} />
          <Route exact path='/updateVehicle' component={UpdateVehicle} />
          <Route exact path='/updateBooking' component={UpdateBooking} />
          <Route exact path='/updateUtility' component={UpdateUtility} />
          <Route exact path='/userDocs' component={UserDocs} />
          <Route exact path='/competitorInfo' component={CompetitorInfo} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
