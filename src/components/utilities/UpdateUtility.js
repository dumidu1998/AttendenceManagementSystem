import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import { Redirect } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
const axios = require("axios")

class UpdateUtility extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.location.state.id,
            utilityRate:'',
            quantity:'',
            utilityImg:'',
            utilityName:'',
            isUpdated:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const that = this;

        axios.get("http://localhost:8080/GetUtility/"+ this.state.id)
        .then(function(res){
                console.log(res.data)
                that.setState({
                    utilityRate:res.data.utilityRate,
                    quantity:res.data.quantity,
                    utilityImg:res.data.utilityImg,
                    utilityName:res.data.utilityName
                })
                console.log("Utility Data Received!");
            }).catch(function(error){
                console.log("Utility data error ",error.response);
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const that=this;
        console.log(this.state);
        const config = {
            headers:{
                Authorization:'Bearer '+ localStorage.token
            }
        }
        
        const data = {
            utilityRate:this.state.utilityRate,
            quantity:this.state.quantity,
            utilityImg:this.state.utilityImg,
            utilityName:this.state.utilityName
        }
        console.log(data);

        axios.put("http://localhost:8080/UpdateUtility/"+ this.state.id,data,config)
            .then(function(res){
                console.log("Utility updated successfully!");
                alert("Utility updated successfully!");
                that.setState({
                    isUpdated:true
                })
                window.location.reload();
            }).catch(function(error){
                console.log("Utility update un-successful!\nError : ",error.response);
                alert("Utility update un-successful!");
         })
    }

    render() {
        return (
            <div class="update-vehicle">
                <Navbar/>
                {
                   this.state.isUpdated?(
                       <Redirect to={'/utilities'}/>
                   ):("")
                }
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Update Utility : {this.state.utilityName} </span>
                            <img style={{width:700+"px"}} class="responsive-img" src={this.state.utilityImg} alt=""/>
                                <form>
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>Utility ID</th>
                                            <td>{this.state.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Rates</th>
                                            <td><input type="text" placeholder={this.state.utilityRate} id="utilityRate" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td><input type="text" placeholder={this.state.quantity} id="quantity" onChange={this.handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <th>Image URL</th>
                                            <th><input type="text" placeholder="New Image URL" id="utilityImg" onChange={this.handleChange} /></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                <button class="waves-effect waves-light btn-small red lighten-2" type="button" onClick={this.handleSubmit}>Update Utility</button>
                            </form>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateUtility;