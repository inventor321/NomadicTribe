import React, { Component } from "react";
import { useNavigate } from "react-router-dom";




export default function Redirect(props) {
    let navigate = useNavigate();
    function handleClick() {
      navigate(props.pageURL)
    }
    return (
      <div>
        <button className={props.cssing} onClick={handleClick}><div className="text" >{props.text}</div></button>
      </div>
    );
  }