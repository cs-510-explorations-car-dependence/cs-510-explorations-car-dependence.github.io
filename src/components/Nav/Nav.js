import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";


export default class Nav extends Component{


/*just a simple navigation component, */


    render(){

        

        
        return (
            <nav>
                <ul className="navs">
                    
                    <li >
                        
                            About ismyroadfresh
                        
                    </li>
    
                    <li >
                           freshers
                    </li>
                    <li>
                        
                            Get Started
                        
                    </li>
                </ul>
            </nav>
        );

    }
}
