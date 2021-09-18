import React, { useState } from "react";
import ChatRoomSelectionPanel from "../../components/LeftPanel/ChatRoomSelectionPanel";
import SideNavbar from "../../components/LeftPanel/SideNavbar";
import Modal from "../../sub-components/common/Modal";

export default function LeftPanel() {

	const [addChannelModalsStatus, setAddChannelModalsStatus] = useState({
		isAddChannelModalOpen: false,
		isAddDmModalOpen: false
	});

	const onChannelAdd = () => {

	};

	const onDMAdd = () => {

	};

	const options = [
		{ id: 1, option: "Create Channel" },
		{ id: 2, option: "Join Existing Channel" }
	];
	const [selectedOptionId, setSelectedOptionId] = useState(1);

	return (
		<div className="left-panel">
			<SideNavbar />
			<ChatRoomSelectionPanel
				onChannelAdd={() => { setAddChannelModalsStatus({ ...addChannelModalsStatus, isAddChannelModalOpen: true }); }}
				onDMAdd={onDMAdd} />

			{
				addChannelModalsStatus.isAddChannelModalOpen &&
				<Modal
					onClose={() => { setAddChannelModalsStatus({ isAddChannelModalOpen: false, isAddDmModalOpen: false }); }}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<span className="body1 grey7">Channels are where your team communicates.They’re best when organized around a topic</span>
					</div>

					<div style={{ borderBottom: "1px solid #E9ECEF", marginTop: "30px" }}>
						<div className="d-flex" style={{ padding: "0px 40px" }}>
							{
								options.map((option, index) => {
									return (
										<div key={index}
											onClick={() => { setSelectedOptionId(option.id); }}
											className={`${selectedOptionId === option.id ? "modal-selected-tab" : "modal-unselected-tab"} pointer`} style={{ marginLeft: `${index !== 0 && "40px"}` }}>
											<span>
												{option.option}
											</span>
										</div>
									);
								})
							}
						</div>

					</div>
				</Modal >
			}
		</div >
	);
}
