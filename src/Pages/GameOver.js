import React from "react";
import Tabs from "../Widgets/Tabs";
import './GameOver.css';

function GameOver() {

  const state = {

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

  
  window.localStorage.setItem('state',JSON.stringify(state));
  console.log('saved')
  

  return <body >
      <h1> GameOver </h1>
      <h2> You were not able to keep your fire going. The creatures of the forest took you out.</h2>
      <button onclick={()=> {window.localStorage.setItem('state',JSON.stringify(state));}}> Try again </button>
      <p className="joke"> lol button dosent work yet, <br></br> click on the button that brings you to the previous page on your browser instead</p>
  </body>
  
}

export default GameOver;