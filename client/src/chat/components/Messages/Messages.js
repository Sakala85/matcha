import React from 'react';

import Message from './Message/Message';

import './Messages.css';

const Messages = (props) => (
  
  <div className="messages">
    {props.messages.map((message, i) => <div key={i}><Message message={message} name={props.name}/></div>)}
  </div>
);

export default Messages;