import React from "react";

export default function ImageIcon(props) {
	const getNameShortForm = (name) => {
		var tempName = name[0].toUpperCase() + name.slice(1);
		if (tempName) {

			let string = "";
			var sL = tempName.length;
			var i = 0;
			for (; i < sL; i++) {
				if (tempName.charAt(i) === tempName.charAt(i).toUpperCase()) {
					string += tempName.charAt(i);
				}
			}

			return string.substring(0, 2);
		}
	};

	if (props.type === "lg") {
		return (
			<div className="profile-icon " style={{ height: "75px", width: "75px", border: "none", backgroundColor: `${props.color}`, ...props.style }}>
				{
					props.image
						?
						<img src={props.image} />
						:
						<span className="headline4 grey0 " style={{ fontWeight: "500" }}>{props.name ? getNameShortForm(props.name) : "MZ"}</span>
				}
			</div>
		);
	}
	else if (props.type === "md") {
		return (
			<div className="profile-icon" style={{ height: "60px", width: "60px", border: "none", backgroundColor: `${props.color}`, ...props.style }}>
				{
					props.image
						?
						<img src={props.image} />
						:
						<span className="span-text">{props.name ? getNameShortForm(props.name) : "MZ"}</span>
				}
			</div>
		);
	}
	else if (props.type === "sm") {
		return (
			<div className="profile-icon" style={{ backgroundColor: `${props.color}`, ...props.style }}>
				{
					props.image
						?
						<img src={props.image} />
						:
						<span className="span-text">{props.name ? getNameShortForm(props.name) : "MZ"}</span>
				}
			</div>
		);
	}
}
