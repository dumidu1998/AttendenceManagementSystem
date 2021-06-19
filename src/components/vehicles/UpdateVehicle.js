import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import { Redirect } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const axios = require("axios")

class UpdateVehicle extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.id,
            rates:'',
            description:'',
            mileage:'',
            serviceDate:'',
            imgUrl:'',
            model:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(props);
    }

    componentDidMount(){
        const that = this;

        axios.get("http://localhost:8080/GetVehicle/"+ this.state.id)
        .then(function(res){
                console.log(res.data)
                that.setState({
                    imgUrl:res.data.imgUrl,
                    model:res.data.model,
                    rates:res.data.rates,
                    description:res.data.description,
                    mileage:res.data.mileage,
                    serviceDate:res.data.serviceDate,
                    isUpdated:false
                })
                console.log("Vehicle Data Received!");
            }).catch(function(error){
                console.log("Vehicle data error ",error.response);
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onDateChange = (value, event) => {
        this.setState({
            serviceDate: value
        }, () => {
            console.log(this.state);
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const that=this;
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        
        const data = {
            rates:this.state.rates,
            description:this.state.description,
            mileage:this.state.mileage,
            serviceDate:this.state.serviceDate,
            imgUrl:this.state.imgUrl
        }
        console.log(data);

        axios.put("http://localhost:8080/UpdateVehicle/"+ this.state.id,data,config)
            .then(function(res){
                console.log("Vehicle updated successfully!");
                alert("Vehicle updated successfully!");
                that.setState({
                    isUpdated:true
                })
            }).catch(function(error){
                console.log("Vehicle update un-successful!\nError : ",error.response);
                alert("Vehicle update un-successful!");
         })
    }

    render() {
        return (
            <div class="update-vehicle">
                <Navbar/>
                {
                   this.state.isUpdated?(
                       <Redirect to={'/vehicles'}/>
                   ):("")
                }
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Update Vehicle : {this.state.model} </span>
                            <img style={{width:700+"px"}} class="responsive-img" src={this.state.imgUrl} alt=""/>
                                <form>
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>Vehicle ID</th>
                                            <td>{this.state.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Vehicle Description</th>
                                            <td><textarea type="text" placeholder={this.state.description} id="description" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Rates</th>
                                            <td><input type="text" placeholder={this.state.rates} id="rates" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Mileage</th>
                                            <td><input type="text" placeholder={this.state.mileage} id="mileage" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Service Date</th>
                                            <td><Calendar onChange={this.onDateChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Image URL</th>
                                            <th><input type="text" placeholder="New Image URL" id="imgUrl" onChange={this.handleChange} /></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                <button class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleSubmit}>Update Vehicle</button>
                            </form>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateVehicle;