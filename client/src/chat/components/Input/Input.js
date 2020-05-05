import React from 'react';

import './Input.css';
import { Icon } from '@material-ui/core';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}><Icon className="send" >send</Icon></button>
      {/* return  <h4 className="title__card"><Icon color="primary">visibility</Icon><span >Visit your profil</span> </h4>; */}

  </form>
)

export default Input;