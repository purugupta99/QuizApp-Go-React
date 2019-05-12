import React, { Component } from 'react';
import EditQuiz from './EditQuiz';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import NewUser from './NewUser';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard';
import AddQuestion from './AddQuestion';
import AddGenre from './CreateGenre';
import Play from './Play';
import Quiz from './Quiz';
import Leaderboard from './Leaderboard';
import History from './History';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                {!JSON.parse(localStorage["auth"]).authenticated &&
                <ul className="nav navbar-nav">
                  <li><Link to={'/NewUser'}>Sign Up</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                </ul>
                }
                {JSON.parse(localStorage["auth"]).authenticated && !JSON.parse(localStorage["auth"]).admin &&
                <ul className="nav navbar-nav">
                  <li><Link to={'/Dashboard'}>Dashboard</Link></li>
                  <li><Link to={'/Play'}>Play</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/History'}>History</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
                }
                {JSON.parse(localStorage["auth"]).authenticated && JSON.parse(localStorage["auth"]).admin &&
                <ul className="nav navbar-nav">
                  <li><Link to={'/Dashboard'}>Dashboard</Link></li>
                  <li><Link to={'/Play'}>Play</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/History'}>History</Link></li>
                  <li><Link to={'/EditQuiz'}>Edit Quiz</Link></li>
                  <li><Link to={'/ViewPeople'}>View Users</Link></li>
                  <li><Link to={'/AddGenre'}>Add Genre</Link></li>
                  <li><Link to={'/AddQuestion'}>Add Quiz</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
                }
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Dashboard} />
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/EditQuiz' component={EditQuiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/NewUser' component={NewUser} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Dashboard' component={Dashboard} />
                 <Route exact path='/Play' component={Play} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/History' component={History} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/AddGenre' component={AddGenre} />
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/Logout' component={Logout} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
