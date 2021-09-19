import React, { Fragment, useState, useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import Search from "../../sub-components/Search";
import { ReactComponent as AddIcon } from "../../assets/icons/basic/add.svg";
import user1 from "../../assets/icons/profile/user1.png";
import user2 from "../../assets/icons/profile/user2.png";
import user3 from "../../assets/icons/profile/user3.png";
import user4 from "../../assets/icons/profile/user4.png";
import user5 from "../../assets/icons/profile/user5.png";
import user6 from "../../assets/icons/profile/user6.png";
import ImageIcon from "../../sub-components/common/ImageIcon";

export default function ChatRoomSelectionPanel(props) {

	const { chatContactsData, setChatContactsData } = useContext(ChatContext);
	const [searchValue, setSearchValue] = useState("");

	// const randomColors = ["#7AE582", "#48BFE3"];
	const channels = [
		{
			id: 1,
			image: null,
			name: "HackFest’21",
			notificationCount: 2,
			chat: [],
			type: "channel-room",
			color: "#7AE582"
		},
		{
			id: 2,
			image: null,
			name: "VenturenoxTeam",
			notificationCount: 0,
			chat: [],
			type: "channel-room",
			color: "#48BFE3"
		}
	];
	const DMs = [
		{
			id: 1,
			image: user1,
			name: "Ammar",
			notificationCount: 1,
			chat: [],
			type: "dm-room",
			color: "#7AE582"
		},
		{
			id: 2,
			image: user2,
			name: "Sharjeel",
			notificationCount: 0,
			chat: [],
			type: "dm-room",
			color: "#48BFE3"
		},
		{
			id: 3,
			image: user3,
			name: "Faizan",
			notificationCount: 0,
			chat: [],
			type: "dm-room",
			color: "#7AE582"
		},
		{
			id: 4,
			image: user4,
			name: "Zain",
			notificationCount: 0,
			chat: [],
			type: "dm-room",
			color: "#48BFE3"
		},
		{
			id: 5,
			image: user5,
			name: "Hamza",
			notificationCount: 3,
			chat: [],
			type: "dm-room",
			color: "#7AE582"
		},
		{
			id: 6,
			image: user6,
			name: "Bilqees",
			notificationCount: 0,
			chat: [],
			type: "dm-room",
			color: "#48BFE3"
		}
	];

	useEffect(() => {
		setChatContactsData({
			...chatContactsData,
			selectedContact: channels[0]
		});
	}, []);

	useEffect(() => {
		console.log(chatContactsData);
	}, [chatContactsData]);


	const messagesCounterNotification = (count) => {
		return (
			<Fragment>
				{
					count !== 0 &&
					<div className="chat-notification-counter">
						<span>{count}</span>
					</div>
				}
			</Fragment>
		);
	};

	const RoomSelectorBar = (image, name, count, color, selected) => {
		return (
			<div className={`room-selector-bar pointer ${selected ? "selected" : "unselected"}`}>
				<div className="bar-image-name-container">
					<ImageIcon type="md" name={name} image={image} color={color} />
					<span className="name">{name}</span>
				</div>
				{messagesCounterNotification(count)}
			</div>
		);
	};
	return (
		<Fragment>
			<div className="chat-room-selection-panel-container">
				<div className="w-100 " style={{ padding: "0 30px" }}>
					<div className="messages-header">
						<span className="messages-header-text">Messages</span>
						{messagesCounterNotification(6)}
					</div>

					<div className="search-container">
						<Search placeholder="Search" onChange={(e) => { setSearchValue(e.target.value); }} value={searchValue} />
					</div>
				</div>

				<div className="all-rooms-container hide-scroll">
					<div className="channel-rooms-container">
						<div className="rooms-container-header" >
							<span className="rooms-container-header-text">CHANNELS</span>
							<div className="addIcon" onClick={props.onChannelAdd}>
								<AddIcon className="pointer" />
							</div>
						</div>

						{
							channels.map((channel, index) => {
								return (
									<div className="w-100 d-flex align-items-center" key={index} onClick={() => {
										setChatContactsData({
											...chatContactsData,
											selectedContact: channel
										});
									}} >
										{RoomSelectorBar(channel.image, channel.name, channel.notificationCount, channel.color,
											(channel.id === chatContactsData?.selectedContact?.id && chatContactsData?.selectedContact?.type === "channel-room") ? true : false)}
									</div>
								);
							})
						}

					</div>
					<div className="DM-rooms-container">
						<div className="rooms-container-header">
							<span className="rooms-container-header-text">DIRECT MESSAGES</span>
							<div className="addIcon pointer" onClick={props.onDMAdd}>
								<AddIcon />
							</div>
						</div>
						{
							DMs.map((channel, index) => {
								return (
									<div key={index} className="w-100 d-flex align-items-center" onClick={() => {
										setChatContactsData({
											...chatContactsData,
											selectedContact: channel
										});
									}}>
										{RoomSelectorBar(channel.image, channel.name, channel.notificationCount,
											(channel.id === chatContactsData?.selectedContact?.id && chatContactsData?.selectedContact?.type === "dm-room") ? true : false)}
									</div>
								);
							})
						}

					</div>
				</div>

			</div>
		</Fragment>
	);
}
