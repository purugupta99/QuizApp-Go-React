import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

class History extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
      },
      data:[],
      board:[],
      submitted: false,
      maxi: 1,
    }    
    
}

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/gethistory/' + JSON.parse(localStorage["auth"]).username);
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    render () {

    return (
        <div className="App">
         {JSON.parse(localStorage["auth"]).authenticated &&
        <div>
            <header className="App-header">
              <h1 className="App-title">Attempted Quizzes</h1>
            </header>
            
            <br/><br/>
                <table className="table-hover">
                <thead>
                    <tr>
                    <th>Genre</th>
                    <th>Quiz No.</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.genre}</td>
                      <td>{item.quizno}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })
                
                }
                </tbody>
                </table>
        </div>
         }
    </div>
        
        );
    }
}
export default History;