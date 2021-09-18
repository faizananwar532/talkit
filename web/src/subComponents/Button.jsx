import React from "react";


export default function Button(props) {
	
	if (props.processing) {
		return (
			<div className="button-primary processing" style={props.style} type={props.type}></div>
		);
	} else if(props.primary){
		return(
			<button className={props.className || "button-primary"} onClick={props.onClick} style={props.style} type={props.type}>{props.label || "Label"}</button>
		);
	}
}
 