import React from "react";
import './Navbar.css';

import { Dispatch } from "redux";
import { setIsPlay, setIsLadder, setIsChat, setIsProfile } from '../store';
import { connect } from "react-redux";
import { BoolState } from "../store";

interface NavbarProps {
  dispatch: Dispatch,
}

interface NavbarState {
  isPlay: boolean,
  isLadder: boolean,
  isChat: boolean,
  isProfile: boolean,
  childId: number
  
}





export class Navbar extends React.Component<NavbarProps, NavbarState> {
        
    constructor(props: NavbarProps) {
      super(props);
      this.state = {
        isPlay: false,
        isLadder: false,
        isChat: false,
        isProfile: false,
        childId: 0
      };

      
      this.handlePlay = this.handlePlay.bind(this);
      this.handleLadder = this.handleLadder.bind(this);
      this.handleChat = this.handleChat.bind(this);
      this.handleProfile = this.handleProfile.bind(this);
      
    }
    
    handleSetBooleans = () => {
      const { dispatch } = this.props;
        dispatch(setIsPlay(this.state.isPlay));
        dispatch(setIsLadder(this.state.isLadder));
        dispatch(setIsChat(this.state.isChat));
        dispatch(setIsProfile(this.state.isProfile));

    }

    componentDidUpdate(prevProps: NavbarProps, prevState: NavbarState) {
      if (this.state.isPlay !== prevState.isPlay
        || this.state.isLadder !== prevState.isLadder
        || this.state.isChat !== prevState.isChat
        || this.state.isProfile !== prevState.isProfile)
        this.handleSetBooleans();
    }

    handlePlay() {
      if (this.state.isPlay)
      {
        //close Play
        this.setState({isPlay: false}); 
      }
      else{
        //open Play
        this.setState({isPlay: true});
      }
      this.handleSetBooleans(); 
    };

    handleLadder() {
      if (this.state.isLadder)
      {
        //close Ladder
        this.setState({isLadder: false}); 
      }
      else{
        //open Ladder
        this.setState({isLadder: true});
      }
      this.handleSetBooleans(); 
    };

    handleChat() {
      if (this.state.isChat)
      {
        //close Chat
        this.setState({isChat: false}); 
      }
      else{
        //open Chat
        this.setState({isChat: true});
      }
      this.handleSetBooleans(); 
    };

    handleProfile() {
      if (this.state.isProfile)
      {
        //close Profile
        this.setState({isProfile: false}); 
      }
      else{
        //open Profile
        this.setState({isProfile: true});
      }
      this.handleSetBooleans(); 
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



  const mapStateToProps = (state: BoolState) => ({
    isPlay: state.isPlay,
    isLadder: state.isLadder,
    isChat: state.isChat,
    isProfile: state.isProfile,
  });

  export default connect(mapStateToProps)(Navbar);