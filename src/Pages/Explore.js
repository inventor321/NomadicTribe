import React, { Component } from "react";
import Redirect from "../Widgets/MBButton";
import './Explore.css'

class Explore extends Component {
  
  constructor(){
    super();
    if(window.localStorage.getItem('state')!==null){
      this.state=JSON.parse(window.localStorage.getItem('state'))
    } 
    this.attackDMG = [1, 3, 6, 10, 15, 21, 28]

    
    this.entities = ["Rat", "Mischief", "Huge Rat", "Wolf","A Pack", "Cub", "Mama Bear"]
    this.entitiesHP = [5, 15, 20, 22, 44, 50, 100]
    this.entitiesDMG = [1, 3, 5, 7, 9, 20, 50]
    this.entitiesSPD = [2, 2, 2, 1.5, 1, 2, 3]
    this.eFood = [1,3,7,10,15,40,60,150]
    this.componentCleanup = this.componentCleanup.bind(this);
        
  }

  componentCleanup(){
    clearInterval(this.eAttacker)
    clearTimeout(this.timeOut1)
    clearTimeout(this.timeOut2)
  }

  componentWillUnmount() {
      this.componentCleanup()
      window.removeEventListener('beforeunload', this.componentCleanup);
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.componentCleanup);
    let index = Math.floor(Math.random() * this.state.exploredm2/20);
    this.setState({
      resultBox:{
        display:"none"
      },
      currentHP:20,
      maxHP:20,
      attackSPD:2,

      entity:this.entities[index],
      ecurrentHP:this.entitiesHP[index],
      emaxHP:this.entitiesHP[index],
      eattackDMG:this.entitiesDMG[index],
      eattackSPD:this.entitiesSPD[index],
      eFood:Math.floor(Math.random() * this.eFood[index+1])+this.eFood[index],
      victory:false,

      AttackCSS:{
        position: "absolute",
        left:"0",
        width: "100px",
        height: "200px",
        background:"aqua", 
      },
      AttackButtonDisabled:false,

      eAttackCSS:{
        width: "100px",
        height: "200px",
        background:"aqua",  
        position: "absolute",
        right: "0",
      },


    })

    this.timeOut1 = setTimeout(() =>{
      this.startFight()
    },500)

  }

  startFight(){

    this.timeOut2 =setTimeout(() =>{

      this.setState({
        currentHP:this.state.currentHP-this.state.eattackDMG
      })
      if(this.state.currentHP-this.state.eattackDMG<=0){
        setTimeout(()=>{
          window.localStorage.setItem('Loot',JSON.stringify([0,1,0]));
          this.stopFight(false)
        },this.state.eattackSPD*500)
          
        
      }
      

      this.eAttacker = setInterval(() => {
      
          
      if(this.state.currentHP-this.state.eattackDMG<=0){
        setTimeout(()=>{
          window.localStorage.setItem('Loot',JSON.stringify([0,1,0]));
          this.stopFight(false)
        },this.state.eattackSPD*500)
          
        
      }
        
      
      this.setState({
      currentHP:this.state.currentHP-this.state.eattackDMG
      })

    
    
      },this.state.eattackSPD*1000)
        
        
    },this.state.eattackSPD*500)

    

    this.setState({
      eAttackCSS:{
        width: "100px",
        height: "200px",
        background:"aqua",  
        position: "absolute",
        right: "0",
        animation: `EAttack ${this.state.eattackSPD}s ease infinite`
      }
    });

    
  }

  stopFight(victory){
    clearInterval(this.eAttacker)
    clearTimeout(this.enableAttack)
    this.setState({
      eAttackCSS:{
        width: "100px",
        height: "200px",
        background:"aqua",  
        position: "absolute",
        right: "0",
      },
      AttackButtonDisabled:true,
      
    });

    if(victory){
      this.setState({
        victory:true,
      })
    }

    this.fightResult()
    
  }


  Attack(){
    this.setState({
      AttackCSS:{
        position: "absolute",
        left:"0",
        width: "100px",
        height: "200px",
        background:"aqua", 
        animation: `Attack ${this.state.attackSPD}s ease`
      },
      AttackButtonDisabled:true
    })

    
     
    setTimeout(()=>
      {
      this.setState({
        ecurrentHP:this.state.ecurrentHP-this.attackDMG[this.state.swordIndex],
      })
      if(this.state.ecurrentHP-this.attackDMG[this.state.swordIndex]<=0){
        window.localStorage.setItem('Loot',JSON.stringify([this.state.eFood,0,5]));
        this.stopFight(true)
      }
    
    },
      this.state.attackSPD*500
    )

    this.enableAttack = setTimeout(()=>this.setState({
      AttackCSS:{
        position: "absolute",
        left:"0",
        width: "100px",
        height: "200px",
        background:"aqua", 
      },
      AttackButtonDisabled:false
    }),this.state.attackSPD*1000)
  }
  

  fightResult(){
    this.setState({
      resultBox:{
        display:"block"
      },
    })
  }

  
  render() {
        

        return <body >

        

        <h1 className="area">Forest</h1>
        
        <div style={this.state.resultBox}>
        {this.state.victory && <div><div className="high" > You have won the battle!</div>
          <div className="ressourceGathered">You gathered {this.state.eFood} food from your battle</div></div>}

        {!this.state.victory && <div><div className="high" > You have lost the battle!</div>
          <div className="ressourceGathered">You have lost a fellow bretheren</div></div>}
          
          <Redirect pageURL="/NomadicTribe" text=" Go Back Home " cssing ={"more homeButton"} textCssing="text"></Redirect>
        </div>

        <div className="mainbackground">

            <div className="MainCharacter">
                

                <div style={this.state.AttackCSS}> </div> 
                  
              
                <div className="Charactername">You</div>
                <div className="stats"> Health: <br/> <div className="hp"> {this.state.currentHP} </div> / {this.state.maxHP} <br/>Attack : {this.attackDMG[this.state.swordIndex]}</div>
                <button onClick={()=>{this.Attack()}} disabled={this.state.AttackButtonDisabled}  className="Butt">Attack</button>
            </div>


            <div className="Enemy">
                 
                <div style={this.state.eAttackCSS}></div>
                <div className="E Charactername">{this.state.entity}</div>
                <div className="E stats"> Health: <br/> <div className="hp"> {this.state.ecurrentHP} </div> / {this.state.emaxHP} <br/>Attack : {this.state.eattackDMG}</div>
            </div>
            
        </div>

  </body>;

  }
}

export default Explore;