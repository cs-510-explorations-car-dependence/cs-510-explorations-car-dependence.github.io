import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../Nav/Nav";
import Title from "../Titlepage/Title";
import MapCom from "../Map/MapCom";
import About from "../About/About";


export default class Face extends Component{




    state = {
        intro: true,
        about: false,
        map: false,
        navs: true,
    }


    constructor(props){
        super(props)
        this.handler = this.handler.bind(this);
    }


    handler(arg) {
        if(arg === 1){
            this.setState({
                intro: true,
                about: false,
                map: false,
                navs: true,
            });
        }
        else if(arg === 2){
            this.setState({
                intro: false,
                about: true,
                map: false,
                navs: true,
            });  
        }
        else if(arg === 3){
            this.setState({
                intro: false,
                about: false,
                map: true,
                navs: false,
            });  
            this.refs.navi.change();
        }
        else{
            this.setState({
                intro: false,
                about: false,
                map: true,
                navs: false,
            });  
            
        }

    }
    render(){

        if(this.state.map === true){
            return(
                <div>
                <Nav action={this.handler} nav_state={this.state.navs} ref="navi"/>
                <MapCom/>
                </div>
            )
        }
        else{
        return (
            <div>

                <Nav action={this.handler} nav_state={this.state.navs} ref="navi"/>
                {this.state.intro === true && <Title action={this.handler}/>}
                {this.state.about === true && <About/>}

            </div>
        );
        }
        

        

    }
}
