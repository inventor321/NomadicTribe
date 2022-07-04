import React, { Component } from "react";
import './MoreButtons.css';

export default class MoreButtons extends Component{
    

    

    render = () => (
        <div>
            <button class="more TT"><div class="text" >Tech Tree</div></button>
            <button class="more C"><div class="text" > Cave </div></button>
            <button class="more O"><div class="text" > Ocean </div></button>
            <button class="more MC"><div class="text" > Magic Crystal </div></button>
        </div>
    );
}