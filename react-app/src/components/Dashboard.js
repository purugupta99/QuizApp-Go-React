import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './NewPerson.css';

class Dashboard extends Component{
    
render(){
    return <h1 className="text-center">Welcome, {JSON.parse(localStorage["auth"]).username}</h1>
}
}

export default Dashboard;