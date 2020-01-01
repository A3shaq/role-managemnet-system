import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import Jobs from "../Job/Jobs";

export default class CompanyProfile extends Component {
  constructor() {
    super();
    this.state = {
      flag: false
    };
  }

  pageChange = ()=>{
      this.setState({flag:true})
  }
  render() {
    let { flag } = this.state;
    return (
      <div>
        {/* {this.renderPostJobs()} */}
        <Navbar />
        <h2 className="adminHeading">Company Profile</h2>

        {flag === true ? (
          <Jobs  />
        ) : (
          <div>
            {" "}
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.pageChange}
            >
              Job Post
              <i className="material-icons right"></i>
            </button>
          </div>
        )}
      </div>
    );
  }
}
