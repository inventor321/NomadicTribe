import React, { Component } from "react";
import './RessourceCounter.css';
import Campfire from './Campfire';

export default class RessourceCounter extends Component{
    
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.updateRessources()
        this.FWorkers = setInterval(()=>{
            this.props.addRessources('W')
        }, 1000);
        this.WWorkers = setInterval(()=>{
            this.props.addRessources('F')
        }, 1000);
        
    }
    
    componentWillUnmount() { 
        clearInterval(this.FWorkers);
        clearInterval(this.WWorkers);
        this.props.lastWorking(new Date());
    }

    startFire = event => {
        this.props.startFire();
    };

    addW = (addsub, type) => {
        this.props.addW(addsub, type);
    }

    

    render = () =>{ 
        return(
        <div>
            <div className="ressourceContainer">
            
                <div className="Population"> Population : {this.props.population}/{this.props.maxPopulation} </div> 
                <div className="Food">Food : {this.props.food} </div>
                <div className="Wood">Wood : {this.props.wood} </div>
            </div>
            <div className="workerContainer">
                <div className="workers"> {this.props.population-1} Workers </div>
                <div className="workers"> <button onClick={() => this.addW(true,'F')}>+</button> {this.props.FW} <button onClick={() =>this.addW(false,'F')}>-</button> </div>
                <div className="workers"> <button onClick={() =>this.addW(true,'W')}>+</button> {this.props.WW} <button onClick={() =>this.addW(false,'W')}>-</button> </div>
            </div>
            {this.props.fire && <Campfire></Campfire>}

            <div className="shopMargin">
                <div className="shopContainer">

                    <h1 id="shop"> Craft </h1>


                    <div className="cta-container campfire">
                        <div className="button">
                            <div className="square-front">
                            <div className="relative-box">
                                <span className="line line-top"></span>
                                <span className="line line-right"></span>
                                <span className="line line-bottom"></span>
                                <span className="line line-left"></span>
                            </div>
                            </div>
                            {!this.props.fire && <button className="label" onClick={this.startFire} > Start Fire </button>}
                            {this.props.fire && <button className="label" onClick={this.startFire} > Add Wood </button>}
                              
                            
                        </div>
                        <div className="resNeeded" >
                            5 Wood
                        </div>
                    </div>
 

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
}