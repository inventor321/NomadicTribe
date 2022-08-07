import React, { Component } from "react";
import Redirect from "../Widgets/MBButton";
import './Explore.css'
import Rat from '../Assets/Rat.png';
import AdventurePath from "../Widgets/AdventurePath";

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
    this.enemyPosition = Math.floor(Math.random() * 80)+10;
    this.enemyPositionsAndIndexes = this.setEnemyPositions()
    this.Loot = [0,0,0]
        
  }

  setEnemyPositions = () =>{
    let eValue = Math.floor(this.state.exploredm2/40)+1
    let space = 90
    let list =[]
    let position = 0
    let previousPosition = 10 
    for(let i = 0;i<5 & eValue>0; i++){
      previousPosition = position+previousPosition
      let e = Math.floor(Math.random() * eValue);
      position = Math.floor(Math.random() * (space-(5*(5-i))));
      console.log(eValue, e, position+previousPosition,)
      space -= position
      eValue -= e+1
      list.push([position+previousPosition,e, "enemyCharacter "])
    }
    
    console.log("done")

    return list
  }

  componentCleanup(){
    clearInterval(this.eAttacker)
    clearTimeout(this.timeOut1)
    clearTimeout(this.timeOut2)
    clearTimeout(this.timeout3)
  }

  componentWillUnmount() {
      this.componentCleanup()
      window.removeEventListener('beforeunload', this.componentCleanup);
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.componentCleanup);
    this.setState({
      playerCharacter:"playerCharacter paused",
      enemyCharacter:"enemyCharacter",
      currentEnemyIndex:0,
      resultBox:{
        display:"none"
      },
      currentHP:20,
      maxHP:20,
      attackSPD:2,

      victory:false,
      loadEnemy:false,

      AttackCSS:{
        position: "absolute",
        left:"0",
        width: "100px",
        height: "200px",
        background:"aqua", 
      },
      AttackButtonDisabled:true,


    })

    

  }

  generateEnemy = () =>{
    console.log(this.state.currentEnemyIndex)
    let index = this.enemyPositionsAndIndexes[this.state.currentEnemyIndex][1]

    this.setState({
      entity:this.entities[index],
      ecurrentHP:this.entitiesHP[index],
      emaxHP:this.entitiesHP[index],
      eattackDMG:this.entitiesDMG[index],
      eattackSPD:this.entitiesSPD[index],
      eFood:Math.floor(Math.random() * this.eFood[index+1])+this.eFood[index],
      eAttackCSS:{
        position: "absolute",
        right: "0",
      },
      loadEnemy:true,

    })
  }

  startFight(){
    this.setState({
      AttackCSS:{
        position: "absolute",
        left:"0",
        width: "100px",
        height: "200px",
        background:"aqua", 
      },
      AttackButtonDisabled:false,
      playerCharacter:"playerCharacter paused",
    })

    this.generateEnemy()

    this.timeout3 = setTimeout(()=>{
    

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
          position: "absolute",
          right: "0",
          animation: `EAttack ${this.state.eattackSPD}s ease infinite`
        }
      });
      
  
    },1000)

    
  }

  stopFight(victory){
    clearInterval(this.eAttacker)
    clearTimeout(this.timeOut2)
    clearTimeout(this.enableAttack)

    this.setState({
      eAttackCSS:{ 
        position: "absolute",
        right: "0",
      },
      AttackButtonDisabled:true,
      
    });

    

    if(victory){
      let tempLoot = [this.state.eFood,0,5]
      this.Loot = this.Loot.map((a, i) => a + tempLoot[i]);

      this.enemyPositionsAndIndexes[this.state.currentEnemyIndex][2]="enemyCharacter red"
      this.setState({
        victory:true,
        playerCharacter:"playerCharacter",
      })
      window.localStorage.setItem('Loot',JSON.stringify(this.Loot))
    }else{
      this.setState({
        victory:false,
      })
    }

    if(this.state.currentEnemyIndex+1<this.enemyPositionsAndIndexes.length & victory){
      let tempTime = this.enemyPositionsAndIndexes[this.state.currentEnemyIndex+1][0]-this.enemyPositionsAndIndexes[this.state.currentEnemyIndex][0]
      this.setState({
        currentEnemyIndex:this.state.currentEnemyIndex+1,
      })
      setTimeout(()=>{
        this.startFight()
      },100*(tempTime*1.02))
    }else{
      if(victory){
        setTimeout(()=>{
          this.fightResult()
        },100*(100-this.enemyPositionsAndIndexes[this.state.currentEnemyIndex][0]))
      }else{
        this.fightResult()
      }
      
    }

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
        this.stopFight(true)
      }
    
    },
      this.state.attackSPD*500
    )

    this.enableAttack = setTimeout(()=>{
      this.setState({
        AttackCSS:{
          position: "absolute",
          left:"0",
          width: "100px",
          height: "200px",
          background:"aqua", 
        },
        AttackButtonDisabled:false
      })

    },this.state.attackSPD*1000)
  }

  

  fightResult(){
    this.setState({
      resultBox:{
        display:"block"
      },
    })
  }

  start = () =>{

    
    if(!(this.state.ecurrentHP>0) & this.state.currentHP>0 & this.timeOut1===undefined){

      this.setState({
        playerCharacter:"playerCharacter ",
      })

      this.timeOut1 = setTimeout(() =>{

          this.startFight()

      },100*this.enemyPositionsAndIndexes[this.state.currentEnemyIndex][0])
    }
  }
  
  render() {
        

        return <body >

        

        <h1 className="area">Forest <button className="startExplore" onClick={this.start}>Start</button></h1>

        <AdventurePath playerCharacter={this.state.playerCharacter} enemyPosition={this.enemyPosition} enemyPositionsAndIndexes={this.enemyPositionsAndIndexes}></AdventurePath>
        
        <div style={this.state.resultBox}>
        {this.state.victory && <div><div className="high" > You successfully explored the surrounding area!</div>
          <div className="ressourceGathered">You gathered {this.Loot[0]} food from your battle</div></div>}

        {!this.state.victory && <div><div className="high" > You have lost the battle!</div>
          <div className="ressourceGathered">You have lost a fellow bretheren (-1 pop)</div></div>}
          
          <Redirect pageURL="/NomadicTribe" text=" Go Back Home " cssing ={"more homeButton"} textCssing="text"></Redirect>
        </div>

        <div className="mainbackground">

            <div className="MainCharacter">
                

                <div style={this.state.AttackCSS}> </div>  
                  
              
                <div className="Charactername">You</div>
                <div className="stats"> Health: <br/> <div className="hp"> {this.state.currentHP} </div> / {this.state.maxHP} <br/>Attack : {this.attackDMG[this.state.swordIndex]}</div>
                <button onClick={()=>{this.Attack()}} disabled={this.state.AttackButtonDisabled}  className="Butt">Attack</button>
            </div>


            {this.state.loadEnemy && <div className="Enemy">
                <div className="cssLoadingHelper"> </div>
                {this.state.entity === "Rat" && <img style={this.state.eAttackCSS} src={Rat} alt="Rat" className={this.state.entity} />}
                {this.state.entity !== "Rat" && <div  className="blue" style={this.state.eAttackCSS}></div>}
                
                <div className="E Charactername">{this.state.entity}</div>
                <div className="E stats"> Health: <br/> <div className="hp"> {this.state.ecurrentHP} </div> / {this.state.emaxHP} <br/>Attack : {this.state.eattackDMG}</div>
            </div>}
            
        </div>

  </body>;

  }
}

export default Explore;