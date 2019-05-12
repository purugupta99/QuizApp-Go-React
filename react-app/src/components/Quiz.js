import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import  { Redirect } from 'react-router-dom';
import './NewPerson.css';
import axios from 'axios';

//var question = []
//window.location.reload()
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
        formData :{
            answer1 : false,
            answer2 : false,
            answer3 : false,
            answer4 : false,
        },
        addLeader :{
            username : "",
            genre : "",
            score : 0,
            quizno: 0,
        },
        rem:{
            a1 :false,
            a2 :false,
            a3 :false,
            a4 :false,
        },
        pass : "",
      question :[],
      data:[],
      currques : 0,
      score : 0,
      q : [],
      start : false,
      finish : false,
      hint : false,
      removeOp : false,
    }    
    this.handleAnswer1 = this.handleAnswer1.bind(this);
    this.handleAnswer2 = this.handleAnswer2.bind(this);
    this.handleAnswer3 = this.handleAnswer3.bind(this);
    this.handleAnswer4 = this.handleAnswer4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleHint = this.handleHint.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

}

    refresh = () =>{
        this.state.rem.a1 = false
        this.state.rem.a2 = false
        this.state.rem.a3 = false
        this.state.rem.a4 = false
    }

    componentDidMount() {
        var genre = JSON.parse(localStorage["genre"]).genre
        var quizno = JSON.parse(localStorage["genre"]).quizno
        //console.log(genre,quizno)
        const request = new Request('http://127.0.0.1:8080/getques/' + genre +'/'+ quizno);
        fetch(request)
        .then((response) => response.json())
                .then(data => {
                    //console.log(data);
                    this.setState({question : data})
                    this.state.question.push("a")
                });
        //console.log(this.state.question) 
    }
    handleSubmit (event) {
        event.preventDefault();
        this.state.start = true
        
        if(this.state.q.type=="multiple"){
        if(this.state.formData.answer1 ==  this.state.q.answer1 && this.state.formData.answer2 ==  this.state.q.answer2 && this.state.formData.answer3 ==  this.state.q.answer3 && this.state.formData.answer4 ==  this.state.q.answer4){
            this.state.score = this.state.score + 10 
        }
    }
        else if(this.state.q.type == "single")
        {
            var current = document.querySelector('input[name="ans"]:checked').value;
            //console.log(current,this.state.q.option1, this.state.q.answer1,this.state.q.answer2,this.state.q.answer3,this.state.q.answer4)
            if(current == "true"){
                this.state.score = this.state.score + 10
            }

        }
        this.state.q = []
        //console.log(this.state.question.length)
        if(this.state.currques+1 < this.state.question.length){
            this.setState({currques : this.state.currques + 1})
        } else {
            
            this.state.addLeader.username = JSON.parse(localStorage["auth"]).username
            //console.log(this.state.addLeader.user)
            this.state.addLeader.genre = JSON.parse(localStorage["genre"]).genre
            this.state.addLeader.score = parseInt(this.state.score)
            this.state.addLeader.quizno = parseInt(JSON.parse(localStorage["genre"]).quizno)
            //console.log('This is quizno' + this.state.addLeader.quiz_no)
            //alert('hi')
            fetch('http://localhost:8080/addleader', {
                method: 'POST',
                body: JSON.stringify(this.state.addLeader),
            })
            .then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.state.pass = "pass"
              }});
            alert('Your Score is ' + this.state.score)
                // .then(response => {
                //     if(response.status >= 200 && response.status < 300){
                        
                // });

            this.setState({finish : true})
            //this.state.finish = true
        }
        //console.log(this.state.currques)
        this.state.q=this.state.question[this.state.currques]
        //console.log(this.state.score)
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
    handleHint(event){
        this.setState({hint: true})
        if(this.state.q.answer1){
            //<h2>First </h2>
            alert('Answer: First')
        }
        if(this.state.q.answer2){
            //<h2>Second </h2>
            alert('Answer: Second')
        }
        if(this.state.q.answer3){
            //<h2>Third </h2>
            alert('Answer: Third')
        }
        if(this.state.q.answer4){
           // <h2>Fourth </h2>
           alert('Answer: Fourth')
        }
        
    }

    handleRemove(event){
        var chk = true;
       // this.state.removeOp = true
        if(!this.state.q.answer1 && chk){
            //<h2>First </h2>
            this.state.rem.a1 = true
            chk = false
        }
        if(!this.state.q.answer2 && chk){
            //<h2>Second </h2>
            this.state.rem.a2 = true
            chk = false            
        }
        if(!this.state.q.answer3 && chk){
            //<h2>Third </h2>
            this.state.rem.a3 = true
            chk = false            
        }
        if(!this.state.q.answer4 && chk){
           // <h2>Fourth </h2>
           this.state.rem.a4 = true
           chk = false           
        }
        this.setState({removeOp: true})
        
    }
    
    render () {
        
        return (
        <div className="App">
        {
            this.state.finish &&
            <Redirect to='/Dashboard'/>
        }
        {JSON.parse(localStorage["auth"]).authenticated && !this.state.start &&
             <div>
        
             <header className="App-header">
               <h1 className="App-title">Quiz on {JSON.parse(localStorage["genre"]).genre}</h1>
             </header>
             
             
             <div className="formContainer">
               <form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                 <br/> <br/>
                 <button type="submit" className="btn btn-default">Start Quiz</button>
                 </div>
                </form>
            </div>
            </div>
        }
         {JSON.parse(localStorage["auth"]).authenticated && this.state.start && this.state.q.type == "multiple" &&
        <div>
        
            <header className="App-header">
              <h1 className="App-title">Quiz on {JSON.parse(localStorage["genre"]).genre}</h1>
            </header>
            
            
            <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div>
                        <h3> {this.state.q.question} </h3>
                        <div className="form-inline">
                            <input type="checkbox" className="form-control" value={this.state.q.answer1} onClick={this.handleAnswer1}/> &nbsp;
                            <h4> {this.state.q.option1} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="checkbox" className="form-control" value={this.state.q.answer2} onClick={this.handleAnswer2}/> &nbsp;
                            <h4> {this.state.q.option2} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="checkbox" className="form-control" value={this.state.q.answer3} onClick={this.handleAnswer3}/> &nbsp;
                            <h4> {this.state.q.option3} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="checkbox" className="form-control" value={this.state.q.answer4} onClick={this.handleAnswer4}/> &nbsp;
                            <h4> {this.state.q.option4} </h4>
                        </div>
                     </div>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>

              </form>
            </div>
            
        </div>
         }
         {
             JSON.parse(localStorage["auth"]).authenticated && this.state.q.type == "multiple" && this.state.hint == false && this.state.start &&
             <div>
                 <br/>
                 <button className="btn btn-default" onClick={this.handleHint}>Get Answer</button>
             </div>
                 
         }
          
         {JSON.parse(localStorage["auth"]).authenticated && this.state.start && this.state.q.type == "single" &&
        <div>
        
            <header className="App-header">
              <h1 className="App-title">Quiz on {JSON.parse(localStorage["genre"]).genre}</h1>
            </header>
            
            
            <div className="formContainer">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    
                    <div>
                        <h3> {this.state.q.question} </h3>
                        <div className="form-inline">
                            <input type="radio" className="form-control" name="ans" value={this.state.q.answer1} disabled={this.state.rem.a1}/> &nbsp;
                            <h4> {this.state.q.option1} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="radio" className="form-control" name="ans" value={this.state.q.answer2} disabled={this.state.rem.a2}/> &nbsp;
                            <h4> {this.state.q.option2} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="radio" className="form-control" name="ans" value={this.state.q.answer3} disabled={this.state.rem.a3} defaultChecked/> &nbsp;
                            <h4> {this.state.q.option3} </h4>
                        </div>
                        <div className="form-inline">
                            <input type="radio" className="form-control" name="ans" value={this.state.q.answer4} disabled={this.state.rem.a4}/> &nbsp;
                            <h4> {this.state.q.option4} </h4>
                        </div>
                     </div>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>

              </form>
            </div>
            
        </div>
         }
         {
             JSON.parse(localStorage["auth"]).authenticated && this.state.q.type == "single" && this.state.hint == false && this.state.start &&
             <div>
                 <br/>
                 <button className="btn btn-default" onClick={this.handleHint}>Get Answer</button>
             </div>
                 
         }
         {
             JSON.parse(localStorage["auth"]).authenticated && this.state.q.type == "single" && this.state.removeOp == false && this.state.start &&
             <div>
                 <br/>
                 <button className="btn btn-default" onClick={this.handleRemove}>75%-25%</button>
             </div>
                 
         }
         {
             JSON.parse(localStorage["auth"]).authenticated && this.state.q.type == "single" && this.state.removeOp == true && this.state.start &&
             <div>
                 {this.refresh()}
             </div>
                 
         }
    </div>
        
        );
    }
}
export default Quiz;