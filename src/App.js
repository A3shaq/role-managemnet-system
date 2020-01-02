import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Proile from "./Components/Profile/Profile"
import CompanyProfile from './Components/Profile/CompnayProfile'
import StudentProfile from './Components/Profile/StudentProfile'
import Myjobs from './Components/Job/MyJobs'
import Jobs from "./Components/Job/Jobs";


class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
    
        <Router>
          <Switch>
            <Route exact path="/" component={Login} /> 
             <Route exact path="/register" component={Register} />
             <Route exact path="/profile" component={Proile} />
             <Route exact path="/company" component={CompanyProfile} />
             <Route exact path="/jobs" component={Jobs} /> 
             <Route exact path="/myjobs" component={Myjobs} />
             <Route exact path="/students" component={StudentProfile} />
           
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
