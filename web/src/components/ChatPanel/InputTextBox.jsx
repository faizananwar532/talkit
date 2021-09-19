import React from "react";
import {ReactComponent as Attachment} from "../../assets/icons/attachment.svg";
import Send from "../../assets/icons/send-2.svg";

export default function InputTextBox(props) {
	return (
		<div className="input-bottom-bar">
			<div className="input-text-field">
				<input
					placeholder="Type your message"
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

				<Attachment/>
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
