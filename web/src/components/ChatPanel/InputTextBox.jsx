import React from "react";
import {ReactComponent as Attachment} from "../../assets/icons/attachment.svg";
import Send from "../../assets/icons/send-2.svg";

export default function InputTextBox() {
	return (
		<div className="input-bottom-bar">
			<div className="input-text-field">
				<input placeholder="Type your message"   />
				<Attachment/>
			</div>
			<div className="send-image-container">
				<img
					src={Send}
					alt=""
				/>
			</div>
		</div> 
	);
}
