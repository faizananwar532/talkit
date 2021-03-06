import React from "react";
import ImageIcon from "./ImageIcon";


/**
 * 
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.image
 * @param {Component} props.children
 * @returns 
 */
export default function DetailBar(props) {
	return (
		<div className={`detail-bar ${props.className}`} style={props.style} onClick={props.onClick}>
			<div className="detail-bar-basic-content">
				<ImageIcon type="sm" image={props.image || null} name={props.name} color={props.color} />
				<span className="name-text">{props.name}</span>
			</div>
			{props.children}
		</div>
	);
}
