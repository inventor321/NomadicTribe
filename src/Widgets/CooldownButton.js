import React, { Component } from "react";
import './CooldownButton.css';

export default class CooldownButton extends Component{
    constructor(){
        super()
        this.state={timeGot:false}
    }

    componentDidMount() {
        let timePassed = this.props.gatherTime-new Date();
        this.gatherer = setTimeout(() => {
            this.props.enable();
        }, 10000-timePassed);
    }

    componentWillUnmount(){
        clearTimeout(this.gatherer)
    }

    gather = event => {
        this.props.onGather();
        
    };

    getTimeRemaining = () => {
        return (this.props.gatherTime - new Date())/1000 + 10;
    };

    render = () => {

        
            var time = this.getTimeRemaining();
            var css = `

            .gather:disabled + .cover{
                animation: show ${time}s linear forwards;
                animation-iteration-count: 1;
            }

            @keyframes show {
                from { width : ${time*15}px;}
                to {width: 0px;}
            }

        `
        
        return(
            <div>
                <style>

                    {css}

                </style>
                
            
            
                <div className="gatherHolder">

                    <button className='gather' disabled={this.props.gatherState} onClick={this.gather}>
                        Gather {this.props.gatherState}
                    </button>

                    <div className="cover"></div>

                </div>

            </div>
        );

    };
};