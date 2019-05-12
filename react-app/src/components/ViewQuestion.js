import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
        data:[],
    }    
    
    this.handleGenre = this.handleGenre.bind(this);
}

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getgenre/');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));

        console.log(data)
    }

    handleSubmit (event) {
        event.preventDefault();
        console.log(this.state.formData)
        fetch('http://localhost:8080/getgenre', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            this.setState({data : response.data});
            console.log(this.state.data);
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                alert('Question Submitted')}
                //window.location.reload()
          });
        }

    handleGenre(event){
        this.state.formData.genre = event.target.value;
    }

    render () {

        return (
        
        <div className="App">
         {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
        <div>
            <header className="App-header">
              <h1 className="App-title">Select Genre</h1>
            </header>
            
            <br/><br/>
            {this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td><input type="radio" name="genre" value={item.genre}/></td>    
                  </tr>
                )
             })}
        </div>
        }
        {(!JSON.parse(localStorage["auth"]).authenticated || !JSON.parse(localStorage["auth"]).admin) &&
            <h2>Do not have Admin Privileges</h2>
        }
          </div>
        );
    }
}
export default AddQuestion;