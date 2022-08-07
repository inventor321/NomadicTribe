import React, { Component } from "react";
import './AdventurePath.css'


class AdventurePath extends Component {
    
  
    //"playerCharacter paused"
  render() {
    var style = {
        left:`${this.props.enemyPosition}%`
    }

        return <div><div className="adventurePath">


            <div className={this.props.playerCharacter}> o<br></br> X  </div>
            
            {this.props.enemyPositionsAndIndexes.map((enemy) => (<div className={enemy[2]} style={{left:`${enemy[0]}%`}}>x</div>))}
            
            </div>

            </div>
    

  }
}

export default AdventurePath;