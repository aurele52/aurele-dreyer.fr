import React, { ReactNode } from "react";
import './Window.css';
import { Rnd } from "react-rnd";
import { ConnectedProps, connect } from "react-redux";
import { delWindow } from "../reducers";

interface WindowProps extends ReduxProps{
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
    windowMoveLock: boolean,
    windowResizeLock: boolean,
    clickStartTime: number | null;
}



export class Window extends React.Component<WindowProps, WindowState> {
    rnd: any;
    constructor(props: WindowProps) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            posX: 0,
            posY: 150,
            isReduced: false,
            windowMoveLock: false,
            windowResizeLock: false,
            clickStartTime: null,
            }
        var rnd = null;
        this.handleClose = this.handleClose.bind(this);
        this.handleEnlarge = this.handleEnlarge.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        
    }    

    handleMouseDown = () => {
        this.setState({
          clickStartTime: Date.now(),
        });
      };
    
      handleMouseUp = () => {
        if (this.state.clickStartTime == null)
            return;
        const clickDuration = Date.now() - (this.state.clickStartTime || 0);
        if (clickDuration < 200) {
          this.setState({
            isReduced: false,
            clickStartTime: null,
            windowMoveLock: false,
            windowResizeLock: false
          });
          this.rnd.updateSize({
            height: this.state.height
        })
        }
      };

    handleReduce( ){
        
        this.setState({
            isReduced: !this.state.isReduced,
            clickStartTime: null,
            windowResizeLock: !this.state.isReduced,
            windowMoveLock: false
        }, () => {
            this.rnd.updateSize({
                height: "100"
            })
        })
    }

    handleEnlarge() {
        this.setState({
            windowMoveLock: !this.state.windowMoveLock,
            windowResizeLock: !this.state.windowMoveLock
        }, () => {
            if (this.state.windowMoveLock)
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
        this.props.dispatch(delWindow(this.props.id));
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
            enableResizing={!this.state.windowResizeLock}
            disableDragging={this.state.windowMoveLock}
            ref={c => {this.rnd = c;}}
            >
                <div
                    className={this.state.isReduced ? "reducedWindow" : "Window"}
                    onMouseDown={this.state.isReduced ? this.handleMouseDown : undefined}
                    onMouseUp={this.state.isReduced ? this.handleMouseUp : undefined}
                >
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

  const mapDispatchToProps = null;

  const connector = connect(mapDispatchToProps);
  type ReduxProps = ConnectedProps<typeof connector>;
  
  export default connector(Window);