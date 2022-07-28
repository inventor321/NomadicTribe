import React from "react";
import { useNavigate } from "react-router-dom";




export default function Redirect(props) {
    let navigate = useNavigate();
    function handleClick() {
      if(props.saveState!=null){
        props.saveState()
      }
      setTimeout(()=>{navigate(props.pageURL)},50)
      
    }
    return (
      <div>
        <button className={props.cssing} onClick={handleClick}><div className="text" >{props.text}</div></button>
      </div>
    );
  }