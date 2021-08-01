import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";
import logo from "../Titlepage/ismyroadfresh.png";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Title extends Component{


/*just a simple navigation component, */


    render(){

        

        
        return (
            <div className="title">
                <img 
                    className="logo"
                    src={logo}
                    alt="ismyroadfreshlogo"
                />
                <div>
                    <button className="btn btn-success">Let's roll</button>
                </div>

            </div>
        );

    }
}
