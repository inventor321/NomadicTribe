import React, { Component, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import CooldownButton from "../Widgets/CooldownButton";
import RessourceCounter from "../Widgets/RessourceCounter";
import './MainPage.css';
import {timer} from "../TimerFunction.js";
import MoreButtons from "../Widgets/MoreButtons";

var firstMessage = ['You wake up in the middle of a forest']



class MainPage extends Component {

    constructor(props){
        super(props);
        this.swords = ['Wooden Sword', 'Stone Sword', 'Copper Sword', 'Bronze Sword', 'Iron Sword', 'Steel Sword']
        this.swordsNextRequirements = [50,100,200,350,500,1000]
        this.state = {
            messages:["You wake up in a dim dense forest."],

            swordIndex: 0,
            
            activeTab:1,

            gatherState:false,

            population:1,
            food:10,
            wood:10,
            cave:false,
            ocean:false,
            magicRuins:false,

            timer: new timer(() => {
                this.addText('You should start a fire to keep the beasts away.')
            }, 3000),
            
            fire:false,

        }
    }


    getRandomInt = max => {
        return Math.floor(Math.random() * max);
        
    }

    changeActiveTab = (changeTo) => {
        this.setState({
            activeTab:changeTo,
        });
    }

    addText = (newMessage) => {
        this.setState({
            messages: [newMessage,...this.state.messages]
        });
    }

    getTimeLeft = () =>{
        return this.state.timer.getTimeLeft()/1000
    }

    gather = () => {
        this.setState({
            gatherState:true,
            timer:new timer(() => {
                this.setState({
                    gatherState:false,
                    timertimeleft:this.getTimeLeft(),
                });
            }, 10000),
        });


        let newWood = this.getRandomInt(10);
        let newFood = this.getRandomInt(10);
        this.setState({
            wood: this.state.wood+newWood,
            food: this.state.food+newFood
        });
        this.addText(`You gathered ${newWood} wood and ${newFood} food.`);
    }


    startFire = () => {
        if(this.state.wood>=5 && !this.state.fire){
            this.setState({
                wood:this.state.wood-5,
                fire:true,
            });
            this.addText('You successfully started a fire.')
        }
        
    }

    upgradeSword = () => {
        if(this.state.wood>=this,this.swordsNextRequirements[this.state.swordIndex]){
            this.setState({
                wood:this.state.wood-this.swordsNextRequirements[this.state.swordIndex],
                swordIndex:this.state.swordIndex+1,
            });
            this.addText('You upgraded your sword.')
        }
        
    }


  render = () => <body className="Background-Body">
      
      <div className="NT">Nomadic Tribe</div>
      
      <div>
          <div className="Tab_button_container">
      <button className="Tab-button" id="firstTabButton" onClick={()=>this.changeActiveTab(1)}>Surroundings</button>
      <button className="Tab-button" id="secondTabButton" onClick={()=>this.changeActiveTab(2)}>Base</button>
      <button className="Tab-button" id="thirdTabButton" onClick={()=>this.changeActiveTab(3)}>More</button>
      </div>
      <div>
            {this.state.activeTab === 1 && <div className="tab" id="firstTab">
                <CooldownButton onGather = {this.gather} getTime = {this.getTimeLeft}  gatherState ={this.state.gatherState} gatherTime = {this.state.timer.getTimeLeft()}  />
            
              
              </div>}
            {this.state.activeTab === 2 && <div className="tab" id="secondTab">
                <RessourceCounter population={this.state.population} food={this.state.food} wood={this.state.wood} startFire = {this.startFire} fire = {this.state.fire} upgradeSword = {this.upgradeSword} swordInfo = {[this.state.swordIndex, this.swordsNextRequirements[this.state.swordIndex], this.swords[this.state.swordIndex]]}></RessourceCounter>
              </div>}
            {this.state.activeTab === 3 && <div className="tab" id="thirdTab"> 
            <div>  <MoreButtons></MoreButtons> </div>
              
              </div>}
      </div>
        </div>
      

      
        <div className="background-chat"><div className="chat">{this.state.messages.map((message) => (<div>{message}</div>))}</div></div>
    </body>;
}

export default MainPage;