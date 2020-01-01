import React , {Component} from 'react';
import Navbar from "../Navbar/Navbar";

export default class CompanyProfile extends Component {
    constructor (){
        super()
        this.state ={
            
        }
    }

render (){
    return (
        <div>
            <Navbar/>
            <h2 className="adminHeading">Student Profile</h2>

        </div>
    )
}
    
}