import React, { Component } from 'react';
import './DeletePerson.css';

var idToBeDeleted=[];

function handleOptionChange(event) 
{
  if (idToBeDeleted.includes(event.target.value))
  {
    for( var i = 0; i < idToBeDeleted.length-1; i++)
    { 
      if ( idToBeDeleted[i] === event.target.value) 
      {
        idToBeDeleted.splice(i, 1); 
      }
    }
  }
  else
  {
    idToBeDeleted.push(event.target.value)
  }
}


class DeletePerson extends Component {
   constructor() {
    super();
    this.state = {
      data: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleSubmit(event) {
    var i
    event.preventDefault();
    for(i=0;i<idToBeDeleted.length;i++) {
    fetch("http://localhost:8080/people/"+idToBeDeleted[i], {
     method: 'DELETE',
   })
  }
    this.componentDidMount()
  }
  render() {
    return (
      
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete People</h1>
        </header>
        {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-default">Submit</button>
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                      <td><input type="checkbox" className="form-control" value={item.id} onClick={handleOptionChange}/></td> 
                  </tr>
                )
             })}
              </tbody>
            </table>
          </form>
          }
        </div>
        {this.state.submitted && 
        <h2>
          People successfully deleted.
        </h2>
        }
        </div>
    )
  }
}

export default DeletePerson;