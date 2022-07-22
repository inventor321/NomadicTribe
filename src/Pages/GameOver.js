import React, { Component } from "react";
import { Link } from "react-router-dom";

import './GameOver.css';

class GameOver extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    window.localStorage.setItem('state',null);
    window.localStorage.removeItem('state');
  }

  render(){
    return <body >
    <h1> GameOver </h1>
    <h2> You were not able to keep your fire going. The creatures of the forest took you out.</h2>
    <Link to='/NomadicTribe' className="restart"> try again </Link>
</body>
  }
  
  
}

export default GameOver;