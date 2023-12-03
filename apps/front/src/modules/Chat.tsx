import React from "react";
import "./Chat.css";

interface ChatProps {}

interface ChatState {
  channels: Channel[];
}

interface Channel {
  id: number;
  name: string;
}

export class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      channels: []
    };
  }

  componentDidMount() {
    fetch("/api/channels")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Channel[]) => {
        this.setState({ channels: data });
      });
  }

  render() {
    return (
      <div className="Chat">
        <h2>Channels</h2>
        <ul>
          {this.state.channels.map(channel => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}