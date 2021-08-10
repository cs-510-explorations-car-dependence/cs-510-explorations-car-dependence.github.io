import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";
import logo from "../Titlepage/ismyroadfresh.png";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Title extends Component{


/*just a simple navigation component, */


    render(){

        

        
        return (
            <div className="title text-center">
                <img 
                    className="logo"
                    src={logo}
                    alt="ismyroadfreshlogo"
                />
                <h4 className="mb-3 phrase">See Road Emissions with a Click and a Drag</h4>
                <div>
                    <button className="btn btn-success" onClick={() => this.props.action(3)}>Let's roll</button>
                </div>

            </div>
        );

    }
}
