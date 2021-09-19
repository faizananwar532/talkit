import React from "react";
import EditIcon from "../assets/icons/basic/edit-1.svg";
import Signout from "../assets/icons/basic/logout.svg";

export default function SignoutBox(props) {
	return (
		<div className="sign-out-box">
			<div className="edit-profile-div" onClick={props.onClick}>
				<div className="pr-3">
					<img
						src={EditIcon}
						alt=""
					/>
				</div>
				<span>Edit profile</span>
			</div>
			<div className="sign-out-div">
				<div className="pr-3">
					<img
						src={Signout}
						alt=""
					/>
				</div>
				<span>Sign Out</span>
			</div>
		</div>
	);
}
