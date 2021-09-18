import React from "react";
import user1 from "../../assets/icons/profile/user1.png";
import {ReactComponent as MenuHorizontal} from "../../assets/icons/menu-horizontal.svg";

export default function MessageBox(props) {
	
	if(props.sender){
		return (
			<div className="sender-message-box-container">
				<div>
					<img
						src={props.image ||  user1}
						alt=""
					/>
				</div>
				<div className="message-container">
					<span>{props.message || "Lorem ipsum dolor sit amet consectetur."}</span>
				</div>
				<div onClick={props.onClick}>
					<MenuHorizontal/>
				</div>
			</div>
		);
	}
	else if(props.receiver){
		return (
			<div className="receiver-message-box-container">
				<div onClick={props.onClick}>
					<MenuHorizontal/>
				</div>
				<div className="message-container">
					<span>{props.message || "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur."}</span>
				</div>
				<div>
					<img
						src={props.image ||  user1}
						alt=""
					/>
				</div>
				
			</div>
		);
		
	}
	
}
