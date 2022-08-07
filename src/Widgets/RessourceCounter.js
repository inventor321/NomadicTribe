import React, { Component } from "react";
import './RessourceCounter.css';
import Campfire from './Campfire';
import CraftButton from "./CraftButton";

const swordsNextRequirements = [50,100,200,350,500,1000]
const swords = ['Wooden Sword', 'Stone Sword', 'Copper Sword', 'Bronze Sword', 'Iron Sword', 'Steel Sword']

export default class RessourceCounter extends Component{

    componentDidMount() {
        this.props.updateRessources()
        
        this.Workers = setInterval(()=>{
            this.props.addRessources('W')
            this.props.addRessources('F')
            if(this.props.huts>this.props.population){
                this.addPop(1)
            }
        }, 1000);
        this.timeForNewWorker = 20

        //this.hunger = setInterval(()=>{this.props.hunger()},5000)
        
    }
    
    componentWillUnmount() { 
        clearInterval(this.Workers);
        clearInterval(this.hunger);
        this.props.lastWorking(new Date());
    }
    

    addPop = () => {
        if(this.timeForNewWorker>0){
            this.timeForNewWorker = this.timeForNewWorker-1
        }else{
            this.timeForNewWorker = 20
            this.props.addPop()
        }
        
    }

    startFire = event => {
        this.props.startFire();
    };

    addW = (addsub, type) => {
        this.props.addW(addsub, type);
    }

    hut = () =>{
        if(this.props.wood>=(50*(2+this.props.huts)) & this.props.food >=(10*(2+this.props.huts))){
            this.props.hut();
        }
        

    }

    pouch = () =>{
        if(this.props.wood>=20 & this.props.food >=20){
            this.props.pouch();
        }
    }

    render = () =>{ 
        return(
        <div>
            <div className="ressourceContainer">
            
                <div className="Population"> Population : {this.props.population}/{this.props.maxPopulation} </div> 
                <div className="Food">Food : {this.props.food} </div>
                <div className="Wood">Wood : {this.props.wood} </div>
                {this.props.technologyAvailable[3] && <div className="Wood">Huts : {this.props.huts} </div> }
            </div>
            <div className="workerContainer">
                <div className="workers"> {this.props.population-1} Workers </div>
                <div className="workers"> <button className="changeBTN" onClick={() => this.addW(true,'F')}>+</button> {this.props.FW} <button className="changeBTN" onClick={() =>this.addW(false,'F')}>-</button> </div>
                <div className="workers"> <button className="changeBTN" onClick={() =>this.addW(true,'W')}>+</button> {this.props.WW} <button className="changeBTN" onClick={() =>this.addW(false,'W')}>-</button> </div>
            </div>
            {this.props.fire && <Campfire></Campfire>}

            <div className="shopMargin">
                <div className="shopContainer">

                    <h1 id="shop"> Craft </h1>

 
                    {!this.props.fire && <CraftButton prices={[0,5]} name={" Start Fire "} upgradeFunction ={this.startFire} class={"campfire"}/>}
                    {this.props.fire && <CraftButton prices={[0,5]} name={" Add Wood "} upgradeFunction ={this.startFire} class={"campfire"}/>}
                    {(this.props.technologyAvailable[2] && !this.props.pouchAcquired) && <CraftButton prices={[20,20]} name={"Pouch"} upgradeFunction ={this.pouch} class={"pouchh"}/>}
                    {(this.props.technologyAvailable[3]) && <CraftButton prices={[(10*(2+this.props.huts)),(50*(2+this.props.huts))]} name={"Hut"} upgradeFunction ={this.hut} class={"hutt"}/>}
                    {(this.props.technologyAvailable[4] && this.props.swordInfo===0) && <CraftButton prices={[0,swordsNextRequirements[this.props.swordInfo]]} name={swords[this.props.swordInfo]} upgradeFunction ={this.props.upgradeSword} class={"sword"}/>}
                    {(this.props.technologyAvailable[5] && this.props.swordInfo===1) && <CraftButton prices={[0,swordsNextRequirements[this.props.swordInfo]]} name={swords[this.props.swordInfo]} upgradeFunction ={this.props.upgradeSword} class={"sword"}/>}
                    {(this.props.technologyAvailable[6] && this.props.swordInfo===2) && <CraftButton prices={[0,swordsNextRequirements[this.props.swordInfo]]} name={swords[this.props.swordInfo]} upgradeFunction ={this.props.upgradeSword} class={"sword"}/>}
                   


                    
                </div> 
            </div>
        </div>
       
    );
}
}