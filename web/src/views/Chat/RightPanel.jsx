/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from "react";
import Notification from "../../assets/icons/notification/Notification Alert.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/arrows/chevron-down.svg";
import ChannelDetails from "../../components/RightPanel/ChannelDetails";
import { useAuthentication } from "../../context/Authentication";
import { ChatContext } from "../../context/ChatContext";
import SignoutBox from "../../sub-components/SignoutBox";
import NotificationBox from "../../sub-components/NotificationBox";
import Modal from "../../sub-components/common/Modal";
import Input from "../../sub-components/Input";
import image1 from "../../assets/icons/profile/user1.png";
import Button from "../../sub-components/Button";

export default function RightPanel(props) {

	const [modalOpen, setModalOpen] = useState(false);
	const [notificationBox, setNotificationBox] = useState(false);

	const [editModal, setEditModal] = useState(false);

	const auth = useAuthentication();
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

	const handleEditProfile = () => {
		setEditModal(true);
	};

	return (
		<div className="right-panel">
			{
				editModal &&
				<Modal onClose={() => setEditModal(false)} title="Edit Profile" confirmBtnTitle="Save">
					<div className="d-flex justify-content-between" style={{ paddingInline: "30px" }}>
						<div className="d-flex flex-column" style={{ width: "60%" }}>
							<div>
								<Input label="Name" type="plain" name="name" />
							</div>
							<div className="mt-3">
								<Input label="Email Address" type="plain" name="email" />
							</div>
						</div>
						<div className="d-flex flex-column align-items-center">
							<span className="headline6" style={{ color: "#212529" }}>Profile Picture</span>
							<img
								src={image1}
								alt=""
								style={{ width: "120px", height: "120px", borderRadius: "50%", paddingBottom: "5px" }}
							/>
							<Button className="mb-2" style={{ color: "white" }} primary label="Upload Picture" />
						</div>
					</div>
				</Modal>
			}
			<div className="right-panel-header-bar">
				<div onClick={handleNotificationClick} style={{ position: "relative", cursor: "pointer" }}>
					<img
						src={Notification}
						alt=""
					/>
					{
						notificationBox &&
						<NotificationBox />
					}
				</div>


				<div className="loggedIn-user-info-container" onClick={handleClick}>
					<div className="loggedIn-user-info pointer">
						{
							props.userImage ? (
								<img src={props.userImage} />
							) : (
								<div className="userimage-alt" style={{ background: `${randomColors[0]}` }}>
									{/* <span>JH</span> */}
									{
										auth?.user?.username?.length > 0 ?
											<span>{`${auth.user.username[0]}`}</span>
											:
											<span>{`U`}</span>
									}

								</div>
							)
						}
						<span className="userName">{`${auth.user.username || "User"}`}</span>
					</div>

					<DownArrow className="pointer mb-1" style={{ width: "20px", height: "20px" }} />

					{
						modalOpen &&
						<div>
							<SignoutBox onClick={handleEditProfile} />
						</div>
					}

				</div>
			</div>

			<ChannelDetails selectedContact={chatContactsData?.selectedContact} />

		</div>
	);
}
