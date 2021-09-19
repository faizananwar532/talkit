/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from "react";
import Notification  from "../../assets/icons/notification/Notification Alert.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/arrows/chevron-down.svg";
import ChannelDetails from "../../components/RightPanel/ChannelDetails";
// import { useAuthentication } from "../../context/Authentication";
import { ChatContext } from "../../context/ChatContext";
import SignoutBox from "../../sub-components/SignoutBox";
import NotificationBox from "../../sub-components/NotificationBox";

export default function RightPanel(props) {

	const [modalOpen, setModalOpen] = useState(false);
	const [notificationBox, setNotificationBox] = useState(false);

	// const auth = useAuthentication();
	const { chatContactsData } = useContext(ChatContext);

	const handleClick = () => {
		setModalOpen(!modalOpen);
	};

	const handleNotificationClick = () => {
		setNotificationBox(!notificationBox);
	};

	const randomColors = ["#7AE582", "#48BFE3"];

	useEffect(() => {

	}, [chatContactsData]);

	return (
		<div className="right-panel">
			<div className="right-panel-header-bar">
				<div onClick={handleNotificationClick} style={{position:"relative", cursor: "pointer"}}>
					<img
						src={Notification}
						alt=""
					/>
					{
						notificationBox && 
						<NotificationBox/>
					}
				</div>


				<div className="loggedIn-user-info-container" onClick={handleClick}>
					<div className="loggedIn-user-info pointer">
						{
							props.userImage ? (
								<img src={props.userImage} />
							) : (
								<div className="userimage-alt" style={{ background: `${randomColors[Math.floor(Math.random() * 2)]}` }}>
									<span>JH</span>
									{/* <span>{`${auth.user.first_name[0]}${auth.user.last_name[0]}`}</span> */}
								</div>
							)
						}
						<span className="userName">Jaffar Hussain</span>
					</div>
					
					<DownArrow className="pointer mb-1" style={{width:"20px", height:"20px"}}/>
					
					{
						modalOpen &&
						<div>
							<SignoutBox />
						</div>
					}
				</div>
			</div>

			<ChannelDetails selectedContact={chatContactsData?.selectedContact} />

		</div>
	);
}
