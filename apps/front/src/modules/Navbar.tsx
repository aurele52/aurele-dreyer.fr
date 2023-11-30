import React from "react";
import './Navbar.css';
import { connect, ConnectedProps } from "react-redux";
//import { Window } from "./Window";
//import { Play } from "./Play";
//import { Ladder } from "./Ladder";
//import { Chat } from "./Chat";
//import { Profile } from "./Profile";
import { addWindow } from "../reducers";

interface NavbarProps extends ReduxProps {
}

interface NavbarState {
  
}



export class Navbar extends React.Component<NavbarProps, NavbarState> {
        
    constructor(props: NavbarProps) {
      super(props);
      this.state = {
      };
      this.handlePlay = this.handlePlay.bind(this);
      this.handleLadder = this.handleLadder.bind(this);
      this.handleChat = this.handleChat.bind(this);
      this.handleProfile = this.handleProfile.bind(this);
      
    }

    
    handlePlay() {
      const newWindow = {
          WindowName:"Play",
          width:"500",
          height:"500",
          id: 0,
          content: { type: 'PLAY' },
      };
      this.props.dispatch(addWindow(newWindow));
      console.log("Handle Play")
    };

    handleLadder() {
      const newWindow = {
          WindowName:"Ladder",
          width:"500",
          height:"500",
          id: 0,
          content: { type: 'LADDER' },
      };
      this.props.dispatch(addWindow(newWindow));

      console.log("Handle Ladder")
    };

    handleChat() {
      const newWindow = {
          WindowName:"Chat",
          width:"500",
          height:"500",
          id: 0,
          content: { type: 'CHAT' },
      };
      this.props.dispatch(addWindow(newWindow));

      console.log("Handle Chat")
    };

    handleProfile() {
      const newWindow = {
          WindowName:"Profile",
          width:"500",
          height:"500",
          id: 0,
          content: { type: 'PROFILE' },
      };
      this.props.dispatch(addWindow(newWindow));

      console.log("Handle Profile")
    };

    render() {
      return (
        <div id="Navbar">
            <div>
              <div className="NavButton" onClick={this.handlePlay}><div><div>PLAY</div></div></div>
              <div className="NavButton" onClick={this.handleLadder}><div><div>LADDER</div></div></div>
              <div className="NavButton" onClick={this.handleChat}><div><div>CHAT</div></div></div>
              <div className="NavButton" onClick={this.handleProfile}><div><div>MY PROFILE</div></div></div>
            </div>
        </div>
  
      )
    }
  }
  
const mapDispatchToProps = null;

  const connector = connect(mapDispatchToProps);
  type ReduxProps = ConnectedProps<typeof connector>;
  
  export default connector(Navbar);
  