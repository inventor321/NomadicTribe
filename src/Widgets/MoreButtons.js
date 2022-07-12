import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Redirect from "./MBButton";
import './MoreButtons.css';


export default class MoreButtons extends Component{
    
    constructor(){
        super();
        this.state = {
            E:false,
            TT:false,
            C:false,
            O:false,
            MC:true,

        }
    }
    
    
  

    render() {
        
        //{ this.state.MC ? (<Navigate push to="/MagicRuins"/>) : null }  () => this.setState({ MC: true })
        return <div>

            { this.state.E ? (<Redirect pageURL="/Explore" text=" Explore " cssing ={"E"}></Redirect>) : null } 
            { this.state.TT ? (<Redirect pageURL="/TechTree" text=" Tech Tree " cssing ={"TT"}></Redirect>) : null } 
            { this.state.C ? (<Redirect pageURL="/Cave" text=" Cave " cssing ={"C"}></Redirect>) : null } 
            { this.state.O ? (<Redirect pageURL="/Ocean" text=" Ocean " cssing ={"O"}></Redirect>) : null } 

            { this.state.MC ? (<Redirect pageURL="/MagicRuins" text=" Magic Ruins " cssing ={"MC"}></Redirect>) : null } 
            
            
            
            
            
            
            
        </div>
    };
}