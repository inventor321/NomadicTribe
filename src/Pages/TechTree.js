import React, { Component } from "react";
import Redirect from "../Widgets/MBButton";
import TTButton from "../Widgets/TechTreeButton";
import "./TechTree.css"


const technologyNames = [ // 0 Name, 1 className, 2 description, 3 tech needed, 4 in game available, 5 food cost, 6 wood cost
  ["Improved Memory","improveMemory","The more you explore, the better you know your surroundings, the faster you find ressources.",0, true, 10, 20], //1
  ["Pouch","pouch","Allows you to collect more ressources when you go gathering.",1, true, 50, 10],                           //2
  ["Huts","hut","Allows you to create huts, which attract people to your community.",2, true, 100,100],                       //3
  ["Cartography","cartography","Improves your explorations.",3, false, 150, 250],                                             //4
  ["Wooden Tools","woodenTools","Allows you to craft better tools for gathering and exploring.",2, true, 100, 50],            //5
  ["Stone Tools","stoneTools","Allows you to craft better tools for gathering and exploring.",5, true, 200, 100],             //6
  ["Atlatl","atlatl","Allows you to craft a ranged weapon. Adds an attack that you can use in battle.",6, false, 200, 200],   //7
  ["Bow & Arrow","bowAndArrow","Allows you to craft a better ranged weapon.",7, false, 300, 400],                             //8
  ["Copper Tools","copperTools","Allows you to craft better tools for gathering and exploring.",6, true, 200, 500],           //9

  
]

const woodPrices = [10, 50, 100, 100, 200, 500, 200, 300, 300]
const foodPrices = [20, 10, 100, 50, 100, 200, 200, 400, 300]


export default class TechTree extends Component {

  constructor(){
    super()

    this.state=JSON.parse(window.localStorage.getItem('state'));
    
    this.setShapes()
    
      
    
    
  }

  setShapes = ()  => {
    this.shape=[]
    for(let i=0;i<technologyNames.length;i++){

      if(this.state.technologyAvailable[technologyNames[i][3]] && technologyNames[i][4] && !this.state.technologyAvailable[i+1] && this.state.food>=technologyNames[i][5] && this.state.wood>=technologyNames[i][6] ){
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
    if(index===1){
      this.improvedMemory()
    }
  
  }

  saveState =() =>{
    window.localStorage.setItem('state',JSON.stringify(this.state));
  }


  improvedMemory = () => {
    this.setState({
      gatherMin:5,
    })
    setTimeout(()=>{this.saveState()},50)
  }

  


  render () {
    return <body > 
    
    <div className="Title"> TECHTREE</div>

    <div> {this.state.food} food<br></br>{this.state.wood} wood  </div>

    <div className="contactInfo"> if you have any suggestions for the TechTree send me an email here : thefirstinventor321@gmail.com </div>

    <div className="techButtons">

    {technologyNames.map((tech, index) => (<TTButton upgrade = {this.upgrade} tech={tech} index={index} shape={this.shape[index]} prices={[technologyNames[index][5],technologyNames[index][6]]} availability = {technologyNames[index][4]}></TTButton>))}

    

    </div>

    <Redirect saveState={this.saveState} pageURL="/NomadicTribe" text=" Back to Base " cssing ={"more home"} textCssing="none"></Redirect>


  </body>;
  }
  
}
