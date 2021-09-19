import React, { useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import ChatPanel from "./ChatPanel";

export default function ChatPanelContainer() {

	const [chatContactsData, setChatContactsData] = useState({
		selectedContact: null
	});

	return (
		<div className="chat-main-panel-container">
			<ChatContext.Provider value={{ chatContactsData, setChatContactsData }}>
				<LeftPanel />
				<ChatPanel />
				<RightPanel />
			</ChatContext.Provider>
		</div>
	);
}
