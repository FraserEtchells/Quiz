import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import PassionOne from '../fonts/PassionOne.ttf';
import {
  HashRouter,
  Link,
} from "react-router-dom";
import { render } from '@testing-library/react';

// Placeholder code until fetching from BE
var lobbyCode = "HSAKHFV";
var nname;

export const Grid = styled.div``;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

export const Div = styled.div`
  text-align: center;
  display: block;
  align-content: center;
  border: solid 0.6em;
  border-color: #422d53;
  border-style: dotted;

  height: calc(0.32*100vh);
  width: calc(0.18*100vw);
`;

export const Button = styled.button`
    position: absolute;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #E266AC;
    font-size: calc(0.03*100vh);
    color: white;
    border: none;
    padding: 0.5em;
    outline: none;
    border-radius: 0.8em;
    font-family:'PassionOne';
    margin-top: 1%;

    :hover {
        text-decoration: underline;
    }

    &:disabled {
      opacity: 50%;
      text-decoration: none;
    }
`;

export const Form = styled.form`
    padding: 1em;
    display: inline-block;
    margin: auto;
    align-content: center;
    text-align: center;
`;

export const TextInput = styled.input`
  background-color: white;
  opacity: 0.7;
  color: black;
  outline: none;
  border: none;
  padding: 6%;
  // padding: 0.7em;
  border-radius: 25px;
  text-align: center;
  width: 92%;
  font-size: calc(0.02*100vh);
  font-family: 'PassionOne';
`;

export const Label = styled.label`
  color: black;
  opacity: 0.7;
  font-family:'PassionOne';
  padding-right: 0.3em;
  padding-left: 0.3em;
  text-align: center;
  font-size: calc(0.04*100vh);
  margin-top: 4%;
`;

export const Code = styled.p`
    font-size: 5em;
    margin: 0;
    color: #cab1de;
    font-family:'PassionOne';
`;

const GlobalStyle = createGlobalStyle`
     @font-face {
      font-family: PassionOne;
      src: url(${PassionOne});
    }
    body {
      background-color: #714C8A;
      text-align: center;
      align-content: center;
    }
`;

// this is necessary but unsure what for
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { disabled: false }
    }
  

  handleInputBoxes = () => {
    // this.setState( {disabled: !this.state.disabled} );
    document.getElementById('nickname').disabled = true;
    document.getElementById('gameCode').disabled = true;
  } 

  disableBtn = () => {
    document.getElementById('submit').disabled = true;
    console.log('disabled buttons');
  }

  callFns = () => {
    this.disableBtn();
    // this.handleInputBoxes.bind(this);
    this.handleInputBoxes();
      this.props.Ready();
  }

  render() {
    return (
        <React.Fragment>
          <GlobalStyle/>
          <Div className='PlayerInput'>
            <Form id="PIFrm" name="Player input form">
              <Row>
                <Label for='nickname'>NICKNAME</Label>
                <TextInput type='text' id='nickname' name='nickname'/>
              </Row>
              <Row>
                <Label for='gameCode'>GAME CODE</Label>
                <TextInput type='text' id='gameCode' name='gameCode'/>
              </Row>
              <HashRouter>
                {/* <Link to='./quiz-page'> */}
                  <Button id='submit' type='submit' onClick={() => this.callFns()}>READY</Button>

                {/* </Link> */}
              </HashRouter>
            </Form>
          </Div>
        </React.Fragment>
      );
    }
}

// disableOnclick = (e) =>{
//   e.target.disabled = true
// }



// const PlayerInputFrm = () => {

// }



// ReactDOM.render(
//     <PlayerInputFrm/>,
//     document.getElementById('root')
//   );

export default PlayerInput;