import "./../../App.css";
import React from "react";
import "../../css/landingPage.css";
import logo from "../Nav/fresh.png";

export default class Nav extends React.Component {
  /*just a simple navigation component, */

  state = {
    nav_state:this.props.nav_state,
    about:false,
  }
 
  change(){
    this.setState(prevState => ({
      nav_state: !prevState.nav_state
    }));
  }

  change_and_prop_action(i){
    this.change();
    this.props.action(i);
    this.setState({
      about: false,
    });
  }

  about_and_prop_action(i){
    this.setState({
      about: true,
    });
    this.props.action(i);
  }

  
  render() {
    
    return (



      <div>
        <nav>
          {(this.state.nav_state === false || this.props.nav_state === false) &&
          <img 
                    className="logo4"
                    src={logo}
                    alt="ismyroadfreshlogo2"
                    onClick={() => this.change_and_prop_action(1)}
          />
          }

          {(this.state.nav_state === true && this.props.nav_state === true && this.state.about === false) &&
            <ul className="navs">
              <li onClick={() => this.about_and_prop_action(2)} >About ismyroadfresh</li>
              <li onClick={() => this.change_and_prop_action(55)}>Get Started</li>
            </ul>
          }

          {(this.state.nav_state === true && this.props.nav_state === true && this.state.about === true) &&
            <ul className="navs">
              <li onClick={() => this.about_and_prop_action(2)} style={{backgroundColor: `rgba(${0}, ${0}, ${0}, ${5})`}}>About ismyroadfresh</li>
              <li onClick={() => this.change_and_prop_action(55)}>Get Started</li>
            </ul>
          }

        </nav>
      </div>
      
    );
  }
}
