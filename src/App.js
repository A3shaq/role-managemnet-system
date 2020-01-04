import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AdminProfile from "./Components/Profile/AdminProfile";
import CompanyProfile from "./Components/Profile/CompnayProfile";
import StudentProfile from "./Components/Profile/StudentProfile";
import Myjobs from "./Components/Job/MyJobs";
import Jobs from "./Components/Job/Jobs";
import AllStudents from "./Components/Students/AllStudent";
import AddStudentDetails from "./Components/Students/AddStudentDetails";
// import AllStudents from "/Components/Students/Student";
import AllJobs from "./Components/Job/AllJobs";
import AdminAllCompnies from "./Components/Admin/AdminAllCompanies";
import AdminAllJobs from "./Components/Admin/AdminAllJobs";
import AdminAllStudents from "./Components/Admin/AdminAllStudents";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin" component={AdminProfile} />
            <Route exact path="/company" component={CompanyProfile} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/myjobs" component={Myjobs} />
            <Route exact path="/allstudents" component={AllStudents} />
            <Route exact path="/students" component={StudentProfile} />
            <Route
              exact
              path="/addstudent/details"
              component={AddStudentDetails}
            />
            <Route exact path="/alljobs" component={AllJobs} />
            <Route exact path="/admin/all/compnies" component={AdminAllCompnies} />
            <Route exact path="/admin/all/jobs" component={AdminAllJobs} />
            <Route exact path="/admin/all/students" component={AdminAllStudents} />
            
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
