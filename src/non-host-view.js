import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logo.svg';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import PassionOne from './fonts/PassionOne.ttf';

//import UI components
import Customisation from './components/Customisation';
import Form from './components/NonHostForm';
import Header from './components/Header';
//import MainMenu from './components/MainMenu';
import Players from './components/PlayerList'

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8A;
    font-family: 'PassionOne';
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

const Holder = styled.div`


  border: solid 0.6em;
  border-color: #422d53;
  border-style: dotted;
  height: 20vmax;

`;

export const Row = styled.div`
  display: flex;
  padding: 4em;
  padding: 4em;
	position: relative;
	left: 10vw;
	top: 30%;
  font-family:'PassionOne';
`;

export const Button = styled.button`
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: calc(0.02*100vh);
    color: white;
    border: none;
    padding: 0.5em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';
    right: 10vw;

    :hover {
        text-decoration: underline;
    }
`;

export const Button1 = styled.button`
    position: relative;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: calc(0.02*100vh);
    color: white;
    border: none;
    padding: 0.5em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';

    :hover {
        text-decoration: underline;
    }
`;


const CodeStyle = styled.div`
  
  color:#271A31;
  position: relative;
  top: -25vh;

`;

const ButtonStyle = styled.div`

  position: relative;
  bottom: 25vh;
  left: 3.5vw;
`;


export const Code = styled.p`
    // font-size: 5em;
    font-size: calc(0.09*100vh);
    margin: 0;
    color: #cab1de;
    font-family:'PassionOne';
    margin-top: -3%;
    position:relative;
   top: 1vh;
   `;


class LobbyPage extends Component{


  state={
    name:"Bob",
    color:"",
    code:"",
    leaderboard:{0:{name:"Waiting for Players",score:0}}
  }


  getName(){
    return document.getElementById('nickname').value;
  }

getCode(){
    console.log(document.getElementById('gameCode').value);
    return document.getElementById('gameCode').value;
    
  }

  updateColor = (colorValue) =>{
    this.setState({
      color: colorValue
    })
    
    console.log(`color change:${this.state.color}`);
  }




  ReadyUp = () =>{
    //Get Name
    var nameValue=this.getName()
    var codeValue=this.getCode()
    //Get colour
    var colour=this.state.color


    var data={
      name: nameValue,
      code: codeValue,
      colour:"#c41111"
        
    }
    //Send host message here
      this.props.socket.emit("JOIN", data);

    
    

     
  }
  
  renderCustomisation =()=>{
    return(
      <Customisation saveColor={this.updateColor}/>
    )
  }

  renderPlayers =() =>{
    var {leaderboard} = this.state;
  console.log(`danny ${leaderboard[0].name}`)
    return (
        //Pass the leaderboard into the object
        <Players  players={leaderboard}/>
    
        )
    
  }


  componentWillMount(){
    //Check for if player has joined the lobby
        this.props.socket.on("PLAYERJOINED",name =>{
        console.log("joined");
      //Call for the leaderboard
      var data={
        code:this.state.code
      }
      this.props.socket.emit("LEADERBOARD",data)
    })
        
    


    //Listen for leaderboard update
    this.props.socket.on("LEADERBOARD",leaderboard=>{
      this.setState({
        leaderboard: leaderboard
      })

      console.log(`leaderboard: ${this.state.leaderboard}`)
    })


     //Wait for the signal back
     this.props.socket.on("GAMEREADY",(code) =>{
      //Redirect to quiz page
     
       //   document.location.href = 'Your url',true;
      //<Route path="/quiz-page" component={() => <Quiz socket={this.props.socket} code={this.state.code} />}/>
     
      console.log("GAMEREADYSIGNAL");
       window.location.href = "./#/quiz-page"
      
     
    });


  }
render() {
  return (
    <React.Fragment>
    <GlobalStyle/>
    <Header/>
    <Row>
    <Holder>
       	<Form Ready = {this.ReadyUp}/>
      <CodeStyle>
      </CodeStyle>
      
      </Holder>
    	<Customisation saveColor={this.updateColor}/>
      {this.renderPlayers()}
    
    </Row>


    </React.Fragment>
  );
}
}



/// ========================================
export default LobbyPage;