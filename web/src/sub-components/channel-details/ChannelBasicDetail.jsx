import React, { useEffect, useState } from "react";
import ImageIcon from "../common/ImageIcon";
import SubMenuBtn from "../SubMenuBtn";
import SubMenuModal from "../SubMenuModal";

export default function ChannelBasicDetail(props) {

	const [modal, setModal] = useState(false);
	const [reportModal, setReportModal] = useState(false);

	useEffect(() => {
	}, [props.selectedContact]);

	const handleClick = () => {
		setModal(!modal);
	};

	const reportClick = () => {
		setReportModal(true);
	};
	return (

		<div className="channel-details">
			<div className="channel-name-icon-container">
				<ImageIcon type="lg" image={null} name={props?.selectedContact?.name} color={props?.selectedContact?.color} />

				<div className="channel-name">
					<span>{props?.selectedContact?.name || "VenturenoxTeam"}</span>
					<span className="span2">{props.status || "Active"}</span>
				</div>
			</div>
			<div onClick={handleClick} style={{position: "relative"}}>
				<SubMenuBtn />
				{
					modal && 
				<SubMenuModal>
					<div onClick={props.delete}>
						<span className="span2 pointer">{props.selectedContact?.type === "channel-room" ? "Delete Channel": "Delete Chat"}</span>
					</div>
					<div className="mt-1" onClick={reportClick}>
						<span className=" pointer">{props.selectedContact?.type === "channel-room" ? "Report Channel": "Report User"}</span>
					</div>
				</SubMenuModal>
				}
			</div>
		</div>
	);
}
