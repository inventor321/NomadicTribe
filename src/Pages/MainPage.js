import React, { Component, memo } from "react";
import { Link, Navigate } from "react-router-dom";
import CooldownButton from "../Widgets/CooldownButton";
import RessourceCounter from "../Widgets/RessourceCounter";
import './MainPage.css';
import {timer, intervalTimer} from "../TimerFunction.js";
import MoreButtons from "../Widgets/MoreButtons";
import Home from "./Home";

var firstMessage = ['You wake up in the middle of a forest']



class MainPage extends Component {

    constructor(props){
        super(props);
        this.swords = ['Wooden Sword', 'Stone Sword', 'Copper Sword', 'Bronze Sword', 'Iron Sword', 'Steel Sword']
        this.swordsNextRequirements = [50,100,200,350,500,1000]
        if(window.localStorage.getItem('state')!==null){
            this.state=JSON.parse(window.localStorage.getItem('state'))

        }else{
            this.state = {

                startAnimation:false,
                startGame:false,

                messages:["You wake up in a dim dense forest."],
    
                alive:true,
                fade:false,
    
                swordIndex: 0,
                
                activeTab:1,
    
                gatherState:false,
    
                population:1,
                maxPopulation:1,


                FW : 0,
                WW : 0,
                lastWork : new Date(),
                
    
                food:10,
                wood:10,
                cave:false,
                ocean:false,
                magicRuins:false,
                
                gatherTime:new Date((new Date).getTime() - 10*1000),
                
    
                fire:false,

                E:false,
                TT:false,
                C:false,
                O:false,
                MC:false,

                explorations:0,
    
            }
        }
        
        this.componentCleanup = this.componentCleanup.bind(this);
        
    }

    componentCleanup() { 
        clearInterval(this.hunger)
        window.localStorage.setItem('state',JSON.stringify(this.state));
    }
    
    componentDidMount() {
        this.updateDates();
        window.addEventListener('beforeunload', this.componentCleanup);
    }
    

    componentWillUnmount() {
        this.componentCleanup()
        window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    }

    updateDates(){
        this.setState({
            gatherTime:new Date(Date.parse(this.state.gatherTime)),
            lastWork:new Date(Date.parse(this.state.lastWork)),
            wood:parseInt(this.state.wood),
            food:parseInt(this.state.food)
        })
    }

    enable = () =>{
        this.setState({
            gatherState:false
        })
    }


    warningFire1 = () =>{
        this.addText('You hear leafs rustling around you. Your heart rate increases.');
        this.lightTimer = setTimeout(() => {
            this.warningFire2()
        }, 15000);
        
    }

    warningFire2 = () =>{
        this.addText('The noises around you grow in number and in volume. You hear the growls of the beasts.');
        this.lightTimer = setTimeout(() => {
                this.GameOverFire()
        }, 15000);
    }

    GameOverFire = () =>{
        this.addText('You get taken out by the creatures of the forest. Your journey ends here.');
        this.setState({
            fade:true,
        });
        setTimeout(() => {
            this.setState({
                alive:false,
            });
        }, 5000)
        
    }


    getRandomInt = max => {
        return Math.floor(Math.random() * max);
        
    }

    changeActiveTab = (changeTo) => {
        this.setState({
            activeTab:changeTo,
        });
    }


    addRes(amount, type){
        if(type==='W'){
            this.setState({
                wood:this.state.wood+amount
            })
        }else if(type==='F'){
            this.setState({
                food:this.state.food+amount
            })
        }
        if(this.state.wood>100){
            this.setState({
                TT:true,
            })
        }

    }

    addRessources = worker => {
        if(worker==='W'){
            this.addRes(this.state.WW, 'W')
        }else if(worker==='F'){
            this.addRes(this.state.FW, 'F')
        }
    }

    addText = (newMessage) => {
        this.setState({
            messages: [newMessage,...this.state.messages]
        });
    }


    gather = () => {
        this.setState({
            gatherState:true,
            gatherTime:new Date()
        });
        
        setTimeout(() => {
            this.setState({
                gatherState:false,
            });
        }, 10000);
        



        let newWood = this.getRandomInt(10);
        let newFood = this.getRandomInt(10);
        this.addRes(newWood,"W")
        this.addRes(newFood,"F")
        this.addText(`You gathered ${newWood} wood and ${newFood} food.`);
    }

    lastWorking = date =>{
        this.setState({
            lastWork:date
        })
    }

    updateRessources = () =>{
        let time = parseInt((new Date() - this.state.lastWork)/1000)

        this.addRes(this.state.WW*time,"W")
        this.addRes(this.state.FW*time-parseInt(this.state.population*time/5),"F")

    }

    startFire = () => {
        if(this.state.wood>=5 && !this.state.fire){
            clearTimeout( this.lightTimer)
            this.setState({
                wood:this.state.wood-5,
                fire:true,
                E:true

            });
            this.addText('You successfully started a fire. This should keep away the beasts for now.')
        }
        
    } 

    

    upgradeSword = () => {
        if(this.state.wood>=this.swordsNextRequirements[this.state.swordIndex]){
            this.setState({
                wood:this.state.wood-this.swordsNextRequirements[this.state.swordIndex],
                swordIndex:this.state.swordIndex+1,
            });
            this.addText('You upgraded your sword!')
        }
        
    }

    clickHandle = () => {
        this.setState({
          startAnimation:true
        })
        this.lightTimer = setTimeout(() => {
            this.warningFire1()
        }, 15000);
        
        setTimeout(() => { 
            this.setState({
                startGame:true
            })
        },900)
        

        setTimeout(()=>{
            this.addText("You should start a fire to keep yourself safe")
            this.setState({
                startAnimation:false
            })
        },5000)
      }


      addW = (addsub, type) => {
        if(addsub){
            if(this.state.FW + this.state.WW < this.state.population-1){
                if(type==='W'){
                    this.setState({
                        WW:this.state.WW+1,
                    })
                    
                }
                else if(type==='F'){
                    this.setState({
                        FW:this.state.FW+1,
                    })
                    
                }
            }
        }else{
            if(type==='W'){
                if(this.state.WW!==0){
                    this.setState({
                        WW:this.state.WW-1,
                    })
                }
            }
            else if(type==='F'){
                if(this.state.FW!==0){
                    this.setState({
                        FW:this.state.FW-1,
                    })
                }
            }
        }
      }

      hunger = () =>{
        console.log("ruinning")
        this.setState({
            food:this.state.food-this.state.population
        })
    }

      
    render () {

      return <body className="Background-Body">

        { !this.state.startGame && <div>
            
            <Home startGame = {this.state.startGame} clickHandle = {this.clickHandle}></Home>

        </div> }
            
        { this.state.startAnimation && <div className="Awakening"></div> }

        { this.state.startGame && <div>
    
   

  

      { this.state.fade ? (<div className="fade"></div>) : null }
      { !this.state.alive ? (<Navigate to="/GameOver"/>) : null }

      <div className="NT">Nomadic Tribe </div>
      
      
      <div>
          <div className="Tab_button_container">
      <button className="Tab-button" id="firstTabButton" onClick={()=>this.changeActiveTab(1)}>Surroundings</button>
      <button className="Tab-button" id="secondTabButton" onClick={()=>this.changeActiveTab(2)}>Base</button>
      <button className="Tab-button" id="thirdTabButton" onClick={()=>this.changeActiveTab(3)}>More</button>
      </div>
      <div>
            {this.state.activeTab === 1 && <div className="tab" id="firstTab">
                <CooldownButton onGather = {this.gather} enable={this.enable}  gatherState ={this.state.gatherState} gatherTime = {this.state.gatherTime}/>
            
              
              </div>}
            {this.state.activeTab === 2 && <div className="tab" id="secondTab">
                <RessourceCounter hunger={this.hunger} updateRessources={this.updateRessources} addRessources={this.addRessources} lastWorking={this.lastWorking} population={this.state.population} WW ={this.state.WW} FW={this.state.FW} maxPopulation={this.state.maxPopulation} food={this.state.food} wood={this.state.wood} startFire = {this.startFire} addW={this.addW} fire = {this.state.fire} upgradeSword = {this.upgradeSword} swordInfo = {[this.state.swordIndex, this.swordsNextRequirements[this.state.swordIndex], this.swords[this.state.swordIndex]] } ></RessourceCounter>
              </div>}
            {this.state.activeTab === 3 && <div className="tab" id="thirdTab"> 
            <div>  <MoreButtons buttonsInfo = {[this.state.E, this.state.TT,this.state.O,this.state.C,this.state.MC]} swordIndex = {this.state.swordIndex} ></MoreButtons> </div>
              
              </div>}
      </div>
        </div>
      

      
        <div className="background-chat"><div className="chat">{this.state.messages.map((message) => (<div className="message">{message}</div>))}</div></div>
        
        </div> }
    </body>;
  }
}

export default MainPage;


//<button onClick={() => {window.localStorage.clear()}}> Clear </button>