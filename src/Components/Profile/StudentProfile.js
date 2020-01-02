import React , {Component} from 'react';
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";


class StudentProfile extends Component {
    constructor (){
        super()
        this.state ={
            
        }
    }

render (){
    return (
        <div>
            <Navbar/>
            <h2 className="adminHeading">Student Dashboard</h2>

        </div>
    )
}
    
}

export default withRouter(StudentProfile)