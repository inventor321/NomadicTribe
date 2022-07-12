import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Home.css'
import MainPage from "./MainPage";

class Home extends Component {
  

  clickHandle = () => {
    this.props.clickHandle();
  }
//<Link className="Arise" to="/MainPage">Arise</Link>
  render = () => <div className="Background-Body">
      { !this.props.startGame && <div>
      
      <button className="Arise" onClick={this.clickHandle}> Arise </button>
      <div className="FTD">From The Darkness</div>

      </div> }

    </div>;
}

export default Home;