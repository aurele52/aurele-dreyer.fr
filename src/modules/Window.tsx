import React, { ReactNode } from "react";
import './Window.css';
import { Rnd } from "react-rnd";

interface WindowProps {
    WindowName: string,
    width: string,
    height: string,
    id: number,
    children: ReactNode
}

interface WindowState {
    width: string,
    height: string,
    posX: number,
    posY: number,
    isReduced: boolean,
    windowLock: boolean,
}



export class Window extends React.Component<WindowProps, WindowState> {
    rnd: any;
    constructor(props: WindowProps) {
        super(props);
        this.state = {
            width: "500",
            height: "300",
            posX: 0,
            posY: 150,
            isReduced: false,
            windowLock: false,
        }
        var rnd = null;
        this.handleClose = this.handleClose.bind(this);
        this.handleEnlarge = this.handleEnlarge.bind(this);
        this.handleReduce = this.handleReduce.bind(this);

        
    }    

    handleReduce() {
        this.setState({
            isReduced: !this.state.isReduced
        }, () => {

        })
    }

    handleEnlarge() {
        this.setState({
            windowLock: !this.state.windowLock
        }, () => {
            if (this.state.windowLock)
            {
                this.rnd.updateSize({
                    height: "100%",
                    width: "100%",
                });
                this.rnd.updatePosition({
                    x: 0,
                    y: 0,
                });
            }
            else
            {
                this.rnd.updateSize({
                    height: this.state.height,
                    width: this.state.width,
                  });
                  this.rnd.updatePosition({
                    x: this.state.posX,
                    y: this.state.posY,
                  });
            }
        })
    }

    handleClose() {

    }

    render() {

        const reduceSVG = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="13" y="9" width="2" height="2" fill="#FAF7A4"/>
            <rect x="9" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="11" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="5" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="13" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="7" y="11" width="2" height="2" fill="#FAF7A4"/>
            <rect x="7" y="9" width="2" height="2" fill="#FAF7A4"/>
            <rect x="3" y="9" width="2" height="2" fill="#FAF7A4"/>
            <rect x="9" y="9" width="2" height="2" fill="#FAF7A4"/>
            <rect x="5" y="9" width="2" height="2" fill="#FAF7A4"/>
            <rect x="11" y="9" width="2" height="2" fill="#FAF7A4"/>
        </svg>);

      const enlargeSVG = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="3" y="6" width="2" height="2" fill="#00BBAA"/>
            <rect x="3" y="8" width="2" height="2" fill="#00BBAA"/>
            <rect x="3" y="10" width="2" height="2" fill="#00BBAA"/>
            <rect x="3" y="12" width="2" height="2" fill="#00BBAA"/>
            <rect x="3" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="6" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="8" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="10" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="12" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="9" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="9" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="5" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="11" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="11" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="5" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="7" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="13" y="14" width="2" height="2" fill="#00BBAA"/>
            <rect x="7" y="4" width="2" height="2" fill="#00BBAA"/>
            <rect x="11" y="6" width="2" height="2" fill="#00BBAA"/>
            <rect x="5" y="6" width="2" height="2" fill="#00BBAA"/>
            <rect x="7" y="6" width="2" height="2" fill="#00BBAA"/>
            <rect x="9" y="6" width="2" height="2" fill="#00BBAA"/>
        </svg>
      );
      const closeSVG = (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="10" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="12" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="6" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="6" y="11" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="4" y="13" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="8" y="9" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="10" y="11" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
            <rect x="12" y="13" width="2" height="2" fill="#F06E8D" stroke="#F06E8D"/>
        </svg>
      );
      return (
        <Rnd
            default={{
                x: this.state.posX,
                y: this.state.posY,
                width: this.state.width,
                height: this.state.height,
            }}
            minWidth={300}
            minHeight={100}
            bounds="window"
            dragHandleClassName="handleBar"
            enableResizing={!this.state.windowLock}
            disableDragging={this.state.windowLock}
            ref={c => {this.rnd = c;}}
            >
                <div className="Window">
                    <div className="handleBar">
                        <div className="WindowName"><div>{this.props.WindowName.toUpperCase()}</div></div>
                            <div className="ButtonReduce Button" onClick={this.handleReduce}>
                                <div><div><div>{reduceSVG}</div></div></div>
                            </div>
                            <div className="ButtonEnlarge Button" onClick={this.handleEnlarge}>
                                <div><div><div>{enlargeSVG}</div></div></div>
                            </div>
                            <div className="ButtonClose Button" onClick={this.handleClose}>
                                <div><div><div>{closeSVG}</div></div></div>
                            </div>
                        </div>
                    <div className="content">{this.props.children}</div>
                </div>
            </Rnd>  
      )
    }
  }