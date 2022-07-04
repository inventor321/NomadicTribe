import React, { Component } from "react";
import './RessourceCounter.css';
import Campfire from './Campfire';

export default class RessourceCounter extends Component{
    
    constructor(){
        super();
    };    

    startFire = event => {
        console.log('Started Fire')
        this.props.startFire();
    };

    render = () => (
        <div>
            <div className="ressourceContainer">
            
                <div className="Population"> Population : {this.props.population}</div>
                <div className="Food">Food : {this.props.food}</div>
                <div className="Wood">Wood : {this.props.wood}</div>
            </div>
            {this.props.fire && <Campfire></Campfire>}
            

            <div className="shopMargin">
                <div className="shopContainer">

                    <h1 id="shop"> Craft </h1>


                    <div class="cta-container campfire">
                        <div class="button">
                            <div class="square-front">
                            <div class="relative-box">
                                <span class="line line-top"></span>
                                <span class="line line-right"></span>
                                <span class="line line-bottom"></span>
                                <span class="line line-left"></span>
                            </div>
                            </div>
                            {!this.props.fire && <button className="label" onClick={this.startFire} > Start Fire </button>}
                            {this.props.fire && <button className="label" onClick={this.startFire} > Add Wood </button>}
                              
                            
                        </div>
                        <div className="resNeeded" >
                            5 Wood
                        </div>
                    </div>
 

                    <div class="cta-container sword">
                        <div class="button">
                            <div class="square-front">
                            <div class="relative-box">
                                <span class="line line-top"></span>
                                <span class="line line-right"></span>
                                <span class="line line-bottom"></span>
                                <span class="line line-left"></span>
                            </div>
                            </div>
                            <button className="label" > {this.props.swordInfo[2]} </button>  
                            
                        </div>
                        <div className="resNeeded" >
                        {this.props.swordInfo[1]}
                        </div>
                    </div>

                    

                    
                </div>
            </div>
        </div>
       
    );
}