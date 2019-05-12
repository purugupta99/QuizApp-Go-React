import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
      },
      data:[],
      info:{
        genre:"",
        quizno:"",
      },
      submitted: false,
      maxi: 1,
    }    
    
    this.handleGenre = this.handleGenre.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getgenre');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    handleGenre(event){
        this.state.formData.genre = event.target.value;
        var i
        for(i=0;i<this.state.data.length;i++)
        {
            //console.log(this.state.data[i])
            if(this.state.data[i].genre == this.state.formData.genre){
                this.setState({maxi : this.state.data[i].quizno})
            }
        }
        //console.log(this.state.maxi)
    }

    handleQuizNo(event){
        this.state.formData.quizno = parseInt(event.target.value);
    }

    handleSubmit (event) {
        this.state.info.genre = this.state.formData.genre
        this.state.info.quizno = this.state.formData.quizno
        localStorage.setItem("genre",JSON.stringify(this.state.info));
        this.setState({submitted : true})
        }

    render () {
        var i
    return (
        <div className="App">
         {JSON.parse(localStorage["auth"]).authenticated &&
        <div>
            <header className="App-header">
              <h1 className="App-title">Select Genre and Quiz Number</h1>
            </header>
            
            <br/><br/>
            <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Genre</label> &nbsp; &nbsp;
                    <select value={this.state.genre} onChange={this.handleGenre}>
                        <option>Select Genre</option>
                    {this.state.data.map(function (item){
                        return(
                            <option key={item.id} value={item.genre}>{item.genre}</option>
                        )})
                    }
                     </select>
                </div>
                {(this.state.formData.genre != "Select Genre" && this.state.formData.genre != "") &&
                <div className="form-group">
                    <label>Quiz No</label>
                    <input type="number" className="form-control" value={this.state.quizno} onChange={this.handleQuizNo} min="1" max={this.state.maxi}  />
                    <b>Select value between 1 and {this.state.maxi}</b>
                </div>}
                    <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
            {this.state.submitted &&
                <Redirect to="/Quiz"/>
            }
        </div>
         }
    </div>
        
        );
    }
}
export default Play;