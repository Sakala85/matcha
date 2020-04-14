import React from "react";

import onlineIcon from "../../../shared/icons/onlineIcon.png";
import offlineIcon from "../../../shared/icons/offlineIcon.png";
import closeIcon from "../../../shared/icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room, online }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      {online && (
        <img className="onlineIcon" width="20px" src={onlineIcon} alt="online icon" />
      )}
      {!online && (
        <img className="onlineIcon" width="20px" src={offlineIcon} alt="offline icon" />
      )}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/join">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
