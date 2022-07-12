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
            console.log(JSON.parse(window.localStorage.getItem('state')))
            console.log(typeof JSON.parse(window.localStorage.getItem('state')))
            this.state=JSON.parse(window.localStorage.getItem('state'))

            //console.log("finale state", typeof Date.parse( this.state.gatherTime), new Date(Date.parse( this.state.gatherTime)))
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
    
                population:5,
                maxPopulation:5,


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
    
            }
        }
        
        
        
    }

    
    componentDidMount() {
        let timePassed = this.state.gatherTime-new Date();
        if(timePassed<10)
        this.gatherer = setTimeout(() => {
            this.setState({
                gatherState:false,
            });
        }, 10000-timePassed);
        this.updateDates()
        console.log(this.state, typeof this.state.gatherTime)
    }
    
    componentWillUnmount() { 
        window.localStorage.setItem('state',JSON.stringify(this.state));
        window.localStorage.setItem('date',JSON.stringify(this.state.gatherTime));
        clearTimeout(this.gatherer);

    }

    updateDates(){
        this.setState({
            gatherTime:new Date(Date.parse(this.state.gatherTime)),
            lastWork:new Date(Date.parse(this.state.lastWork)),
        })
    }


    warningFire1 = () =>{
        this.addText('You hear leafs rustling around you. Your heart rate increases.');
        this.setState({
            lifeTimer: new timer(() => {
                this.warningFire2()
            }, 15000),
        })
        
    }

    warningFire2 = () =>{
        this.addText('The noises around you grow in number and in volume. You hear the growls of the beasts.');
        this.setState({
            lifeTimer: new timer(() => {
                this.GameOverFire()
            }, 15000),
        })
    }

    GameOverFire = () =>{
        this.addText('You get taken out by the creatures of the forest. Your journey ends here.');
        this.setState({
            fade:true,
            lifeTimer: new timer(() => {
                this.setState({
                    alive:false,
                });
            }, 5000),
        });
        
    }


    getRandomInt = max => {
        return Math.floor(Math.random() * max);
        
    }

    changeActiveTab = (changeTo) => {
        this.setState({
            activeTab:changeTo,
        });
    }

    addRessources = worker => {
        if(worker==='W'){
            this.setState({
                wood:this.state.wood+this.state.WW
            })
        }else if(worker==='F'){
            this.setState({
                food:this.state.food+this.state.FW
            })
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
        console.log(this.state.gatherTime)
        setTimeout(() => {
            this.setState({
                gatherState:false,
            });
        }, 10000);
        



        let newWood = this.getRandomInt(10);
        let newFood = this.getRandomInt(10);
        this.setState({
            wood: this.state.wood+newWood,
            food: this.state.food+newFood
        });
        this.addText(`You gathered ${newWood} wood and ${newFood} food.`);
    }

    lastWorking = date =>{
        this.setState({
            lastWork:date
        })
    }

    updateRessources = () =>{
        let time = parseInt((new Date() - this.state.lastWork)/1000)
        console.log(time, "is the time", this.state.lastWork)
        this.setState({
            wood:this.state.wood + this.state.WW*time,
            food:this.state.food + this.state.FW*time
        })
        console.log(this.state.wood, this.state.food, "are the ressources")
    }

    startFire = () => {
        if(this.state.wood>=5 && !this.state.fire){
            this.setState({
                wood:this.state.wood-5,
                fire:true,
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
          startAnimation:true,
          lifeTimer: new timer(() => {
            this.warningFire1()
        }, 20000)
        })
        
        setTimeout(() => { 
          this.setState({
          
          startGame:true
        })},900)
        setTimeout(()=>{
            this.setState({
                startAnimation:false
                
            })
            console.log('its done')
        },3000)
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

  render () {

      return <body className="Background-Body">

        { !this.state.startGame && <div>
            
            <Home startGame = {this.state.startGame} clickHandle = {this.clickHandle}></Home>

        </div> }
            
        { this.state.startAnimation && <div className="Awakening"></div> }

        { this.state.startGame && <div>
    
   

  

      { this.state.fade ? (<div className="fade"></div>) : null }
      { !this.state.alive ? (<Navigate to="/GameOver"/>) : null }

      <div className="NT">Nomadic Tribe</div>
      
      <div>
          <div className="Tab_button_container">
      <button className="Tab-button" id="firstTabButton" onClick={()=>this.changeActiveTab(1)}>Surroundings</button>
      <button className="Tab-button" id="secondTabButton" onClick={()=>this.changeActiveTab(2)}>Base</button>
      <button className="Tab-button" id="thirdTabButton" onClick={()=>this.changeActiveTab(3)}>More</button>
      </div>
      <div>
            {this.state.activeTab === 1 && <div className="tab" id="firstTab">
                <CooldownButton onGather = {this.gather}  gatherState ={this.state.gatherState} gatherTime = {this.state.gatherTime}/>
            
              
              </div>}
            {this.state.activeTab === 2 && <div className="tab" id="secondTab">
                <RessourceCounter updateRessources={this.updateRessources} addRessources={this.addRessources} lastWorking={this.lastWorking} population={this.state.population} WW ={this.state.WW} FW={this.state.FW} maxPopulation={this.state.maxPopulation} food={this.state.food} wood={this.state.wood} startFire = {this.startFire} addW={this.addW} fire = {this.state.fire} upgradeSword = {this.upgradeSword} swordInfo = {[this.state.swordIndex, this.swordsNextRequirements[this.state.swordIndex], this.swords[this.state.swordIndex]]}></RessourceCounter>
              </div>}
            {this.state.activeTab === 3 && <div className="tab" id="thirdTab"> 
            <div>  <MoreButtons state = {this.state}></MoreButtons> </div>
              
              </div>}
      </div>
        </div>
      

      
        <div className="background-chat"><div className="chat">{this.state.messages.map((message) => (<div className="message">{message}</div>))}</div></div>
        
        </div> }
    </body>;
  }
}

export default MainPage;