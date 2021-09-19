import React from "react";
import ChannelAttachments from "../../sub-components/channel-details/ChannelAttachments";
import ChannelBasicDetail from "../../sub-components/channel-details/ChannelBasicDetail";
import ChannelMedia from "../../sub-components/channel-details/ChannelMedia";
import ChannelMembers from "../../sub-components/channel-details/ChannelMembers";

export default function ChannelDetails(props) {

	return (
		<div className="channel-details-container">
			<ChannelBasicDetail selectedContact={props.selectedContact} />
			<div className="channel-chat-items-container">
				{
					props.selectedContact?.type === "channel-room" &&
					<ChannelMembers selectedContact={props.selectedContact} />
				}

				<ChannelMedia />
				<ChannelAttachments />
			</div>
		</div>
	);
}
