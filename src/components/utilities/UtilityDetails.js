import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
const axios = require("axios");


class UtilityDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.utility.id,
            utilityRate:this.props.utility.utilityRate,
            quantity:this.props.utility.quantity,
            utilityImg:this.props.utility.utilityImg,
            utilityName:this.props.utility.utilityName,
            utilityAvailability:this.props.utility.utilityAvailability,
            isUpdate:false,
            bookings:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        console.log(props);
    }

    componentDidMount(){
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleUpdate(){
        this.setState({
            isUpdate:true
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
            if(this.state.bookings[a].utilities!=null && (this.state.bookings[a].bookingState==='PickedUp' || this.state.bookings[a].bookingState==='Pending')){
                for(let b=0; b<this.state.bookings[a].utilities.length; b++){
                    if(this.state.bookings[a].utilities[b].id === this.state.id){
                        canDelete=false;
                    }
                }
            }
        }

        if(canDelete){
            if (window.confirm("Are you sure you want to delete this vehicle?")) {
                axios.delete("http://localhost:8080/DeleteUtility/"+ this.state.id,config)
                .then(function(res){
                    console.log("Utility deleted successfully!");
                    alert("Utility deleted successfully!");
                    window.location.reload();
                }).catch(function(error){
                    console.log("Utility delete un-successful!\nError : ",error.response);
                    alert("Utility delete un-successful!");
            })
              } else {
                alert("Utility deletion cancelled");
              }   
        }else{
            alert("This Utility Cannot be Deleted due to existing bookings that include this utility");
        }
                  
    }

    render() {
        return (
            <tr>
                {
                   this.state.isUpdate?(
                       <Redirect to={{
                            state: {id:this.state.id},
                            pathname: '/updateUtility'
                          }}/>
                   ):("")
                }
                <td class="center">
                    <i><b>{this.state.id}</b></i><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleUpdate}>Update</button><br/><br/>
                    <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.handleDelete}>Delete</button>
                </td>
                <td class="teal lighten-4 center">
                    {this.state.utilityName}</td>
                <td class="center">
                    {this.state.utilityAvailability===true?"Available":"Unavailable"}
                </td>
                <td class="teal lighten-4 center">
                    {this.state.utilityRate} Euros
                </td>
                <td class="center">
                    <img class="responsive-img" src={this.state.utilityImg} alt=""/><br/>
                </td>
                <td class="teal lighten-4 center">
                    {this.state.quantity}
                </td>

            </tr>
        )
    }
}

export default UtilityDetails;