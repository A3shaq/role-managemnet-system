import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";

class AdminProfile extends Component {
  constructor() {
    super();
    this.state = {};
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
        <Navbar />
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
