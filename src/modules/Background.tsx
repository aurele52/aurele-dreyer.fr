import React from "react";
import './Background.css';
import { Window } from "./Window";
import { Play } from "./Play";
import { Ladder } from "./Ladder";
import { Chat } from "./Chat";
import { Profile } from "./Profile";
import { BoolState } from "../store";
import { connect } from "react-redux";

interface BackgroundProps {
  bool: BoolState,
}

interface BackgroundState {
  childId: number,
  showPlay: boolean,
  showLadder: boolean,
  showChat: boolean,
  showProfile: boolean,
}

export class Background extends React.Component<BackgroundProps, BackgroundState> {
    constructor(props: BackgroundProps) {
      super(props);
      this.state = {
        childId: 4,
        showPlay: false,
        showLadder: false,
        showChat: false,
        showProfile: false,
      }
    }
  

    render() {
      return (
        <div id="Background">
            <div style={{ display:this.props.bool.isPlay ? 'block' : 'none'}}><Window 
              WindowName={"Play"} 
              width={"600"} 
              height={"450"} 
              id={0} 
              content={Play} /></div>
            <div style={{ display:this.props.bool.isLadder ? 'block' : 'none'}}><Window 
              WindowName={"Ladder"} 
              width={"400"} 
              height={"600"} 
              id={1} 
              content={Ladder} /></div>
            <div style={{ display:this.props.bool.isChat ? 'block' : 'none'}}><Window 
              WindowName={"Chat"} 
              width={"400"} 
              height={"600"} 
              id={2} 
              content={Chat} /></div>
            <div style={{ display:this.props.bool.isProfile ? 'block' : 'none'}}><Window 
              WindowName={"Profile"} 
              width={"400"} 
              height={"400"} 
              id={3} 
              content={Profile} /></div>
        </div>
  
      )
    }
};

const mapStateToProps = (state: { bool: BoolState }) => ({
  bool: state.bool,
});
export default connect(mapStateToProps)(Background);