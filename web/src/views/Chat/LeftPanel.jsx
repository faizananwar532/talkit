import React from "react";
import ChatRoomSelectionPanel from "../../components/LeftPanel/ChatRoomSelectionPanel";
import SideNavbar from "../../components/LeftPanel/SideNavbar";

export default function LeftPanel() {



	return (
		<div className="left-panel">
			<SideNavbar />
			<ChatRoomSelectionPanel />
		</div>
	);
}
