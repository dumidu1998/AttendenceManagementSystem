import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import { Redirect } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import M from "materialize-css"
const axios = require("axios")

class UpdateBooking extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.booking.id,
            pickupDateTime:this.props.location.state.booking.pickupDateTime,
            dropDateTime:this.props.location.state.booking.dropDateTime,
            lateState:this.props.location.state.booking.lateState,
            extendedState:this.props.location.state.booking.extendedState,
            extendedTime:this.props.location.state.booking.extendedTime,
            bookingState:this.props.location.state.booking.bookingState,
            bookedTime:this.props.location.state.booking.bookedTime,
            booking_utilities:this.props.location.state.booking.utilities,
            vehicle_id:this.props.location.state.booking.vehicle.id,
            vehicle_img:this.props.location.state.booking.vehicle.imgUrl,
            user_id:this.props.location.state.booking.user.email,
            user_name:this.props.location.state.booking.user.firstName + ' ' + this.props.location.state.booking.user.lastName,
            license:this.props.location.state.booking.user.driversLicense,
            isUpdated:false,
            viewDocs:false
        }
        this.blacklistUser = this.blacklistUser.bind(this);
        this.updateBookingState = this.updateBookingState.bind(this);
        this.viewDocs = this.viewDocs.bind(this);
        console.log(props);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    updateBookingState() {
        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        const bookingDeets = {
            bookingState:this.state.bookingState
        }
        axios.put("http://localhost:8080/updateBookingState/"+ that.state.id, bookingDeets, config)
        .then(function(res){
            console.log(bookingDeets);
            console.log("Booking State Updated successfully!");
            alert("Booking State Updated successfully!");
            window.location.reload();
        }).catch(function(error){
            console.log("Booking State Update un-successful!\nError : ",error.response);
            alert("Booking State Update  un-successful!");
        }) 
    }

    blacklistUser() {
        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        const blackListUser = {
            customerState:'Blacklisted'
        }
        if (window.confirm("Are you sure you want to blacklist this user?")) {
            axios.put("http://localhost:8080/UpdateUserState/"+ that.state.user_id, blackListUser, config)
            .then(function(res){
                console.log("User blacklisted successfully!");
                alert("User blacklisted successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("User blacklisting un-successful!\nError : ",error.response);
                alert("User blacklisting  un-successful!");
        })
          } else {
            alert("User blacklisting  cancelled");
          }             
    }

    viewDocs(){
        this.setState({
            viewDocs:true
        })
    }

    render() {
        return (
            <div class="update-vehicle">
                {
                   this.state.viewDocs?(
                    <Redirect to={{
                            state: {
                                id:this.state.user_id,
                                firstName:this.state.user_name.split(' ')[0],
                                lastName:this.state.user_name.split(' ')[1],
                                license:this.state.license},
                            pathname: '/userDocs'
                          }}/>
                   ):("")
                }
                <Navbar/>
                {
                   this.state.isUpdated?(
                       <Redirect to={'/dashboard'}/>
                   ):("")
                }
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Update Booking : {this.state.id} </span>
                            
                            <table class="responsive-table highlight">
                                <tbody>
                                    <tr>
                                        <td>Booked Time:</td>
                                        <td>{this.state.bookedTime.split('T')[0] + ' at ' +this.state.bookedTime.split('T')[1].split('.')[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Booked Utilities:</td>
                                        <td>
                                            {
                                            this.state.booking_utilities.length>0?(
                                                this.state.booking_utilities.map(utility => 
                                                    {
                                                        return(
                                                            utility.utilityName + " | "
                                                        )
                                                    })
                                            ):(
                                                "None Selected"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vehicle ID:</td>
                                        <td>{this.state.vehicle_id}</td>
                                    </tr>
                                    <tr>
                                        <td>Vehicle : </td>
                                        <td><img style={{width:300+"px"}}  src={this.state.vehicle_img} alt=""/></td>
                                    </tr>
                                    <tr>
                                        <td>Booking State : </td>
                                        <td>
                                            {/* <!-- Modal Trigger --> */}
                                            <button data-target="modal1"  style={{marginRight:30+'px'}} class="modal-trigger waves-effect waves-green btn-flat teal lighten-3">Update</button>
                                            {/* <!-- Modal1 Structure --> */}
                                            <div id="modal1" class="modal">
                                                <div class="modal-content">
                                                    <h4>Update Booking State</h4>
                                                    <form>
                                                        <div class="input-field">
                                                            <select id="bookingState" onChange={this.handleChange}>
                                                            <option value="" disabled selected>Choose State</option>
                                                            <option value="PickedUp">PickedUp</option>
                                                            <option value="DroppedOff">DroppedOff</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button style={{marginRight:30+'px'}} class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.updateBookingState} >Update</button>
                                                    <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>User : </td>
                                        <td>{this.state.user_name}</td>
                                    </tr>
                                    <tr>
                                        <td>View and Update User Documents : </td>
                                        <td><button id="edit-btn" onClick={this.viewDocs}>Documents</button></td>
                                    </tr>
                                    <tr>
                                        <td>Blacklist User : </td>
                                        <td>
                                        <button id="edit-btn" onClick={this.blacklistUser}>Blacklist</button></td>
                                    </tr>
                                </tbody>
                            </table>
                                
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateBooking;