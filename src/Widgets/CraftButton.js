import React, { Component } from "react";
import './CraftButton.css';

export default class CraftButton extends Component{

    render = () =>{ 
        return(
        
        <div className= {"cta-container "+this.props.class}>
            <div className="button">
                <div className="square-front">
                <div className="relative-box">
                    <span className="line line-top"></span>
                    <span className="line line-right"></span>
                    <span className="line line-bottom"></span>
                    <span className="line line-left"></span>
                </div>
                </div>
                <button className="label" onClick={this.props.upgradeFunction}> {this.props.name} </button>  
                
            </div>
            <div className="resNeeded" >
            { this.props.prices[0]>0 && <div> {this.props.prices[0]} Food </div>}
            { this.props.prices[1]>0 && <div> {this.props.prices[1]} Wood </div>}
            </div>
        </div>
       
    );
}
}