import React from "react";

export default function Input(props) {
	if (props.type === "plain") {
		return (

			<div className="plain-input-container" style={props.style}>
				<div className="input-label">
					{
						props.label &&
						<span>{props.label || "Label"}</span>
					}

					{props.asterik && <span style={{ color: "red" }}> *</span>}
				</div>
				<div className="w-100">
					<input
						placeholder={props.placeholder || ""}
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
						className={props.className || "input-field"}
						style={props.inputStyle}
					/>
				</div>
			</div>
		);
	}
	else {
		return (

			<div className="input-container" style={props.style}>
				<div className="input-label">
					<span>{props.label || "Label"}</span>
					{props.asterik && <span style={{ color: "red" }}> *</span>}
				</div>
				<div className="w-100">
					<input
						placeholder={props.placeholder || ""}
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
						className={props.className || "input-field"}
						style={props.inputStyle}
					/>
				</div>
			</div>
		);
	}

}
