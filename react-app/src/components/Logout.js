import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import  { Redirect } from 'react-router-dom'
import './NewPerson.css';

class Logout extends Component{
    constructor() {
        super();
        this.state = {
          auth : {
            authenticated :null,
            username : null,
            admin : null,
          },
        }
        this.clearInternal = this.clearInternal.bind(this);
    }

    clearInternal = () => {
        this.state.auth.authenticated = null;
        this.state.auth.username = null;
        this.state.auth.admin = null;
        localStorage.setItem("auth",JSON.stringify(this.state.auth));
        console.log(localStorage["auth"])
        console.log(JSON.parse(localStorage["auth"]).authenticated)
        window.location.reload()
    }   


    render(){
        
       return ( 
           <div>
           {this.clearInternal()}
           <Redirect to='/Login' />
           </div>
        )
    }
}

export default Logout;