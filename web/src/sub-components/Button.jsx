import React from "react";


export default function Button(props) {
	if (props.primary) {
		return (
			<button
				disabled={props.processing}
				className={`${props.className} button-primary`}
				onClick={props.onClick}
				style={props.style}
				type={props.type}
			>
				{props.processing && (
					<span className="processing" />
				)}
				{props.label || "Label"}
			</button>
		);
	}
	else if (props.secondary) {
		return (
			<div className="button-secondary" onClick={props.onClick} style={props.style}>
				<div>
					<img
						src={props.logo}
						alt=""
					/>
				</div>
				<div className="button-text">
					<span>{props.label || "Label"}</span>
				</div>
				<div></div>
			</div>
		);
	}
}
