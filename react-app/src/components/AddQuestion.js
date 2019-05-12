import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        quizno: "",
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
        type : "",
      },
      data: [],
      maxi: 1,
    }    
    
    this.handleGenre = this.handleGenre.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleOption1 = this.handleOption1.bind(this);
    this.handleOption2 = this.handleOption2.bind(this);
    this.handleOption3 = this.handleOption3.bind(this);
    this.handleOption4 = this.handleOption4.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
    this.handleAnswer1 = this.handleAnswer1.bind(this);
    this.handleAnswer2 = this.handleAnswer2.bind(this);
    this.handleAnswer3 = this.handleAnswer3.bind(this);
    this.handleAnswer4 = this.handleAnswer4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/getgenre');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({data: data}));

    }

    handleSubmit (event) {
        var cnt = 0
        if(this.state.formData.answer1 == true) cnt++
        if(this.state.formData.answer2 == true) cnt++
        if(this.state.formData.answer3 == true) cnt++
        if(this.state.formData.answer4 == true) cnt++
        if(cnt > 1){
            this.state.formData.type = "multiple"
        }else{
            this.state.formData.type = "single"
        }
        event.preventDefault();
        //console.log(this.state.data)
        //console.log(this.state.formData)
        if(this.state.formData.genre == "Select Genre" || this.state.formData.genre == ""){
            alert('Select a genre!')
        }else{
        fetch('http://localhost:8080/addquiz', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                alert('Question Submitted')}
                window.location.reload()
          });}
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
        console.log(this.state.maxi)
    }
    handleQuestion(event){
        this.state.formData.question = event.target.value;
    }
    handleOption1(event){
        this.state.formData.option1 = event.target.value;
    }
    handleOption2(event){
        this.state.formData.option2 = event.target.value;
    }
    handleOption3(event){
        this.state.formData.option3 = event.target.value;
    }
    handleOption4(event){
        this.state.formData.option4 = event.target.value;
    }
    handleQuizNo(event){
        this.state.formData.quizno = parseInt(event.target.value);
    }
    handleAnswer1(event){
        this.state.formData.answer1 = event.target.checked;
    }
    handleAnswer2(event){
        this.state.formData.answer2 = event.target.checked;
    }
    handleAnswer3(event){
        this.state.formData.answer3 = event.target.checked;
    }
    handleAnswer4(event){
        this.state.formData.answer4 = event.target.checked;
    }


    render () {
        
        return (
        
        <div className="App">
        {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&        
        <div>
            <header className="App-header">
              <h1 className="App-title">Add Question</h1>
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
                <div className="form-group">
                    <label>Question</label>
                    <input type="text" className="form-control" value={this.state.question} onChange={this.handleQuestion} required/>
                </div>
                <div className="form-group">
                    <label>Option 1</label>
                    <div className="form-inline">
                        <input type="checkbox" className="form-control" value={this.state.answer1} onClick={this.handleAnswer1}/> &nbsp;                   
                        <input type="text" className="form-control" value={this.state.option1} onChange={this.handleOption1} required/> 
                    </div>
                </div>
                <div className="form-group">
                    <label>Option 2</label>
                    <div className="form-inline">
                    <input type="checkbox" className="form-control" value={this.state.answer2} onClick={this.handleAnswer2}/> &nbsp;
                    <input type="text" className="form-control" value={this.state.option2} onChange={this.handleOption2} required/> 
                </div>
                </div>
                <div className="form-group">
                    <label>Option 3</label>
                    <div className="form-inline">
                    <input type="checkbox" className="form-control" value={this.state.answer3} onClick={this.handleAnswer3}/> &nbsp;
                    <input type="text" className="form-control" value={this.state.option3} onChange={this.handleOption3} required/> 
                    </div>
                    </div>
                <div className="form-group">
                    <label>Option 4</label>
                    <div className="form-inline">
                    <input type="checkbox" className="form-control" value={this.state.answer4} onClick={this.handleAnswer4}/> &nbsp;
                    <input type="text" className="form-control" value={this.state.option4} onChange={this.handleOption4} required/> 
                    </div>
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
export default AddQuestion;