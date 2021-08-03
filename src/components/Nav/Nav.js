import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";
import { Link } from "react-router-dom";



export default class Nav extends React.Component{


/*just a simple navigation component, */

    
    render(){

    
        return (
            <nav>
                <ul className="navs">
                    <li onClick={() => this.props.action(1)}> 
                        About ismyroadfresh
                        
                    </li>
                    <li onClick={() => this.props.action(55)}>
                        Get Started
                    </li>
                </ul>
            </nav>
        );
    }
}
