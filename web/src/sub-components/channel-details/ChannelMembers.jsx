import React from "react";
import { ReactComponent as UsersIcon } from "../../assets/icons/basic/users.svg";
import ImageIcon from "../common/ImageIcon";

export default function ChannelMembers() {


	const members = ["zain", "zain", "zain", "zain", "zain", "zain"];

	return (
		<div className="channel-members-details-container">
			<span className="room-heading"> Channel Members </span>
			<div className="channel-members-icons-container">
				<div className="channel-members-icons">
					{
						members.map((member, index) => {
							return (
								<ImageIcon type="sm" key={index} image={null} style={{ marginLeft: `${index !== 0 ? "-10px" : "0px"}` }} />
							);
						})
					}
					<div className="profile-icon add-user-icon pointer">
						<UsersIcon />
					</div>
				</div>
			</div>

		</div>
	);
}
