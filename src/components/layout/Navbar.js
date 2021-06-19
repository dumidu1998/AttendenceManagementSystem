import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.signOut=this.signOut.bind(this);
    }

    componentDidMount(){
        const sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav,{});
    }

    signOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        console.log(localStorage);
    }

    render() {
        return(
            <div class="navigation-bar">
                        <nav>
                            <div class="nav-wrapper white">
                                <a href="#" class="brand-logo black-text right">Banger & Co</a>
                                <a href="sidenav" class="sidenav-trigger" data-target="slide-out"><i class="black-text material-icons">menu</i></a>
                            </div>
                        </nav>
                <ul class="sidenav sidenav-fixed bg" id="slide-out">
                    <li>
                        <div class="user-view">
                            <img src="https://f0.pngfuel.com/png/782/114/profile-icon-png-clip-art.png" alt="admin-pic" class="circle"/>
                            <h4 class="white-text name">Administrator</h4>
                        </div>
                    </li>
                    <li>
                        <NavLink class="white-text" to='/dashboard'><i class="material-icons left white-text">home</i>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink class="white-text" to='/users'><i class="material-icons left white-text">account_circle</i>Users</NavLink>
                    </li>
                    <li>
                        <NavLink class="white-text" to='/vehicles'><i class="material-icons left white-text">time_to_leave</i>Vehicles</NavLink>
                    </li>
                    <li>
                        <NavLink class="white-text" to='/utilities'><i class="material-icons left white-text">widgets</i>Utilities</NavLink>
                    </li>
                    <li>
                        <NavLink class="white-text" to='/competitorInfo'><i class="material-icons left white-text">compare_arrows</i>Price Comparison</NavLink>
                    </li>
                    <li><a href="/" onClick={this.signOut} class="white-text">Logout</a></li>
                </ul>
            </div>
        )
    }
    
}

export default Navbar;