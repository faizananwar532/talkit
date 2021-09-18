import React from "react";

export default function ChannelDetails(props) {

	return (
		<div className="channel-details-container">
			<div className="channel-details">
				<div className="channel-icon">
					<span>VX</span>
				
				</div>
				<div className="channel-name">
					<span>{props.channelName || "VenturenoxTeam"}</span>
					<span className="span2">{props.status || "Active"}</span>
				</div>
			</div>
		</div>
	);
}
