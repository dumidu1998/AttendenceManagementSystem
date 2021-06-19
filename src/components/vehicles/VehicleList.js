import React, { Component } from 'react'
import Navbar from '../layout/Navbar'
import VehicleDetails from './VehicleDetails'
import M from 'materialize-css'
const axios = require("axios")


class VehicleList extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicles:[],
            model:'',
            rates:'',
            description:'',
            category:'',
            fuelType:'',
            mileage:'',
            serviceDate:'',
            availability:'',
            licenseNo:'',
            imgUrl:'',
            search:'',
            searchResult:'',
            view:true
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;

        const datepicker=document.querySelectorAll('.datepicker');
        M.Datepicker.init(datepicker,{
            selectMonths: true, 
            selectYears: 100, 
            format: "yyyy-mm-dd",
            setDefaultDate: true,
            autoClose:true,
            onSet:that.handleDate,
            onSelect: function(date) {
                var splitDate = date.toString().split("-"),
                    newdate = splitDate[0].split(" "),
                    editedDate = newdate[1]+"-"+newdate[2]+'-'+newdate[3],
                    finalDate = new Date(editedDate);
                that.setState({
                    serviceDate : finalDate
                })
              }
        });

        console.log(localStorage);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const data = {
            email:localStorage.email
        }
        console.log(headersInfo);
        axios.post("http://localhost:8080/GetVehicleList",data,{
            headers:headersInfo
        }).then(function(res){
            console.log(res.data);
            that.setState({
                vehicles:res.data
            })
        }).catch(function(error){
            console.log(error.response);
        })
    }

    handleDate = (date) => {
        var splitDate = date.toString().split("-"),
                    newdate = splitDate[0].split(" "),
                    editedDate = newdate[1]+"-"+newdate[2]+'-'+newdate[3],
                    finalDate = new Date(editedDate);
        this.setState({
            serviceDate: finalDate
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        
        const data = {
            model:this.state.model,
            rates:this.state.rates,
            description:this.state.description,
            category:this.state.category,
            fuelType:this.state.fuelType,
            mileage:this.state.mileage,

            availability:true,
            licenseNo:this.state.licenseNo,
            imgUrl:this.state.imgUrl
        }
        console.log(data);

        axios.put("http://localhost:8080/AddVehicle",data,{
            headers:headersInfo
        })
            .then(function(res){
                console.log("Vehicle Added successfully!");
                alert("Vehicle Added successfully!");
                window.location.reload();
            }).catch(function(error){
                console.log("Vehicle addition un-successful!\nError : ",error.response);
                alert("Vehicle addition un-successful!");
         })
    }

    handleSearch = (e) => {
        const that=this;
        axios.get("http://localhost:8080/GetVehicle/"+ e.target.value).then(function(res){
            console.log(res.data);
            that.setState({
                searchResult:res.data,
                view:false
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleClose = (e) => {
        this.setState({
            view:true,
            searchResult:''
        })
    }

    render() {
        return (
            <div class="vehicles">
                <Navbar/>
                <nav>
                    <div class="nav-wrapper">
                        <form>
                            <div class="input-field teal lighten-3">
                            <input id="search" type="search" required onChange={this.handleSearch}/>
                            <label class="label-icon" for="search" ><i class="material-icons">search</i></label>
                            <i class="material-icons" onClick={this.handleClose}>close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                <div class="content bg">
                    <div class="row">
                        <div class="col s12">
                            <div class="card card-bg">
                                <span class="card-title center">Manage Vehicles</span>

                                {/* <!-- Modal Trigger --> */}
                                <button data-target="modal1" class="modal-trigger waves-effect btn-flat teal lighten-3 white-text">Add New Vehicle</button>

                                {/* <!-- Modal1 Structure --> */}
                                <div id="modal1" class="modal">
                                    <div class="modal-content">
                                        <h4>Add New Vehicle</h4>
                                        <form >
                                            <input type="text" placeholder="Model" id="model" onChange={this.handleChange}/>
                                            <input type="text" placeholder="Rates" id="rates" onChange={this.handleChange}/>
                                            <input type="text" placeholder="Description" id="description" onChange={this.handleChange}/>

                                            <div class="input-field">
                                                <select id="category" onChange={this.handleChange}>
                                                <option value="" disabled selected>Choose Category</option>
                                                <option value="Small Town Cars">Small Town Cars</option>
                                                <option value="Family Vehicles">Family Vehicles</option>
                                                <option value="Vans">Vans</option>
                                                </select>
                                            </div>

                                            {/* <input type="tel" placeholder="Quantity" id="quantity" onChange={this.handleChange}/> */}

                                            <div class="input-field">
                                                <select id="fuelType" onChange={this.handleChange}>
                                                <option value="" disabled selected>Choose Fuel Type</option>
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Hybrid">Hybrid</option>
                                                </select>
                                            </div>

                                            <input type="text" placeholder="Mileage" id="mileage" onChange={this.handleChange} />
                                            <input type="text" placeholder="License No" id="licenseNo" onChange={this.handleChange} />
                                            <input type="text" placeholder="Image" id="imgUrl" onChange={this.handleChange} />
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.handleSubmit} >Add</button>
                                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                                    </div>
                                </div>

                                <table class="responsive-table highlight">
                                    <thead>
                                        <tr>
                                            <th class="teal lighten-3">Vehicle ID</th>
                                            <th class=" teal lighten-4">Model & Description</th>
                                            <th class=" teal lighten-3">Category</th>
                                            <th class="teal lighten-4"style={{width: 100+"px"}}>Rates</th>
                                            <th class=" teal lighten-3" style={{width: 200+"px"}} >Image</th>
                                            <th class="teal lighten-4" style={{width: 200+"px"}}>Additional Information</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.view?(
                                            this.state.vehicles && this.state.vehicles.map(vehicle => 
                                        {
                                            return(
                                                <VehicleDetails vehicle={vehicle} key={vehicle.id} />
                                            )
                                        })
                                        ):(
                                            <VehicleDetails vehicle={this.state.searchResult} key={this.state.searchResult.id} /> 
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                    
            </div>
        );
    }
}

export default VehicleList;