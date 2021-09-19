import React, { useState } from "react";
import user1 from "../../assets/icons/profile/user1.png";
import {ReactComponent as MenuHorizontal} from "../../assets/icons/menu-horizontal.svg";
import SubMenuModal from "../../sub-components/SubMenuModal";

export default function MessageBox(props) {
	
	const [modal, setModal] = useState(false);
	const [otherModal, setOtherModal] = useState(false);


	const onSenderClick = () => {
		setModal(!modal);
	};

	const onReceiverClick = () => {
		setOtherModal(!otherModal);
	};

	if(props.sender){
		return (
			<div className="sender-message-box-container">
				<div>
					<img
						src={props.image || user1}
						alt=""
					/>
				</div>
				<div>
					<div className="d-flex pl-4" style={{marginTop:"-15px"}}>
						<span className="username">{props.username || "Jaffar"}</span>
					</div>
					<div className="message-container mr-3 ml-3">
					
						<span>{props.message || "Lorem ipsum dolor sit amet consectetur."}</span>
					</div>
				</div>
				<div onClick={onSenderClick} style={{position:"relative",cursor:"pointer"}}>
					<MenuHorizontal/>
					{
						modal && 
						<SubMenuModal style={{top:"30px", left:"0px"}}>
							<span>
								Delete Message
							</span>
							<span className="mt-3">
								Unsend Message
							</span>
						</SubMenuModal>
					}
				</div>
				
			</div>
		);
	}
	else if (props.receiver) {
		return (
			<div className="receiver-message-box-container">
				<div onClick={onReceiverClick} style={{position:"relative", cursor:"pointer"}}>
					<MenuHorizontal/>
					{
						otherModal && 
						<SubMenuModal style={{top:"30px"}}>

							<span>
								Delete Message
							</span>
							<span className="mt-3">
								Mark as Unread
							</span>
						</SubMenuModal>
					}
				</div>
				<div>
					<div className="d-flex justify-content-end pr-4" style={{marginTop:"-15px"}}>
						<span className="username">{props.username || "Jaffar"}</span>
					</div>
					<div className="message-container mr-3 ml-3">
					
						<span>{props.message || "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur."}</span>
					</div>
				</div>
				<div>
					<img
						src={props.image || user1}
						alt=""
					/>
				</div>

			</div>
		);

	}

}
