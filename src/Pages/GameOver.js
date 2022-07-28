import React, { Component } from "react";
import { Link } from "react-router-dom";

import './GameOver.css';

class GameOver extends Component{

  componentDidMount(){
    window.localStorage.setItem('state',null);
    window.localStorage.removeItem('state');
    this.cause = JSON.parse(window.localStorage.getItem("Death"))
    window.localStorage.removeItem('Death');
  }

  render(){
    return <body >
    <h1> GameOver </h1>
    <h2> {this.cause} </h2>
    <Link to='/NomadicTribe' className="restart"> try again </Link>
</body>
  }
  
  
}

export default GameOver;