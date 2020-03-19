import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


const NotificationDisplay = () => {
    return (
      <div className="app-container">
        <ReactNotification />
      </div>
    )
  };

  export default NotificationDisplay;