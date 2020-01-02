import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
// import Swal from "sweetalert2";
// import firebase from "firebase";
// let db = firebase.database();

class AllStudents extends Component{


    render(){
        return(
            <div>
               <Navbar/>
               <h2 className="adminHeading">All Students</h2>
            </div>
        )
    }
}

export default withRouter(AllStudents)


