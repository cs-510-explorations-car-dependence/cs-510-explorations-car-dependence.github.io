import "./../../App.css";
import React, {Component} from "react";
import "../../css/landingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../Nav/Nav";
import Title from "../Titlepage/Title";
import MapCom from "../Map/MapCom";
import About from "../About/About";
import { style } from "d3";


export default class Face extends Component{




    state = {
        intro: true,
        about: false,
        map: false,
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
            });
        }
        else if(arg === 2){
            this.setState({
                intro: false,
                about: true,
                map: false,
            });  
        }
        else{
            this.setState({
                intro: false,
                about: false,
                map: true,
            });  
        }

    }
    render(){

       

        return (
            <div>
                <Nav action={this.handler}/>
                {this.state.intro === true && <Title action={this.handler}/>}
                {this.state.about === true && <About/>}
                {this.state.map === true && <MapCom/>}

            </div>
        );
        

        

    }
}
