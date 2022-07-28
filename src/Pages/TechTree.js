import React, { Component } from "react";
import Redirect from "../Widgets/MBButton";
import TTButton from "../Widgets/TechTreeButton";
import "./TechTree.css"


const technologyNames = [
  ["Improved Memory","improveMemory","The more you explore, the better you know your surroundings, the faster you find ressources."],
  ["Pouch","pouch","Allows you to collect more ressources when you go gathering."],
  ["Huts","hut","Allows you to create huts, which attract people to your community."], 
  ["Wooden Tools","woodenTools","Allows you to craft better tools for gathering and exploring."]]

const woodPrices = [10, 50, 100, 100]
const foodPrices = [20, 10, 100, 50]


export default class TechTree extends Component {

  constructor(){
    super()

    this.state=JSON.parse(window.localStorage.getItem('state'));
    
    this.setShapes()
    
      
    
    
  }

  setShapes = ()  => {
    this.shape=[]
    for(let i=0;i<technologyNames.length;i++){

      if(this.state.technologyAvailable[i] && !this.state.technologyAvailable[i+1] && this.state.food>=foodPrices[i] && this.state.wood>=woodPrices[i] ){
        this.shape.push("goodShape")
      }else{
        this.shape.push("badShape")
      }

    }
  }

  componentCleanupp() { 
    window.localStorage.setItem('state',JSON.stringify(this.state))
  }

  componentDidMount() {
    this.updateDates();
    window.addEventListener('beforeunload', this.componentCleanup);
    
  }

  componentWillUnmount() {
    this.componentCleanupp()
    window.removeEventListener('beforeunload', this.componentCleanup);
  }


  updateDates(){

    this.setState({
        gatherTime:new Date(Date.parse(this.state.gatherTime)),
        lastWork:new Date(Date.parse(this.state.lastWork)),
        wood:parseInt(this.state.wood),
        food:parseInt(this.state.food)
    })

  }


  upgrade = (index,food,wood) =>{
    let tempAvailability = this.state.technologyAvailable
    tempAvailability[index] = !tempAvailability[index]
    this.setState({
      technologyAvailable: tempAvailability
    })
    this.setState({
      food:this.state.food-food,
      wood:this.state.wood-wood
    })
    this.setShapes()
  
  }

  saveState =() =>{
    window.localStorage.setItem('state',JSON.stringify(this.state));
  }

  render () {
    return <body > 
    
    <div className="Title"> TECHTREE</div>

    <div> {this.state.food} food<br></br>{this.state.wood} wood  </div>

    <div className="contactInfo"> if you have any suggestions for the TechTree send me an email here : thefirstinventor321@gmail.com </div>

    <div className="techButtons">

    {technologyNames.map((tech, index) => (<TTButton upgrade = {this.upgrade} tech={tech} index={index} shape={this.shape[index]} prices={[foodPrices[index],woodPrices[index]]}></TTButton>))}

    

    </div>

    <Redirect saveState={this.saveState} pageURL="/NomadicTribe" text=" Back to Base " cssing ={"more home"}></Redirect>


  </body>;
  }
  
}
