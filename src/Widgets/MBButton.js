import React, { Component } from "react";
import { useNavigate } from "react-router-dom";




export default function Redirect(props) {
    let navigate = useNavigate();
    function handleClick() {
      navigate(props.pageURL)
    }
    let cssClass = "more ".concat(props.cssing)
    return (
      <div>
        <button class={cssClass} onClick={handleClick}><div class="text" >{props.text}</div></button>
      </div>
    );
  }