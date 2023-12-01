import React from "react";
import './empty.css';

interface emptyProps {

}

interface emptyState {

}

export class empty extends React.Component<emptyProps, emptyState> {
    constructor(props: emptyProps) {
      super(props);

    }
  

    render() {
      return (
        <div id="empty">
            
        </div>
  
      )
    }
  }