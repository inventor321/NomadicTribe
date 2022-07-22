import React, { Component } from "react";
import './CooldownButton.css';

export default class CooldownButton extends Component{
    constructor(){
        super();
        this.state={
            refreshed:true
        }
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentCleanup() { 
        clearInterval(this.gatherer)
    }

    componentDidMount() {
        
        let timePassed = new Date()-this.props.gatherTime;
        this.gatherer = setTimeout(() => {
            this.props.enable();
        }, 10000-timePassed);
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    startGatherer (){
        let timePassed = new Date()-this.props.gatherTime;
        this.gatherer = setTimeout(() => {
            this.props.enable();
        }, 10000-timePassed);
    }

    componentWillUnmount(){
        this.componentCleanup()
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    gather = event => {
        this.props.onGather();
    };

    getTimeRemaining = () => {
        return (this.props.gatherTime - new Date())/1000 + 10;
    };

    

    render = () => {

            var time = this.getTimeRemaining();
            if(performance.navigation.type==1){
                this.startGatherer()
            }
            if(time<0 & this.props.gatherState){
                console.log("disabling")
                this.props.enable()
            }
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

                    <button className='gather' disabled={time>0?true:false} onClick={this.gather}>
                        Gather {this.props.gatherState}
                    </button>

                    <div className="cover"></div>

                </div>

            </div>
        );

    };
};