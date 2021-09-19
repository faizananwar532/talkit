import React, { useState } from "react";
import ChatRoomSelectionPanel from "../../components/LeftPanel/ChatRoomSelectionPanel";
import JoinRoomModal from "../../components/LeftPanel/JoinRoomModal";
import SideNavbar from "../../components/LeftPanel/SideNavbar";
import Modal from "../../sub-components/common/Modal";

export default function LeftPanel() {

	const [addChannelModalsStatus, setAddChannelModalsStatus] = useState({
		isAddChannelModalOpen: false,
		isAddDmModalOpen: false
	});


	return (
		<div className="left-panel">
			<SideNavbar />
			<ChatRoomSelectionPanel
				onChannelAdd={() => { setAddChannelModalsStatus({ ...addChannelModalsStatus, isAddChannelModalOpen: true }); }}
				onDMAdd={() => { }} />

			<JoinRoomModal
				isAddChannelModalOpen={addChannelModalsStatus.isAddChannelModalOpen}
				onClose={() => { setAddChannelModalsStatus({ isAddChannelModalOpen: false, isAddDmModalOpen: false }); }}
				onConfirm={(isConfirmed) => { }} />


		</div >
	);
}
