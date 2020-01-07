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
import UpdateStudentDetails from "./Components/Students/UpdateStudentDetails";
import AllJobs from "./Components/Job/AllJobs";
import AdminAllCompnies from "./Components/Admin/AdminAllCompanies";
import AdminAllJobs from "./Components/Admin/AdminAllJobs";
import AdminAllStudents from "./Components/Admin/AdminAllStudents";

class App extends Component {
  constructor(props){
    super(props);
    window.addEventListener("storage",(e)=>{
      this.forceUpdate()
   })
  }
  
  render() {
    let local = JSON.parse(localStorage.getItem("userID"));
    console.log("LOCAL", local)
    return (
      <div className="App">
        <Router>
          <Switch>
       
            {local && local.userRole === 20 && (
              <Route exact path="/company" component={CompanyProfile} />
            )}
            {local && local.userRole === 20 && (
              <Route exact path="/jobs" component={Jobs} />
            )}
            {local && local.userRole === 20 && (
              <Route exact path="/myjobs" component={Myjobs} />
            )}
            {local && local.userRole === 20 && (
              <Route exact path="/allstudents" component={AllStudents} />
            )}

            {local && local.userRole === 10 && (
              <Route exact path="/students" component={StudentProfile} />
            )}
            {local && local.userRole === 10 && (
              <Route
                exact
                path="/addstudent/details"
                component={AddStudentDetails}
              />
            )}

            {local && local.userRole === 10 && (
              <Route
                exact
                path="/updatestudent/details"
                component={UpdateStudentDetails}
              />
            )}
            {local && local.userRole === 10 && (
              <Route exact path="/alljobs" component={AllJobs} />
            )}

            {local && local.userRole === 30 && (
              <Route exact path="/admin" component={AdminProfile} />
            )}
            {local && local.userRole === 30 && (
              <Route
                exact
                path="/admin/all/compnies"
                component={AdminAllCompnies}
              />
            )}
            {local && local.userRole === 30 && (
              <Route
                exacts
                path="/admin/all/students"
                component={AdminAllStudents}
              />
            )}
            {local && local.userRole === 30 && (
              <Route exact path="/admin" component={AdminProfile} />
            )}
            {local && local.userRole === 30 && (
              <Route exact path="/admin/all/jobs" component={AdminAllJobs} />
            )}

            {/* {local && local.userRole === 30 && (
              <React.Fragment></React.Fragment>
            )} */}

            <Route exact path="/register" component={Register} />
            <Route path="/" component={Login} />
          
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
