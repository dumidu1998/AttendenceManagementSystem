import React from 'react'
import { Component } from 'react'
import { Redirect } from "react-router-dom";
const axios = require("axios")

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:this.props.user.email,
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            dateOfBirth:this.props.user.dateOfBirth,
            address:this.props.user.address,
            phoneNo:this.props.user.phoneNo,
            customerState:this.props.user.customerState,
            license:this.props.user.driversLicense,
            viewDocs:false
        }
        this.viewDocs = this.viewDocs.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    viewDocs(){
        this.setState({
            viewDocs:true
        })
    }

    handleUpdate(){
        const that = this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        const returningUser = {
            customerState:'Returning'
        }
            axios.put("http://localhost:8080/UpdateUserState/"+ that.state.email, returningUser, config)
            .then(function(res){
                console.log("User Marked as Returning");
                alert("User Marked as Returning");
                window.location.reload();
            }).catch(function(error){
                console.log("User state update un-successful!\nError : ",error.response);
                alert("User state update  un-successful!");
        }) 
    }

    render(){
        return (
            <tr>
                {
                   this.state.viewDocs?(
                    <Redirect to={{
                            state: {
                                id:this.state.email,
                                firstName:this.state.firstName,
                                lastName:this.state.lastName,
                                license:this.state.license},
                            pathname: '/userDocs'
                          }}/>
                   ):("")
                }
                <td class="teal lighten-4"><i><b>{this.state.email}</b></i></td>
                <td>{this.state.firstName+' '+this.state.lastName}</td>
                <td class="teal lighten-4">{this.state.dateOfBirth!==null?(this.state.dateOfBirth.split('T')[0]):("")}</td>
                <td>{this.state.address}</td>
                <td class="teal lighten-4">{this.state.phoneNo}</td>
                <td class="center">{this.state.customerState} <br/> 
                {this.state.customerState==="Returning"?(
                    <button class="waves-effect waves-light btn-small red lighten-2 disabled" type="button" onClick={this.handleUpdate}>Mark as Returning</button>
                ):(
                    <button class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleUpdate}>Mark as Returning</button>
                )}
                </td>
                <td class="teal lighten-4"><button class="waves-effect btn-flat grey darken-2 white-text" onClick={this.viewDocs}>Update</button></td>
            </tr>
        )
    }


}

export default UserDetails;