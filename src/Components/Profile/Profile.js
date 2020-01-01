import React, { Component } from "react";
import Navbar from '../Navbar/Navbar'

export default class Profile extends Component {
    constructor (){
        super()
        this.state ={
            
        }
    }

    render(){
        return(
            <div>
                  <Navbar />
                  <h2 className="adminHeading">Admin Profile</h2>

            </div>
        )
    }
}
