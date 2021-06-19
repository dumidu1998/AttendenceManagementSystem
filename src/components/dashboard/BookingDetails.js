import React from 'react'
import { Component } from 'react'
import { Redirect } from "react-router-dom";

class BookingDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.booking.id,
            pickupDateTime:this.props.booking.pickupDateTime,
            dropDateTime:this.props.booking.dropDateTime,
            lateState:this.props.booking.lateState,
            extendedState:this.props.booking.extendedState,
            extendedTime:this.props.booking.extendedTime,
            bookingState:this.props.booking.bookingState,
            bookedTime:this.props.booking.bookedTime,
            booking_utilities:this.props.booking.utilities,
            vehicle_id:this.props.booking.vehicle.id,
            vehicle_model:this.props.booking.vehicle.model,
            user_id:this.props.booking.user.firstName + ' ' + this.props.booking.user.lastName,
            isUpdate:false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(){
        this.setState({
            isUpdate:true
        })
    }

    render(){
        return (
            <tr>
                {
                   this.state.isUpdate?(
                       <Redirect to={{
                            state: {booking:this.props.booking},
                            pathname: '/updateBooking'
                          }}/>
                   ):("")
                }
                <td class="teal lighten-4 center"><i><b>{this.state.id}</b></i><br/><br/>
                <button class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleUpdate}>Update Booking</button>
                </td>
                <td>{this.state.pickupDateTime.split('T')[0]+' to'}<br/>{this.state.dropDateTime.split('T')[0]}</td>
                <td class="teal lighten-4">{this.state.lateState?("Late"):("Not Late")}</td>
                <td>
                    {this.state.extendedState?('Extended Time: '+ this.state.extendedTime.split('T')[0] + ' at ' +this.state.extendedTime.split('T')[1].split('.')[0]
                    ):("Not Extended")}
                </td>
                <td class="teal lighten-4 center">
                    {this.state.bookingState}
                </td>
                <td class="center">
                    {this.state.user_id}
                </td>
                <td className="teal lighten-4 center">
                {this.state.vehicle_model}
                </td>
                <td class="center">
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
        )
    }


}

export default BookingDetails;