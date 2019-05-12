import React, { Component } from 'react';
import './ViewPeople.css';

var deleteid = {}

function handleOption(event){
  deleteid[event.target.value] = event.target.checked
  console.log(deleteid)

}

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
        formData: {
            genre: "",
          },
        edit :{
            id: 0,
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
            type :"",
        },
          data:[],
          info:{
            genre:"",
            quizno:0,
          },
          question:[],
          submitted: false,
          maxi: 1,
    }
    
    this.handleGenre = this.handleGenre.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleID = this.handleID.bind(this);
  }

    handleQuestion(event){
        this.state.edit.question = event.target.value;
        this.setState({edit : this.state.edit})
    }
    handleOption1(event){
        this.state.edit.option1 = event.target.value;
        this.setState({edit : this.state.edit})        
    }
    handleOption2(event){
        this.state.edit.option2 = event.target.value;
        this.setState({edit : this.state.edit})

    }
    handleOption3(event){
        this.state.edit.option3 = event.target.value;
        this.setState({edit : this.state.edit})

    }
    handleOption4(event){
        this.state.edit.option4 = event.target.value;
        this.setState({edit : this.state.edit})

    }
    handleAnswer1(event){
        this.state.edit.answer1 = event.target.checked;
        this.setState({edit : this.state.edit})

    }
    handleAnswer2(event){
        this.state.edit.answer2 = event.target.checked;
        this.setState({edit : this.state.edit})

    }
    handleAnswer3(event){
        this.state.edit.answer3 = event.target.checked;
        this.setState({edit : this.state.edit})

    }
    handleAnswer4(event){
        this.state.edit.answer4 = event.target.checked;
        this.setState({edit : this.state.edit})

    }
    handleID(event){
        this.state.edit.id = event.target.value;
        this.setState({edit : this.state.edit})

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
        //console.log(genre,quizno)
        const request = new Request('http://127.0.0.1:8080/getques/' + this.state.formData.genre +'/'+ this.state.formData.quizno);
        fetch(request)
        .then((response) => response.json())
                .then(data => {
                    this.setState({question : data})
                    
                });
    }

    handleSubmit(event) {
        console.log(deleteid)
        var i
        //event.preventDefault();
        var key = event.target.value
        
        fetch("http://localhost:8080/getques/"+key, {
        method: 'DELETE',
        })
        window.location.reload()
    }
    
    handleEdit(event) {

        var cnt = 0
        if(this.state.edit.answer1 == true) cnt++
        if(this.state.edit.answer2 == true) cnt++
        if(this.state.edit.answer3 == true) cnt++
        if(this.state.edit.answer4 == true) cnt++
        if(cnt > 1){
            this.state.edit.type = "multiple"
        }else{
            this.state.edit.type = "single"
        }

        fetch('http://localhost:8080/editques/' + this.state.edit.id, {
            method: 'PUT',
            body: JSON.stringify(this.state.edit),
          })
             .then(response => {
               if(response.status >= 200 && response.status < 300){
                   alert('Question Updated')}
                   window.location.reload()
             });
           
     }

  render() {
    
    return (
      <div className="App">
        {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
        <div>
        <header className="App-header">
          <h1 className="App-title">Edit Quiz</h1>
        </header>
        <div className="formContainer">
          <br/><br/>
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
                </div>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Answer 1</th>
              <th>Answer 2</th>
              <th>Answer 3</th>
              <th>Answer 4</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.question.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.question}</td>
                      <td>{item.option1}</td>
                      <td>{item.option2}</td>
                      <td>{item.option3}</td>
                      <td>{item.option4}</td>
                      <td>{String(item.answer1)}</td>
                      <td>{String(item.answer2)}</td>
                      <td>{String(item.answer3)}</td>
                      <td>{String(item.answer4)}</td>
                      <td><button type="button" className="btn btn-default" data-toggle="modal" data-target={String('#'+item.id)}>Edit</button></td>
                      <div id={item.id} className="modal fade" role="dialog">
                        <div className="modal-dialog">

                            <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Edit Question</h4>
                            </div>
                            <div className="modal-body">
                            <form className="form-horizontal" role="form" id={item.id} onSubmit={this.handleEdit}>
                            <div className="form-group">
                                <label  className="col-sm-2 control-label">Question</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control"  placeholder={item.question} onChange={this.handleQuestion}/>
                                </div>
                            </div>
                            <div className="form-group">
                            <label  className="col-sm-2 control-label">Option 1</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder={item.option1} onChange={this.handleOption1}/>
                                </div>
                            </div>
                            <div className="form-group">
                            <label  className="col-sm-2 control-label">Option 2</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder={item.option2}  onChange={this.handleOption2}/>
                                </div>
                            </div>
                            <div className="form-group">
                            <label  className="col-sm-2 control-label">Option 3</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder={item.option3}  onChange={this.handleOption3}/>
                                </div>
                            </div>
                            <div className="form-group">
                            <label  className="col-sm-2 control-label">Option 4</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"  placeholder={item.option4}  onChange={this.handleOption4}/>
                                </div>
                            </div>
                            <div className="form-group">
                            <label  className="col-sm-2 control-label">Answer 1</label>
                                <div className="col-sm-1">
                                    <input type="checkbox" className="form-control"  placeholder={item.answer1}  onChange={this.handleAnswer1}/>
                                </div>
                           
                            <label  className="col-sm-2 control-label">Answer 2</label>
                                <div className="col-sm-1">
                                    <input type="checkbox" className="form-control"  placeholder={item.answer2} onChange={this.handleAnswer2}/>
                                </div>
                           
                            <label  className="col-sm-2 control-label">Answer 3</label>
                                <div className="col-sm-1">
                                    <input type="checkbox" className="form-control"  placeholder={item.answer3} onChange={this.handleAnswer3}/>
                                </div>
                           
                            <label  className="col-sm-2 control-label">Answer 4</label>
                                <div className="col-sm-1">
                                    <input type="checkbox" className="form-control"  placeholder={item.answer4} onChange={this.handleAnswer4}/>
                                </div>
                            </div>
                            <div>
                                <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" value={item.id} onClick={this.handleID} className="btn btn-default">Submit</button>
                                </div>
                            </div>
                            </form>
                
                            </div>
                            <div className="modal-footer">
            
                            </div>
                            </div>

                            </div>
                            </div>           
                      <td><button type="button" className="btn btn-default" value={item.id} onClick={this.handleSubmit}>Delete</button></td>         
                  </tr>
                )
             },this)}
          </tbody>
       </table>
       </div>
       }
       {(!JSON.parse(localStorage["auth"]).authenticated || !JSON.parse(localStorage["auth"]).admin) &&
            <h2>Do not have Admin Privileges</h2>
       }
      </div>
    );
  }
}

export default EditQuiz;
