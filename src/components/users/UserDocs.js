import React, { Component } from 'react';
import Navbar from '../layout/Navbar'
import { Redirect } from "react-router-dom";
import M from "materialize-css";
const axios = require("axios");


class UserDocs extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id:this.props.location.state.id,
            user_name:this.props.location.state.firstName+' '+this.props.location.state.lastName,
            user_docs:[],
            licenseNo:this.props.location.state.license,
            license:'',
            licenseDown:'',
            licenseName:'',
            otherDocName:'',
            otherDoc:'',
            otherDown:'',
            selectedFile:'',
            goBack:false,
            download:false
        }
        this.updateDocument = this.updateDocument.bind(this);
        this.downloadLicenseDocument = this.downloadLicenseDocument.bind(this);
        this.downloadOtherDocument = this.downloadOtherDocument.bind(this);
        console.log(this.state);
    }

    componentDidMount(){
        const modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        const that = this;

        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }

        const user = {
            email:this.state.user_id
        }

        axios.post("http://localhost:8080/doc/getUserDocuments", user,{
            headers:headersInfo
        })
        .then(function(res){
            console.log(res.data);
            const data = res.data;
            for(let a=0; a<data.length; a++){
                if(data[a].docType ==="Other"){
                    that.setState({
                        otherDocName:data[a].docName,
                        otherDoc:" data:image/jpeg;charset=utf-8;base64,"+data[a].file,
                        otherDown:window.atob(data[a].file)
                    })
                    
                }else{
                    that.setState({
                        licenseName:data[a].docName,
                        license:" data:image/jpeg;charset=utf-8;base64,"+data[a].file,
                        licenseDown:window.atob(data[a].file)
                    })
                    
                }

            }
            that.setState({
                user_docs:res.data
            })
            console.log(that.state);
        }).catch(function(error){
            console.log(error);
        })

        const validityData = {
            email:this.state.user_id,
            driversLicense:this.state.licenseNo
        }
        axios.post("http://localhost:8080/CheckUserFraud",validityData,{
            headers:headersInfo
        })
        .then(function(res){
                console.log(res.data);
                const data = res.data;
                if(data){
                    alert("Fraudulent activity associated with the given license!");
                }
                
            }).catch(function(error){
                console.log(error.response);
            }) 
    }
    

    onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        }, () => {
            console.log(this.state);
        });
        
    }

    updateDocument(){
        const token = 'Bearer '+ localStorage.token;
        const headersInfo = {
            Authorization:token
        }
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append('userId', this.state.user_id);
        formData.append('fileType', 'Other');
        axios.post("http://localhost:8080/doc/upload", formData,{
            headers:headersInfo
        })
            .then(res => {
                console.log(res.data);
                console.log("Document uploaded successfully.");
            }).catch(function(error){
                console.log("Error : ",error);
                console.log("Document Upload Failed");
        })
    }

    downloadLicenseDocument = (e) => {
        e.preventDefault();
        this.setState({
            download:true
        }, () => {
            var binaryString =  this.state.licenseDown;
            console.log(binaryString);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++)        {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            
            var atag = document.createElement("a");
            document.body.appendChild(atag);
            atag.style = "display: none";
            var blob = new Blob([bytes], {type: "image/jpeg"});
            var url = window.URL.createObjectURL(blob);
            atag.href = url;
            atag.download = this.state.licenseName.split(".")[0]+".jpeg";
            atag.click();
            window.URL.revokeObjectURL(url);
            })
    }

    downloadOtherDocument = (e) => {
        e.preventDefault();
        this.setState({
            download:true
        }, () => {
            var binaryString =  this.state.otherDown;
            console.log(binaryString);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++)        {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            
            var atag = document.createElement("a");
            document.body.appendChild(atag);
            atag.style = "display: none";
            var blob = new Blob([bytes], {type: "image/jpeg"});
            var url = window.URL.createObjectURL(blob);
            atag.href = url;
            atag.download = this.state.otherDocName.split(".")[0]+".jpeg";
            atag.click();
            window.URL.revokeObjectURL(url);
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            goBack:true
        })
    }

    render() {
        return (
            <div class="update-vehicle">
                {
                   this.state.goBack?(
                       <Redirect to={'/users'}/>
                   ):("")
                }
                <Navbar/>
                <div className="container">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">User Documents : {this.state.user_id} </span>
                                    <table >
                                        <tbody>
                                        <tr>
                                            <th>User Full Name</th>
                                            <td>{this.state.user_name}</td>
                                        </tr>
                                        <tr>
                                            <th>License Number</th>
                                            <td>{this.state.licenseNo}</td>
                                        </tr>
                                        <tr>
                                            <th>License
                                            <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.downloadLicenseDocument}>Download</button>
                                            </th>
                                            <td><img style={{width:700+"px"}} class="responsive-img" src={this.state.license} alt=""/></td>
                                        </tr>
                                        <tr>
                                            <th>Other Doc Name</th>
                                            <td>
                                                {
                                                    this.state.otherDocName?(
                                                    this.state.otherDocName
                                                    ):("Not Available")
                                                }
                                                <br/>
                                                {/* <!-- Modal Trigger --> */}
                                                <button data-target="modal1"  class="modal-trigger waves-effect waves-light btn-small red lighten-2" >Update</button>

                                                {/* <!-- Modal2 Structure --> */}
                                                <div id="modal1" class="modal">
                                                    <div class="modal-content">
                                                        <h4>Update Verification Document</h4>
                                                        <form id="passWordForm">
                                                            <label for="nic-upload">Upload Scanned Copy of Driver's License</label>
                                                            <div id="nic-upload" class="file-field input-field">
                                                                <div id="upload-btn" class="waves-effect waves-light btn-small red lighten-2">
                                                                    <span>Upload</span>
                                                                    <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                                                                </div>
                                                                <div class="file-path-wrapper">
                                                                    <input class="file-path validate" type="text"/>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button style={{marginRight:30+'px'}}  class="modal-close waves-effect waves-green btn-flat teal lighten-3" onClick={this.updateDocument} >Update</button>
                                                        <button class="modal-close waves-effect waves-green btn-flat teal lighten-3">Cancel</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Other Doc
                                            <button class="waves-effect waves-light btn-small red lighten-2" onClick={this.downloadOtherDocument}>Download</button>
                                            </th>
                                            <td>{this.state.otherDoc?(
                                                <img style={{width:700+"px"}} class="responsive-img" src={this.state.otherDoc} alt=""/>
                                                ):("Not Available")
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                <button class="waves-effect waves-green btn-flat teal lighten-3" type="button" onClick={this.handleSubmit}>Done</button>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDocs;