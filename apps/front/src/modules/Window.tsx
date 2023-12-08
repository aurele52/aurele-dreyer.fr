import { ReactNode, useState, useRef, useEffect } from "react";
import "./Window.css";
import { Rnd } from "react-rnd";
import { ConnectedProps, connect } from "react-redux";
import { delWindow } from "../reducers";

interface WindowProps extends ReduxProps {
  WindowName: string;
  width: string;
  height: string;
  id: number;
  children: ReactNode;
}

export function Window({
  dispatch,
  WindowName,
  width,
  height,
  id,
  children,
}: WindowProps) {
  const [state, setState] = useState({
    width,
    height,
    posX: 0,
    posY: 150,
    isReduced: false,
    windowMoveLock: false,
    windowResizeLock: false,
    clickStartTime: 0,
  });

  const rndRef = useRef<Rnd>(null);

  const handleMouseDown = () => {
    setState({
      ...state,
      clickStartTime: Date.now(),
    });
  };

  const handleMouseUp = () => {
    if (state.clickStartTime == null) return;
    const clickDuration = Date.now() - (state.clickStartTime || 0);
    if (clickDuration < 200) {
      setState({
        ...state,
        isReduced: false,
        clickStartTime: 0,
        windowMoveLock: false,
        windowResizeLock: false,
      });
      rndRef.current?.updateSize({
        height: state.height,
        width: "",
      });
    }
  };

  const handleReduce = () => {
    setState({
      ...state,
      isReduced: !state.isReduced,
      clickStartTime: 0,
      windowResizeLock: !state.isReduced,
      windowMoveLock: false,
    });
    rndRef.current?.updateSize({
      height: "100",
      width: "",
    });
  };

  const handleEnlarge = () => {
    setState({
      ...state,
      windowMoveLock: !state.windowMoveLock,
      windowResizeLock: !state.windowMoveLock,
    });
  };

  useEffect(() => {
    if (state.windowMoveLock) {
      rndRef.current?.updateSize({
        height: "100%",
        width: "100%",
      });
      rndRef.current?.updatePosition({
        x: 0,
        y: 0,
      });
    } else {
      rndRef.current?.updateSize({
        height: state.height,
        width: state.width,
      });
      rndRef.current?.updatePosition({
        x: state.posX,
        y: state.posY,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.windowMoveLock]);

  const handleClose = () => {
    dispatch(delWindow(id));
  };

  const reduceSVG = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="13" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="9" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="11" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="5" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="13" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="7" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="7" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="3" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="9" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="5" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="11" y="9" width="2" height="2" fill="#FAF7A4" />
    </svg>
  );

  const enlargeSVG = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="8" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="10" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="12" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="8" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="10" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="12" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="6" width="2" height="2" fill="#00BBAA" />
    </svg>
  );

  const closeSVG = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="10" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="12" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="6" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="6" y="11" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="4" y="13" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="8" y="9" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect
        x="10"
        y="11"
        width="2"
        height="2"
        fill="#F06E8D"
        stroke="#F06E8D"
      />
      <rect
        x="12"
        y="13"
        width="2"
        height="2"
        fill="#F06E8D"
        stroke="#F06E8D"
      />
    </svg>
  );

  return (
    <Rnd
      default={{
        x: state.posX,
        y: state.posY,
        width: state.width,
        height: state.height,
      }}
      minWidth={300}
      minHeight={100}
      bounds="window"
      dragHandleClassName="handleBar"
      enableResizing={!state.windowResizeLock}
      disableDragging={state.windowMoveLock}
      ref={rndRef}
    >
      <div
        className={state.isReduced ? "reducedWindow" : "Window"}
        onMouseDown={state.isReduced ? handleMouseDown : undefined}
        onMouseUp={state.isReduced ? handleMouseUp : undefined}
      >
        <div className="handleBar">
          <div className="WindowName">
            <div>{WindowName.toUpperCase()}</div>
          </div>
          <div className="ButtonReduce Button" onClick={handleReduce}>
            <div>
              <div>
                <div>{reduceSVG}</div>
              </div>
            </div>
          </div>
          <div className="ButtonEnlarge Button" onClick={handleEnlarge}>
            <div>
              <div>
                <div>{enlargeSVG}</div>
              </div>
            </div>
          </div>
          <div className="ButtonClose Button" onClick={handleClose}>
            <div>
              <div>
                <div>{closeSVG}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </Rnd>
  );
}

const mapDispatchToProps = null;

const connector = connect(mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedWindow = connector(Window);
export default ConnectedWindow;
