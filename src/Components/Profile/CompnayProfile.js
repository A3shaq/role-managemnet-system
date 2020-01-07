import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
import { signOut } from "../../Config/SignOut";



class CompanyProfile extends Component {
  jobsPage = () => {
    this.props.history.push("/jobs");
  };
  myJobsPage = () => {
    this.props.history.push("/myjobs");
  };
  allStudents =()=>{
    this.props.history.push("/allstudents")
  }
  render() {
    return (
      <div>
        {/* {this.renderPostJobs()} */}
        <Navbar  signOut ={signOut}/>
        <h2 className="adminHeading">Company Dashboard</h2>

        <div className="row"> 
        <div className="col-4">
        <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.jobsPage}
          >
            Job Post
            <i className="material-icons right"></i>
          </button>
        </div>


        <div className="col-4">
        <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.myJobsPage}
          >
           My JObs
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
       
        </div>
      </div>
    );
  }
}

export default withRouter(CompanyProfile);
