import React from "react";
import Attachment from "../../assets/icons/attachment.svg";
import Send from "../../assets/icons/send-2.svg";

export default function InputTextBox(props) {
	return (
		<div className="input-bottom-bar">
			<div className="input-text-field">
				<input
					placeholder="Type your message"
					className="input-text"
					onChange={props.onChange}
					onBlur={props.onBlur}
					onFocus={props.onFocus}
					type={props.type}
					id={props.id}
					name={props.name}
					value={props.value}
					defaultValue={props.defaultValue}
					minLength={props.minLength}
					maxLength={props.maxLength}
					readOnly={props.readOnly}
					style={props.inputStyle}
				/>
				<img
					src={Attachment}
					alt=""
				/>
			</div>
			<div className="send-image-container">
				<img
					src={Send}
					alt=""
				/>
			</div>
			<button style={{ display: "none" }} type="submit"></button>
		</div>
	);
}
