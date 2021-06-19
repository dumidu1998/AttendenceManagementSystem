import React, { Component } from 'react';
import M from "materialize-css";
import { Redirect } from "react-router-dom";
const axios = require("axios");


class VehicleDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.vehicle.id,
            rates:this.props.vehicle.rates,
            description:this.props.vehicle.description,
            mileage:this.props.vehicle.mileage,
            serviceDate:this.props.vehicle.serviceDate,
            imgUrl:this.props.vehicle.imgUrl,
            updateVehicle:false,
            bookings:[]
        }
        console.log(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        console.log(headersInfo);
        axios.post("http://localhost:8080/GetBookingList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                bookings:res.data
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleDelete() {
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }

        let canDelete = true;
        for(let a=0; a<this.state.bookings.length; a++){
            if(this.state.bookings[a].bookingState==='PickedUp' || this.state.bookings[a].bookingState==='Pending'){
                if(this.state.bookings[a].vehicle.id === this.state.id){
                    canDelete=false;
                }
            }
        }

        if(canDelete){
            if (window.confirm("Are you sure you want to delete this vehicle?")) {
                axios.delete("http://localhost:8080/DeleteVehicle/"+ this.state.id,config)
                .then(function(res){
                    console.log("Vehicle deleted successfully!");
                    alert("Vehicle deleted successfully!");
                    window.location.reload();
                }).catch(function(error){
                    console.log("Vehicle delete un-successful!\nError : ",error.response);
                    alert("Vehicle delete un-successful!");
            })
              } else {
                alert("Vehicle deletion cancelled");
              } 
        }else{
            alert("This Vehicle Cannot be Deleted due to existing bookings that include this vehicle");
        }
                    
    }

    handleUpdate() {
        this.setState({
            updateVehicle:true
        })
    }

    render() {
        return (
            <tr>
                {
                   this.state.updateVehicle?(
                       <Redirect to={{
                            state: {id:this.state.id},
                            pathname: '/updateVehicle'
                          }}/>
                   ):("")
                }
                <td class="center">
                    <i><b>{this.state.id}</b></i><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleUpdate}>Update</button><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleDelete}>Delete</button>
                </td>
                <td class="teal lighten-4 center">
                    <b>{this.props.vehicle.model}</b><br/><br/>
                    {this.state.description}
                </td>
                <td class="center">{this.props.vehicle.category}</td>
                <td class="teal lighten-4 center">
                {this.state.rates} Euros
                </td>
                <td>
                    <img class="responsive-img" src={this.state.imgUrl} alt=""/><br/>
                </td>
                
                <td class="teal lighten-4"><b>Fuel Type: </b>{this.props.vehicle.fuelType}
                <br/><b>Mileage: </b>{this.state.mileage}
                <br/><b>Service Date: </b>
                {this.state.serviceDate!==null?(this.state.serviceDate.toString().split('T')[0]):("")} 
                <br/><b>Availability: </b>{this.props.vehicle.availability===true?"Available":"Unavailable"}
                <br/><b>License No: </b>{this.props.vehicle.licenseNo}</td>

            </tr>
        )
    }
}

export default VehicleDetails;