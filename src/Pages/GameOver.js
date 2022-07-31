import React, { Component } from "react";
import { Link } from "react-router-dom";
import Redirect from "../Widgets/MBButton";

import './GameOver.css';

class GameOver extends Component{

  constructor(){
    super()
    if(window.localStorage.getItem("Death")!=null){
      this.deathMessage=window.localStorage.getItem("Death")
    }
    
  }

  componentDidMount(){
    window.localStorage.setItem('state',null);
    window.localStorage.removeItem('state');
  }

  newGame = () => {
    window.localStorage.removeItem('Death');
  }

  render(){
    return <body >
    <h1> GameOver </h1>
    <h2> {this.deathMessage} </h2>
    

    <Redirect saveState={this.newGame} pageURL="/NomadicTribe" text=" try again " cssing ="restart" textCssing="none"></Redirect>

    
</body>
  }
}

export default GameOver;