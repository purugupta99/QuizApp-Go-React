import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

class AddGenre extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quizno: "",
      },
    }    
    
    this.handleGenre = this.handleGenre.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
}


    handleSubmit (event) {
        event.preventDefault();
        console.log(this.state.formData)
        fetch('http://localhost:8080/addgenre', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                alert('Genre Added')}
                //window.location.reload()
          });
        }

    handleGenre(event){
        this.state.formData.genre = event.target.value;
    }
    handleQuizNo(event){
        this.state.formData.quizno = parseInt(event.target.value);
    }


    render () {

        return (
        
        <div className="App">
        {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
        <div>
            <header className="App-header">
              <h1 className="App-title">Create New Quiz</h1>
            </header>
            
            <br/><br/>
            <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGenre} required/>
                </div>
                <div className="form-group">
                    <label>Number of Quiz</label>
                    <input type="number" className="form-control" min="1" value={this.state.quizno} onChange={this.handleQuizNo} required/>
                </div>
                    <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
            </div>
        }
        {(!JSON.parse(localStorage["auth"]).authenticated || !JSON.parse(localStorage["auth"]).admin) &&
            <h2>Do not have Admin Privileges</h2>
        }
          </div>
        );
    }
}
export default AddGenre;