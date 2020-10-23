import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import PassionOne from '../fonts/PassionOne.ttf';

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: PassionOne;
    src: url(${PassionOne});
  }
  body {
    background-color:  #714C8A;
    font-family: 'Passion One', cursive;
    overflow: hidden;
    text-align: center;
    font: 50px;
  }
`;

// grid width can be changed depending on how big the other components are
export const Grid = styled.div`
  background-color: #714C8A; // purple
 
  position: relative;
  left: 2em;
`;


//display: flex; stretches it out a bit vertically but then the text doesn't center align
//display: block; FIXES IT <3

//adding height stops it from stretching vertically
//but seems to put it in the top 'line' so if it's a long question it'll wrap to the line below
//so if it's a short one it leaves a gap for the line underneath
export const QuestionRow = styled.div`
  display: block;
  background-color: #DCC6E0; // lilac
  justifyContent: center;
  alignItems: center;
  margin:;
  padding: 1em;
  width:92vmin;
`;

export const QuestionText = styled.h2`
  font-size: calc(0.1em + 1vw);
  color: #714C8A;
`;

export const Row = styled.div`
  display: flex;

  justifyContent:center;
    alignItems: center;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

// button width used to be 400px but changed to percentage so it resizes

const Button = styled.button`
    font-family:'PassionOne';
    color: #714c8a;
    border: none;
    width: 48vmin;
    height: 20vmin;
    font-size: 2em;
    margin-bottom: 1vh;
    margin-right: 0.75vw;
    outline: none;
    
    :hover {
      text-decoration: underline;
      font-size: 1.5em;
    }
`;

const Button1 = styled(Button)` 
  background: #98FB98; // green
  font-size: 1.1em;
  color:##714c8a;
  `;

const Button2 = styled(Button)`
  background: #89C4F4; // blue  
   font-size:  1.1em;
  color:##714c8a;
  `;

const Button3 = styled(Button)`
  background: #DDA0DD; // pink
   font-size: 1.1em;
  color:##714c8a;
  `;

const Button4 = styled(Button)`
  background: #F4A460; // orange
   font-size: 1.1em;
  color:##714c8a;
  `;



// button border and colour if we decide to use it
//  border: 2px solid #a90081;

// want to use this colour in background but not sure how outside of divs
//  background-color: #7E549F;

class Answers extends React.Component {
  state = {
    question:[this.props.question],
    code:this.props.code,
    time:2,
    color:"",
      disable: false
  };

  componentWillMount(){




    //Recive the question
    this.props.socket.on("QUESTION", question =>{
        console.log(`Questions: ${question.question}`);
        this.setState({
          question:[question],
            disable: false
        })
    })
}


  CheckAns = (userSelect) =>{

    userSelect= userSelect.toString();
    if(userSelect === this.state.question[0].correct_ans){
        console.log("nice")
        this.setState({
            color: "green"
        })
        let scorevalue= 5*this.state.time;
        //Emit to score to server
        let data={
          score: scorevalue,
          code:this.props.code
        }

        this.props.socket.emit("SCORE",data);
        this.props.socket.emit("LEADERBOARD",data)

    }else{
        console.log("nope")
        this.setState({
            color: "red"
        })
    }

    //Request new question
}
  
   disableBtns = () =>{
    document.getElementById('ans1').disabled = true;
    document.getElementById('ans2').disabled = true;
    document.getElementById('ans3').disabled = true;
    document.getElementById('ans4').disabled = true;
    console.log('dis');
       this.setState({
           disable: true
       });
  }

  renderQuestion = () =>{
    var {question} = this.state;

    return question.map( q => {
            return (
                <h1>{q.question}</h1>
            );
        })
}

  renderAnswerA = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <Button1 id='ans1' onClick={() => this.handleClick(q.answer_a)} style = {{color: this.state.color}}>{q.answer_a}</Button1>
        )
    })
}

renderAnswerB = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <Button2 id='ans2' onClick={() => this.handleClick(q.answer_b)} style = {{color: this.state.color}}>{q.answer_b}</Button2>
        )
    })
}

renderAnswerC = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
        <Button3 id='ans3' onClick={() => this.handleClick(q.answer_c)} style = {{color: this.state.color}}>{q.answer_c}</Button3>
        )
    })
}

renderAnswerD = () =>{
    var {question} = this.state;

    return question.map( q => {
        return (
            <Button4 id='ans4'onClick={() => this.handleClick(q.answer_d)} style = {{color: this.state.color}}>{q.answer_d}</Button4>
        )
    })
}

handleClick = (userChoice) => {
    this.disableBtns();
    if(this.state.disable === false) {
    this.CheckAns(userChoice);
    }
}

  render() {
    return (
    <React.Fragment>
    <GlobalStyle/>
    <div className="App">

      <Grid>
        <QuestionRow>
          <QuestionText>
            {this.renderQuestion()}
          </QuestionText>
        </QuestionRow>

        <Row>
           <Button1 id='ans1' onClick={() => this.disableBtns()}>{this.renderAnswerA()}</Button1>
            <Button2 id='ans2' onClick={() => this.disableBtns()}>{this.renderAnswerB()}</Button2>
          </Row>
          <Row>

            <Button3 id='ans3' onClick={() => this.disableBtns()}>{this.renderAnswerC()}</Button3>
            <Button4 id='ans4' onClick={() => this.disableBtns()}>{this.renderAnswerD()}</Button4>
          </Row>
        </Grid>

    </div>

    </React.Fragment>
    );
  }
}

export default Answers;
