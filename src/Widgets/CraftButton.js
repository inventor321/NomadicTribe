import React, { Component } from "react";
import './CraftButton.css';

export default class CraftButton extends Component{
    
    constructor(props){
        super(props);
    }

    
    

    render = () =>{ 
        return(

        <div className="cta-container sword">
            <div className="button">
                <div className="square-front">
                <div className="relative-box">
                    <span className="line line-top"></span>
                    <span className="line line-right"></span>
                    <span className="line line-bottom"></span>
                    <span className="line line-left"></span>
                </div>
                </div>
                <button className="label" onClick={this.props.upgradeSword}> {this.props.swordInfo[2]} </button>  
                
            </div>
            <div className="resNeeded" >
            {this.props.swordInfo[1]} Wood
            </div>
        </div>
       
    );
}
}