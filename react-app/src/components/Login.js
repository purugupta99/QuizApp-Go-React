import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom'
import './NewPerson.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
      submitted: null,
      auth : {
        authenticated :null,
        username : null,
        admin : null,
      },
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData)
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
    
        if(response.status >= 200 && response.status < 300){
        this.setState({submitted: true});

        this.state.auth.authenticated = true;
        this.state.auth.username = this.state.formData.username;
        if(this.state.auth.username == "admin"){
            this.state.auth.admin = true;
        }else{
            this.state.auth.admin = false;
        }
        localStorage.setItem("auth",JSON.stringify(this.state.auth));
       
        window.location.reload()
        }
        else{
            this.state.auth.authenticated = false;
            this.state.auth.username = null;
            this.state.auth.admin = false;
            localStorage.setItem("auth",JSON.stringify(this.state.auth));
           
            alert('Wrong Credentials');
        }
      });
  }

//   authenticate(){
//       return this.state.formData.password === 
//   }

  handleUsername(event){
    this.state.formData.username = event.target.value;
}

  handlePassword(event) {
    this.state.formData.password = event.target.value;
  }


  render () {

    return (
    
    <div className="App">
    {!JSON.parse(localStorage["auth"]).authenticated &&
    <div>
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername} required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword} required/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        </div>
    }
    {JSON.parse(localStorage["auth"]).authenticated &&
        <Redirect to='/Dashboard'/>
    }
        {this.state.submitted &&
          <div>
            <h2>
                Please Wait.
            </h2>
            <Redirect to='/Dashboard'  />
          </div>
        }
        {!this.state.submitted && this.state.submitted != null &&
          <div>
            <h2>
                Incorrect Username/Password
            </h2>
          </div>
        }
    
      </div>
    );
  }
}

export default Login;
