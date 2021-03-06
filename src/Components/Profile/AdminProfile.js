import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
import { signOut } from "../../Config/SignOut";
import { roleType } from "../../Config/Constants";

class AdminProfile extends Component {
 componentDidMount(){
  let user = JSON.parse(localStorage.getItem("userID"));
  if (user && user.userRole) {
    if (user.userRole === roleType.roleAdmin) {
      this.props.history.push("/admin");
    } else {
      if (user.userRole === roleType.roleStudent) {
        // return <Redirect to="/jobs" />;
        this.props.history.push("/students");
        return;
      } else if (user.userRole === roleType.roleCompany) {
        this.props.history.push("/company");
        return;
      }
    }
  }
 }

  allCompanies =()=>{
      this.props.history.push('/admin/all/compnies')
  }

  
  allJobs =()=>{
    this.props.history.push('/admin/all/jobs')
}


allStudents =()=>{
    this.props.history.push('/admin/all/students')
}


  render() {
    return (
      <div>
        <Navbar signOut={signOut} />
        <h2 className="adminHeading">Admin Profile</h2>

        <div className="row">
          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
                onClick={this.allCompanies}
            >
              All Companies
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.allStudents}
            >
              All Students
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
                onClick={this.allJobs}
            >
              All Jobs
              <i className="material-icons right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AdminProfile);
