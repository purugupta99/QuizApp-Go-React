import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

var board = []

class Leaderboard extends Component {
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
    
    this.handleGenre = this.handleGenre.bind(this);
    
}

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getgenre');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    handleGenre(event){
        this.state.formData.genre = event.target.value;
        if(this.state.formData.genre == "Overall"){
            const request = new Request('http://localhost:8080/getfullleader');
            fetch(request)
                .then(response => response.json())
                    .then(data => {this.setState({board: data})});
        }else{
            const request = new Request('http://localhost:8080/getleader/' + this.state.formData.genre);
            fetch(request)
                .then(response => response.json())
                    .then(data => {this.setState({board: data})});
        }
        //console.log(this.state.maxi)
    }

        // {
        //     for(var i=0;i<data.length;i++){
        //         board.push(data[i])
        //     }
        // }

    render () {

    return (
        <div className="App">
         {JSON.parse(localStorage["auth"]).authenticated &&
        <div>
            <header className="App-header">
              <h1 className="App-title">Leaderboard</h1>
            </header>
            
            <br/><br/>
            <div className="formContainer">
              <form>
                <div className="form-group form-inline">
                    <label>Genre</label> &nbsp; &nbsp;
                    <select value={this.state.genre} onChange={this.handleGenre}>
                        <option>Select Genre</option>
                    {this.state.data.map(function (item){
                        return(
                            <option key={item.id} value={item.genre}>{item.genre}</option>
                        )})
                    }
                        <option>Overall</option>
                     </select>
                     
                </div>
                <table className="table-hover">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Genre</th>
                    <th>Score</th>
                    <th>Quiz No.</th>
                    </tr>
                </thead>
                <tbody>
                {(this.state.formData.genre != "Select Genre" && this.state.formData.genre != "") && this.state.board.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.username}</td>
                      <td>{item.genre}</td>
                      <td>{item.score}</td>
                      <td>{item.quizno}</td>
                  </tr>
                )
             })
                
                }
                </tbody>
                </table>
              </form>
            </div>
        </div>
         }
         
    </div>
        
        );
    }
}
export default Leaderboard;