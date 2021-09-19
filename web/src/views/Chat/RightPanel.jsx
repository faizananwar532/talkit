import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Notification } from "../../assets/icons/notification/Notification Alert.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/arrows/chevron-down.svg";
import ChannelDetails from "../../components/RightPanel/ChannelDetails";
import { useAuthentication } from "../../context/Authentication";
import { ChatContext } from "../../context/ChatContext";

export default function RightPanel(props) {

	const auth = useAuthentication();
	const { chatContactsData } = useContext(ChatContext);
	const randomColors = ["#7AE582", "#48BFE3"];

	useEffect(() => {

	}, [chatContactsData]);

	return (
		<div className="right-panel">
			<div className="right-panel-header-bar">
				<Notification />

				<div className="loggedIn-user-info-container">
					<div className="loggedIn-user-info">
						{
							props.userImage ? (
								<img src={props.userImage} />
							) : (
								<div className="userimage-alt" style={{ background: `${randomColors[Math.floor(Math.random() * 2)]}` }}>
									<span>{`${auth.user.first_name[0]}${auth.user.last_name[0]}`}</span>
								</div>
							)
						}
						<span className="userName">{`${auth.user.first_name} ${auth.user.last_name}`}</span>
					</div>
					<DownArrow />
				</div>
			</div>

			<ChannelDetails selectedContact={chatContactsData?.selectedContact} />

		</div>
	);
}
