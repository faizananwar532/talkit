import React from "react";
import { ReactComponent as Cross } from "../../assets/icons/basic/close.svg";
import Button from "../Button";


/**
 * @param {Object} props Props object of component
 * @param {String} props.height Modal package confirm
 * @param {String} props.width Modal package confirm
 * @param {String} props.className Modal package confirm
 * @param {String} props.style Modal package confirm
 * @param {String} props.confirmBtnTitle Modal package confirm
 * @param {Function} props.onClose Modal close function
 * @param {Function} props.onConfirm Modal package confirm
 */

export default function Modal(props) {
	return (
		<div className="custom-modal-wrap">

			<div className={`custom-modal  ${props.className}`} style={{ height: `${props.height}`, width: `${props.width}`, ...props.style }}>
				<div className="header">

					<span>{props.title}</span>
					<Cross className="pointer" onClick={props.onClose} />
				</div>
				{props.children}
				{
					props.confirmBtnTitle &&
					<div className="modal-btn-container">
						<Button primary label={props.confirmBtnTitle} style={{ color: "white" }} onClick={props.onConfirm} />
					</div>
				}

			</div>


		</div>
	);
}
