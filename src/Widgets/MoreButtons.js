import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Redirect from "./MBButton";
import './MoreButtons.css';


export default class MoreButtons extends Component{
    
    constructor(){
        super();
    }
    
    
  

    render() {
        
        //{ this.state.MC ? (<Navigate push to="/MagicRuins"/>) : null }  () => this.setState({ MC: true })
        return <div>

            { this.props.buttonsInfo[0] ? (<Redirect pageURL="/Explore" text=" Explore " cssing ={"more E"}></Redirect>) : null } 
            { this.props.buttonsInfo[1] ? (<Redirect pageURL="/TechTree" text=" Tech Tree " cssing ={"more TT"}></Redirect>) : null } 
            { this.props.buttonsInfo[2] ? (<Redirect pageURL="/Cave" text=" Cave " cssing ={"more C"}></Redirect>) : null } 
            { this.props.buttonsInfo[3] ? (<Redirect pageURL="/Ocean" text=" Ocean " cssing ={"more O"}></Redirect>) : null } 

            { this.props.buttonsInfo[4] ? (<Redirect pageURL="/MagicRuins" text=" Magic Ruins " cssing ={"more MC"}></Redirect>) : null } 
            
            
            
            
            
            
            
        </div>
    };
}