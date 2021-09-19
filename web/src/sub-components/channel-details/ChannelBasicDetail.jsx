import React from "react";
import SubMenuBtn from "../SubMenuBtn";

export default function ChannelBasicDetail(props) {
	return (
		<div className="channel-details">
			<div className="channel-name-icon-container">
				<div className="channel-icon">
					<span>VX</span>
				</div>

				<div className="channel-name">
					<span>{props.channelName || "VenturenoxTeam"}</span>
					<span className="span2">{props.status || "Active"}</span>
				</div>
			</div>
			<SubMenuBtn />
		</div>
	);
}
