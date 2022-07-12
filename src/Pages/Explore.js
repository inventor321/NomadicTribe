import React, { Component } from "react";
import './Explore.css'

class Explore extends Component {
  
  constructor(){
    super();
    this.state = {

      currentHP:20,
      maxHP:20,
      attackDMG:3,
      attackSPD:1,


      entity:"Rat",
      ecurrentHP:20,
      emaxHP:20,
      eattackDMG:1,
      eattackSPD:0.5,

    }
    this.attackDMG = [1, 3, 6, 10, 15, 21, 28]

    
    this.enteties = ["Rat", "Mischief", "Huge Rat", "Wolf","A Pack", "Cub", "Mama Bear"]
    this.entitiesHP = [5, 15, 20, 22, 44, 50, 100]
    this.entetiesDMG = [1, 3, 5, 7, 21, 20, 50]
    this.entitiesSPD = [1, 0.5, 1, 0.75, 0.375, 2, 1.5]
  }
  

  render = () => <body >

        <h1 className="area">Forest</h1>

        <div class="mainbackground">

            <div class="MainCharacter">

                <div class="Character"></div>   
                <div class="Charactername">You</div>
                <div class="stats"> Health: <br/> <div className="hp"> {this.state.currentHP} </div> / {this.state.maxHP} <br/>Attack : {this.state.attackDMG}</div>

            </div>


            <div class="Enemy">
                 
                <div class="ECharacter"></div>
                <div class="E Charactername">Rat</div>
                <div class="E stats"> Health: <br/> <div className="hp"> {this.state.ecurrentHP} </div> / {this.state.emaxHP} <br/>Attack : {this.state.eattackDMG}</div>
            </div>
            
        </div>

  </body>;

  
}

export default Explore;