import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo/logo-invert.svg";
import { ReactComponent as MessageIcon } from "../../assets/icons/message-circle-dots.svg";

export default function SideNavbar() {

	const Icon = (Icon) => {
		return (
			<div className="selected-icon-container">
				{Icon}
			</div>
		);
	};
	return (
		<div className="side-navbar">
			<Logo />
			<div className="icons-panel-container">
				{Icon(<MessageIcon />)}
			</div>



		</div>
	);
}
