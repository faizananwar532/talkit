/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import user1 from "../assets/icons/profile/user1.png";
import user2 from "../assets/icons/profile/user2.png";
import user3 from "../assets/icons/profile/user3.png";

export default function NotificationBox() {
	const randomColors = ["#7AE582", "#48BFE3"];

	const Notifications = [
		{image: user1, name:"Ammar", notification: "Lorem ipsum dolor sit amet.", time: "2 min ago"},

		{image: user2, name:"Zain", notification: "Lorem ipsum dolor sit amet.", time: "2 hour ago"},
		{image: user3, name:"Faizan", notification: "Lorem ipsum dolor sit amet.", time: "1 day ago"},
		{image: null, name:"Awais", notification: "Lorem ipsum dolor sit amet.", time: "1 month ago"},

	];

	const notificationCard = (image, name, notification, time) => {
		return(
			<div className="notification-card">
				<div>
					{image ? <img src={image} alt=""/>: <div className="image-alt" style={{ background: `${randomColors[Math.floor(Math.random() * 2)]}` }}><span>MZ</span></div>}
				</div>
				<div className="d-flex flex-column">
					<span>{name}</span>
					<span className="notification">{notification}</span>
				</div>
				<div>
					<span className="moment">{time}</span>
				</div>
			</div>
		);
	};
    
	return (
		<div className="notification-box invisible-scrollbar">
			<div className="notification-header">
				<span>Notifications</span>
				<span className="custom-mark">Mark all as read</span>
			</div>
			{
				Notifications && 
                Notifications.map((notification, index) => {
                	return(
                		<div key={index}>
                			{notificationCard(notification.image, notification.name, notification.notification, notification.time)}
                		</div>
                	);
                })
			}
		</div>
	);
}
