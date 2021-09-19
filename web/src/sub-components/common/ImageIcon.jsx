import React from "react";

export default function ImageIcon(props) {
	if (props.type === "lg") {
		return (
			<div className="profile-icon" style={props.style}>
				{
					props.image
						?
						<img src={props.image} />
						:
						<span>MZ</span>
				}
			</div>
		);
	}
	else if (props.type === "md") {
		return (
			<div className="profile-icon" style={props.style}>

			</div>
		);
	}
	else if (props.type === "sm") {
		return (
			<div className="profile-icon" style={props.style}>
				{
					props.image
						?
						<img src={props.image} />
						:
						<span className="span-text">MZ</span>
				}
			</div>
		);
	}
}
