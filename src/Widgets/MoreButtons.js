import React, { Component } from "react";
import Redirect from "./MBButton";
import './MoreButtons.css';


export default class MoreButtons extends Component{
    

    render() {
        
        //{ this.state.MC ? (<Navigate push to="/MagicRuins"/>) : null }  () => this.setState({ MC: true })
        return <div>

            { this.props.buttonsInfo[0] ? (<Redirect saveState={this.props.saveState} pageURL="/Explore" text=" Explore " cssing ={"more E"} textCssing="none"></Redirect>) : null } 
            { this.props.buttonsInfo[1] ? (<Redirect saveState={this.props.saveState} pageURL="/TechTree" text=" Tech Tree " cssing ={"more TT"} textCssing="none"></Redirect>) : null } 

            { this.props.buttonsInfo[2] ? (<Redirect saveState={this.props.saveState} pageURL="/Cave" text=" Cave " cssing ={"more C"} textCssing="none"></Redirect>) : null } 
            { this.props.buttonsInfo[3] ? (<Redirect saveState={this.props.saveState} pageURL="/Ocean" text=" Ocean " cssing ={"more O"} textCssing="none"></Redirect>) : null } 

            { this.props.buttonsInfo[4] ? (<Redirect saveState={this.props.saveState} pageURL="/MagicRuins" text=" Magic Ruins " cssing ={"more MC"} textCssing="none"></Redirect>) : null } 
            
            
            
            
            
            
            
        </div>
    };
}