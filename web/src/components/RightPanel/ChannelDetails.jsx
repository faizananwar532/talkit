import React from "react";
import ChannelAttachments from "../../sub-components/channel-details/ChannelAttachments";
import CannelBasicDetail from "../../sub-components/channel-details/ChannelBasicDetail";
import ChannelMedia from "../../sub-components/channel-details/ChannelMedia";
import ChannelMembers from "../../sub-components/channel-details/ChannelMembers";

export default function ChannelDetails() {

	return (
		<div className="channel-details-container">
			<CannelBasicDetail />
			<div className="channel-chat-items-container">
				<ChannelMembers />
				<ChannelMedia />
				<ChannelAttachments />
			</div>
		</div>
	);
}
