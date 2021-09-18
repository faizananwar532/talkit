import React from "react";
import { ReactComponent as UsersIcon } from "../../assets/icons/basic/users.svg";

export default function ChannelMembers() {


	const members = ["zain", "zain", "zain", "zain", "zain", "zain"];
	const membersProfileIcon = (image, index) => {
		return (
			<div className="profile-icon" style={{ marginLeft: `${index !== 0 ? "-10px" : "0px"}` }}>
				{
					image
						?
						<img src={image} />
						:
						<span>MZ</span>
				}
			</div>
		);
	};
	return (
		<div className="channel-members-details-container">
			<span> Channel Members </span>
			<div className="channel-members-icons-container">
				<div className="channel-members-icons">
					{
						members.map((member, index) => {
							return (
								<>
									{
										membersProfileIcon(null, index)
									}
								</>
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
