import React from "react";
import './TechTreeButton.css'



export default function TTButton(props) {
    let svgWrapper = "svg-wrapper "
    if(!props.availability){
        svgWrapper = svgWrapper + "notAvailable"
    }

    function clickHandler(){
        if(props.shape==="goodShape" & props.availability){
            props.upgrade((props.index+1), props.prices[0], props.prices[1])
        }
        
    }

    

    return (
        <div className={props.tech[1]}>
            <div class={svgWrapper} onClick={()=>{clickHandler()}}>

                

                <svg className="svgg" height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                    <rect id={props.shape} height="40" width="150" />
                    <foreignObject x="0" y="0" width="150" height="40">
                            <span id="text"> {props.tech[0]} </span>
                    </foreignObject>
                </svg>

                <div className="popup">
                    {props.tech[2]}
                    <div className="price">
                        {props.prices[0]} food
                        <br></br>
                        {props.prices[1]} wood
                    </div>
                </div>

            </div>
            
      </div>
    );
  }
//<text id="text" y="10px" fill="brown"> hey </text>
  //<div class="svg-wrapper">
  //<svg height="40" width="150">
  //<rect id="shape" height="40" width="150" />
  //<div id="text">
  //    <a href=""><span class="spot"></span>Button 1</a>
  //</div>
  //</svg>
//</div>


