import React, { useEffect } from "react";
import ImageIcon from "../common/ImageIcon";
import SubMenuBtn from "../SubMenuBtn";

export default function ChannelBasicDetail(props) {

	useEffect(() => {
	}, [props.selectedContact]);

	return (

		<div className="channel-details">
			<div className="channel-name-icon-container">
				<ImageIcon type="lg" image={null} name={props?.selectedContact?.name} color={props?.selectedContact?.color} />

				<div className="channel-name">
					<span>{props?.selectedContact?.name || "VenturenoxTeam"}</span>
					<span className="span2">{props.status || "Active"}</span>
				</div>
			</div>
			<SubMenuBtn />
		</div>
	);
}
