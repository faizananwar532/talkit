import React from "react";


export default function Button(props) {
	if(props.primary){
		return(
			<button className={props.className || "button-primary"} onClick={props.onClick} style={props.style}>{props.label || "Label"}</button>
		);
	}
}
