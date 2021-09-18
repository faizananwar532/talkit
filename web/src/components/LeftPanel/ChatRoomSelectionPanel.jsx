import React, { Fragment, useState } from "react";
import Search from "../../sub-components/Search";
import user1 from "../../assets/icons/profile/user1.png";
import user2 from "../../assets/icons/profile/user2.png";
import user3 from "../../assets/icons/profile/user3.png";
import user4 from "../../assets/icons/profile/user4.png";
import user5 from "../../assets/icons/profile/user5.png";
import user6 from "../../assets/icons/profile/user6.png";

export default function ChatRoomSelectionPanel() {

	const [searchValue, setSearchValue] = useState("");

	const randomColors = ["#7AE582", "#48BFE3"];
	const channels = [
		{
			image: null,
			name: "HackFest’21",
			notificationCount: 2
		},
		{
			image: null,
			name: "VenturenoxTeam",
			notificationCount: 0
		}
	];
	const DMs = [
		{
			image: user1,
			name: "Ammar",
			notificationCount: 1
		},
		{
			image: user2,
			name: "Sharjeel",
			notificationCount: 0
		},
		{
			image: user3,
			name: "Faizan",
			notificationCount: 0
		},
		{
			image: user4,
			name: "Zain",
			notificationCount: 0
		},
		{
			image: user5,
			name: "Hamza",
			notificationCount: 3
		},
		{
			image: user6,
			name: "Bilqees",
			notificationCount: 0
		}
	];


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

	const RoomSelectorBar = (image, name, count) => {
		return (
			<div className="room-selector-bar">
				<div className="bar-image-name-container">
					{
						image ? <img src={image} /> : <div className="image-alt" style={{ background: `${randomColors[Math.floor(Math.random() * 2)]}` }}><span>MZ</span></div>
					}
					<span className="name">{name}</span>
				</div>
				{messagesCounterNotification(count)}
			</div>
		);
	};
	return (
		<div className="chat-room-selection-panel-container">
			<div className="messages-header">
				<span className="messages-header-text">Messages</span>
				{messagesCounterNotification(6)}
			</div>

			<div className="search-container">
				<Search placeholder="Search" onChange={(e) => { setSearchValue(e.target.value); }} value={searchValue} />
			</div>

			<div className="all-rooms-container hide-scroll">
				<div className="channel-rooms-container">
					<span className="rooms-container-header-text">CHANNELS</span>

					{
						channels.map((channel, index) => {
							return (
								<div key={index}>
									{RoomSelectorBar(channel.image, channel.name, channel.notificationCount)}
								</div>
							);
						})
					}

				</div>
				<div className="DM-rooms-container">
					<span className="rooms-container-header-text">DIRECT MESSAGES</span>
					{
						DMs.map((channel, index) => {
							return (
								<div key={index}>
									{RoomSelectorBar(channel.image, channel.name, channel.notificationCount)}
								</div>
							);
						})
					}

				</div>
			</div>

		</div>
	);
}
