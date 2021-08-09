import "./../../App.css";
import React from "react";
import "../../css/landingPage.css";
import logo from "../Nav/fresh.png";

export default class Nav extends React.Component {
  /*just a simple navigation component, */

  state = {
    nav_state:true,
  }

  change(){
    this.setState(prevState => ({
      nav_state: !prevState.nav_state
    }));
  }

  change_and_prop_action(i){
    this.change();
    this.props.action(i);
  }

  
  render() {
    return (



      <div>
        <nav>
          {this.state.nav_state === false && 
          <img 
                    className="logo4"
                    src={logo}
                    alt="ismyroadfreshlogo2"
                    onClick={() => this.change_and_prop_action(1)}
          />
          }

          {this.state.nav_state === true &&
            <ul className="navs">
              <li onClick={() => this.props.action(2)}>About ismyroadfresh</li>
              <li onClick={() => this.change_and_prop_action(55)}>Get Started</li>
            </ul>
          }

        </nav>
      </div>
      
    );
  }
}
