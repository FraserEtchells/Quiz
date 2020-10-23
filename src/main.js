import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import MainMenu from "./main-menu";
  import CustomisationPage from "./index-custom-page";
  import QuizPage from "./quiz-page";
  import SoloView from "./solo-view";
  import TimerPopUp from "./timerpopup";
  import NonHostView from "./non-host-view";
  import io from "socket.io-client"


const socket = io({ transports: ['websocket'] });

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: " ",
        };
        this.handler = this.handler.bind(this);
    }
    handler(newCode) {
        console.log("Updated code in Main");
        this.setState((state) => ({
            code: newCode
            
        }));
        console.log(this.state.code);

    }

  render() {
    return (
        <HashRouter>
            <div>
                <div className="content">
                    <Route exact path="/" component={MainMenu}/>
                    <Route path="/index-custom-page" render={(props) => <CustomisationPage {...props} action={this.handler} socket={socket} />}/>
                    <Route path="/quiz-page" component={() => <QuizPage socket={socket} code = {this.state.code}/>}/>
                    <Route path="/solo-view" component={() => <SoloView/>}/>
                    <Route path="/timerpopup" component={() => <TimerPopUp socket={socket} code = {this.state.code}/>}/>
                    <Route path="/non-host-view" render={(props) => <NonHostView {...props} action={this.handler} socket={socket} />}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}

export default Main;