import React, { useEffect, useState } from "react";
import ImageIcon from "../common/ImageIcon";
import SubMenuBtn from "../SubMenuBtn";
import SubMenuModal from "../SubMenuModal";
import Modal from "../common/Modal";
import Input from "../Input";

export default function ChannelBasicDetail(props) {

	const [modal, setModal] = useState(false);
	const [reportModal, setReportModal] = useState(false);

	const [ModalStatus, setModalStatus] = useState({
		isDeleteModalOpen: false,
		isReportModalOpen: false
	});

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
			<div onClick={handleClick} style={{ position: "relative" }}>
				<SubMenuBtn />
				{
					modal &&
					<SubMenuModal>
						<div>
							<span className="pointer"
								onClick={() => { setModalStatus({ ...ModalStatus, isDeleteModalOpen: true }); }}
							>{props.selectedContact?.type === "channel-room" ? "Delete Channel" : "Delete Chat"}</span>
						</div>
						<div className="mt-1 ">
							<span className="span2 pointer"
								onClick={() => { setModalStatus({ ...ModalStatus, isReportModalOpen: true }); }}
							>{props.selectedContact?.type === "channel-room" ? "Report Channel" : "Report Chat"}</span>

						</div>

					</SubMenuModal>
				}
			</div>
			{
				ModalStatus.isDeleteModalOpen &&
				<Modal
					onClose={() => { setModalStatus({ isDeleteModalOpen: false, isReportModalOpen: false }); }}>
					{
						<div
							className="d-flex flex-column justify-content-between"
							style={{ textAlign: "center" }}>
							<span className="headline6 grey9">Delete Channel</span>
							<span className="subtitle1 grey9 mt-2">Are you sure you want to delete Venturenox Team?</span>
							<div className="d-flex mt-4" style={{ borderTop: "1px solid #E9ECEF" }}>
								<div className="pointer w-50 pt-4 pr-4  pl-4 pb-0 d-flex justify-content-center align-items-center"
									onClick={() => { setModalStatus({ isDeleteModalOpen: false, isReportModalOpen: false }); }}>
									<span className="headline6 grey9">Cancel</span>
								</div>
								<div className=" pointer w-50 pt-4 pr-4  pl-4 pb-0 d-flex justify-content-center align-items-center"
									onClick={() => { setModalStatus({ isDeleteModalOpen: false, isReportModalOpen: false }); }}>
									<span className="headline6 primaryColor">Confirm</span>
								</div>
							</div>
						</div>
					}


				</Modal >
			}
			{
				ModalStatus.isReportModalOpen &&
				<Modal title={"User Report Feedback"}
					confirmBtnTitle={"Send"}
					onConfirm={() => { setModalStatus({ ...ModalStatus, isReportModalOpen: false }); }}
					onClose={() => { setModalStatus({ isDeleteModalOpen: false, isReportModalOpen: false }); }}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<span className="body1 grey7">We use your feedback to help us learn when something’s not right.</span>
						<Input type="plain" placeholder="e.g: @ammar or ammar@venturenox.com" label="Send " style={{ marginTop: "25px" }} />
					</div>
				</Modal>
			}

		</div >
	);
}
