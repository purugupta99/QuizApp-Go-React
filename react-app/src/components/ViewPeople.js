import React, { Component } from 'react';
import './ViewPeople.css';

var deleteid = {}

function handleOption(event){
  deleteid[event.target.value] = event.target.checked
  console.log(deleteid)

}

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/getuser');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

 

  handleSubmit(event) {
    console.log(deleteid)
    var i
    //event.preventDefault();
    for(var key in deleteid) {
      if(deleteid[key] == true){
    fetch("http://localhost:8080/getuser/"+key, {
     method: 'DELETE',
      }
  )}
  
  }
}

  render() {
    return (
      <div className="App">
        {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
        <div>
        <header className="App-header">
          <h1 className="App-title">View All Users</h1>
        </header>
      
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-default">Submit</button>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>E-Mail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td><input type="checkbox" className="form-control" value={item.id} onClick={handleOption}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
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

export default ViewPeople;
