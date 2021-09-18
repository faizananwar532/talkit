/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react";
import { ReactComponent as Notification } from "../../assets/icons/notification/Notification Alert.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/arrows/chevron-down.svg";
import ChannelDetails from "../../components/RightPanel/ChannelDetails";

export default function RightPanel(props) {


	const randomColors = ["#7AE582", "#48BFE3"];

	return (
		<div className="right-panel">
			<div className="right-panel-header-bar">
				<Notification />

				<div className="loggedIn-user-info-container">
					<div className="loggedIn-user-info">
						{
							props.userImage ? <img src={props.userImage} /> : <div className="userimage-alt" style={{ background: `${randomColors[Math.floor(Math.random() * 2)]}` }}><span>MZ</span></div>
						}
						<span className="userName">{props.username || "Jaffar Hussain"}</span>
					</div>
					<DownArrow />
				</div>
			</div>

			<ChannelDetails />

		</div>
	);
}
