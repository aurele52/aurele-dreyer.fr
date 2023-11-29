import React from "react";
import './Window.css';
let Draggable = require('react-draggable');

interface WindowProps {
    WindowName: string,
    width: string,
    height: string,
    id: number,
    content: React.ComponentType<any>
}

interface WindowState {
    isDraggable: boolean
}



export class Window extends React.Component<WindowProps, WindowState> {
    constructor(props: WindowProps) {
        super(props);
        this.state = {
            isDraggable: false
        }
        
    }
    render() {
        const windowstyle = {
            width: this.props.width + "px",
            height: this.props.height + "px",
        }
      return (
        <Draggable
            handle=".handleBar"
            scale={1}>
                <div id="Window" style={windowstyle}>
            

                    <div className="handleBar">
                        <div className="WindowName"><div>{this.props.WindowName.toUpperCase()}</div></div>

                    </div>
                    <div className="ButtonReduce">
                        <div></div>
                    </div>
                    <div className="ButtonEnlarge">
                        <div></div>
                    </div>
                    <div className="ButtonClose">
                        <div></div>
                    </div>
                    <div className="content"></div>

                
                </div>
        </Draggable>
  
      )
    }
  }