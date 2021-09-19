import React from "react";

export default function SubMenuModal(props) {
	return (
		<div className="sub-menu-modal" style={props.style}>
			{props.children}
		</div>
	);
}
