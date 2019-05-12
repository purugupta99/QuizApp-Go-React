import React, { Component } from 'react';
import './NewPerson.css';

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
        re_enter: "",
        email: "",
      },
      passchk : null,
      submitted: null,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleReenter = this.handleReenter.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    
    console.log(this.state.formData.password == this.state.formData.re_enter)

    if (this.state.formData.password == this.state.formData.re_enter){
    fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
        this.setState({passchk: true});
        this.setState({submitted: true});
        }
      });
  }else
{
    this.setState({passchk: false});
}}

  handleNameChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePassword(event) {
    this.state.formData.password = event.target.value;
  }
  handleReenter(event){
    this.state.formData.re_enter = event.target.value;
    if(this.state.formData.password == this.state.formData.re_enter || this.state.formData.re_enter=="")
    {
        this.setState({passchk: true});
    }
    else
    {
        this.setState({passchk: false});
    }
  }
  handleEmail(event){
      this.state.formData.email = event.target.value;
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up for New Account</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleNameChange} required/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail} required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword} required/>
            </div>
            <div className="form-group">
                <label>Re-Enter Password</label>
                <input type="password" className="form-control" value={this.state.re_enter} onChange={this.handleReenter} required/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        
        {this.state.passchk==false && 
          <div>
            <h2>
              Passwords do not Match
            </h2>
          </div>
        }
        {this.state.submitted &&
          <div>
            <h2>
              New User has been successfully added
            </h2>
          </div>
        }
        {!this.state.submitted && this.state.submitted != null &&
          <div>
            <h2>
              Username already Exists
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default NewUser;
