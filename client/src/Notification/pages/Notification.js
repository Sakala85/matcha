import React from "react";
import NotificationList from '../components/NotificationList';

const Notification = () => {
    const NOTIF = [
        {
            id:"1",
            type: "Like",
            userName: "Julie",
            image: require("../../img/profile_picture/julie.jpg"),
            date: "12/03/20",
            link: "/match",
            key: "1"
        },
        {
            id:"2",
            type: "Chat",
            userName: "Julie",
            image: require("../../img/profile_picture/julie.jpg"),
            link: "/chat?name=moi&room=Julie",
            date: "12/03/20",
            key: "2"
        },
        {
            id:"3",
            type: "Chat",
            userName: "Obama",
            image: require("../../img/profile_picture/obama.jpg"),
            link: "/chat?name=moi&room=Obama",
            date: "12/03/20",
            key: "3"
        }
    ]
    return <NotificationList items={NOTIF} />;
};

export default Notification;
