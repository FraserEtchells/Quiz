import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import PassionOne from './fonts/PassionOne.ttf';
import {
    HashRouter,
    Link,
} from "react-router-dom";

//import UI components
import Leaderboard from './components/Leaderboard';
import TimerQuiz from './components/Timer';
//import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
@font-face {
font-family: PassionOne;
src: url(${PassionOne});
}
body {
background-color:  #714C8;
font-family: 'PassionOne';
overflow: hidden;
text-align: center;
font: 50px;
}
`;

const Modal = styled.div`

width: 50vw;
height: 80vh;
background-color: #a578c4;
position: relative;
left: 25vw;
border-radius: 2em 2em 2em 2em;

`;


const LeaderStyle = styled.div`


position:relative;
top:12vh;
left: 8vw;
`;


const TimerStyle = styled.div`


font-size: 4em;
position: relative;
top: 5vh;
color: #600060;
`;

const AnswerStyle = styled.div`

color: #600060;
position: relative;
top: 2vh;

`;


class Page extends React.Component {

    state = {
        Leaderboard: {0: {name: "Loading", score: 0}}
    }
renderLeaderboard =() =>{
    let data = {code: this.props.code};
    this.props.socket.emit("LEADERBOARD", data);
    var {Leaderboard} = this.state; 
    return(  <Leaderboard leaderboard={Leaderboard}/>   
         
          )}

//componentWillMount(){
//
//    this.props.socket.on("LEADERBOARD", leaderboard => {
//        this.setState({
//            Leaderboard: leaderboard
//        })
//    })
//
//}
render() {
    return (
        <React.Fragment>
        <GlobalStyle/>


        <Modal>
        <AnswerStyle>
        </AnswerStyle>

        <TimerStyle>

        <h4> NEXT ROUND STARTS IN...</h4>

        <TimerQuiz/>
        </TimerStyle>

        <LeaderStyle>
</LeaderStyle>
</Modal>



</React.Fragment>
);
}
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);


export default Page;